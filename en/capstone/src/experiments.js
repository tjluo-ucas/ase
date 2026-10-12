import { ACTORS, createState, execute, calculateFee } from './domain.js';
export function preparedPayment() {
  let s = createState();
  const quote = execute(s, ACTORS.attendant, { type: 'QUOTE', stayId: 'S1', version: 0 }); s = quote.state;
  const pay = execute(s, ACTORS.alice, { type: 'PAY', quoteId: quote.result.id, key: 'fixed-payment-key' });
  return { state: pay.state, paymentId: pay.result.id, quoteId: quote.result.id };
}
export function successEvent(s, paymentId, overrides = {}) {
  const p = s.payments.find(x => x.id === paymentId);
  const q = s.quotes.find(x => x.id === p.quoteId);
  return { type: 'PROVIDER_EVENT', verified: true, eventId: 'EVENT-TEST', paymentId,
    orderId: p.orderId, merchant: 'DEMO-MERCHANT', currency: 'CNY', amountFen: q.fen,
    paidAt: s.now, status: 'SUCCEEDED', ...overrides };
}
const expect = (condition, reason) => { if (!condition) throw new Error(reason); };
const rejects = (f, code) => {
  let found;
  try { f(); } catch (e) { found = e.code; }
  expect(found === code, `Expected ${code}; observed ${found ?? 'accepted'}.`);
};
const cases = [
  ['BR03', 'Started-hour boundary', '3,601 seconds costs 2,000 fen at the normal tariff.', () => {
    expect(calculateFee(3601).fen === 2000, 'Wrong independent fee oracle.');
  }],
  ['BR03', 'Half-fen rounding', '1 fen × 1.5 rounds once to 2 fen.', () => {
    expect(calculateFee(1, 1, 3, 2).fen === 2, 'Half-up rounding failed.');
  }],
  ['BR01', 'Duplicate active stay', 'A second DEMO-101 entry is rejected.', () => {
    rejects(() => execute(createState(), ACTORS.attendant, { type: 'ENTER', token: 'DEMO-101', owner: 'ALICE', key: 'duplicate' }), 'DUPLICATE_STAY');
  }],
  ['BR06', 'Another driver’s stay', 'Bob cannot quote Alice’s stay.', () => {
    rejects(() => execute(createState(), ACTORS.bob, { type: 'QUOTE', stayId: 'S1', version: 0 }), 'NOT_FOUND');
  }],
  ['BR08', 'Stale version', 'The old version cannot create another quote.', () => {
    const s = execute(createState(), ACTORS.alice, { type: 'QUOTE', stayId: 'S1', version: 0 }).state;
    rejects(() => execute(s, ACTORS.alice, { type: 'QUOTE', stayId: 'S1', version: 0 }), 'STALE_VERSION');
  }],
  ['BR04', 'Forged confirmation', 'An unverified provider event cannot settle.', () => {
    const { state, paymentId } = preparedPayment();
    rejects(() => execute(state, ACTORS.provider, successEvent(state, paymentId, { verified: false })), 'INVALID_PROVIDER');
  }],
  ['BR04', 'Wrong amount', 'A one-fen mismatch enters review without a receipt.', () => {
    const { state, paymentId } = preparedPayment();
    const r = execute(state, ACTORS.provider, successEvent(state, paymentId, { amountFen: 2001 }));
    expect(r.result.status === 'REVIEW_REQUIRED' && !r.state.stays[0].receipt, 'Mismatched payment settled.');
  }],
  ['BR04', 'Wrong merchant', 'A signed-looking event for another merchant cannot settle.', () => {
    const { state, paymentId } = preparedPayment();
    const r = execute(state, ACTORS.provider, successEvent(state, paymentId, { merchant: 'OTHER' }));
    expect(!r.state.stays[0].receipt, 'Wrong-merchant settlement.');
  }],
  ['BR05', 'Repeated payment request', 'An identical request key returns the same order.', () => {
    const { state, paymentId, quoteId } = preparedPayment();
    const r = execute(state, ACTORS.alice, { type: 'PAY', quoteId, key: 'fixed-payment-key' });
    expect(r.result.id === paymentId && r.state.payments.length === 1, 'Duplicate order created.');
  }],
  ['BR07', 'Duplicate provider event', 'Two deliveries produce one receipt and one settlement event.', () => {
    const { state, paymentId } = preparedPayment(); const event = successEvent(state, paymentId);
    const one = execute(state, ACTORS.provider, event); const two = execute(one.state, ACTORS.provider, event);
    expect(two.state.stays[0].receipt.id === one.state.stays[0].receipt.id &&
      two.state.audit.filter(x => x.kind === 'PAYMENT_CONFIRMED').length === 1, 'Duplicate settlement.');
  }],
  ['BR07', 'Late failure after success', 'A confirmed payment cannot be downgraded.', () => {
    const { state, paymentId } = preparedPayment();
    const one = execute(state, ACTORS.provider, successEvent(state, paymentId));
    const two = execute(one.state, ACTORS.provider, successEvent(one.state, paymentId, { eventId: 'LATE', status: 'FAILED' }));
    expect(two.state.payments[0].status === 'SUCCEEDED', 'Payment downgraded.');
  }],
  ['BR04', 'Unsettled exit', 'Staff cannot close an unpaid stay.', () => {
    rejects(() => execute(createState(), ACTORS.attendant, { type: 'EXIT', stayId: 'S1', version: 0 }), 'PAYMENT_REQUIRED');
  }],
];
export function counterexamples() {
  const started = performance.now();
  const results = cases.map(([rule, title, oracle, run]) => {
    const before = performance.now();
    try { run(); return { rule, title, oracle, pass: true, ms: performance.now() - before }; }
    catch (e) { return { rule, title, oracle, pass: false, error: e.message, ms: performance.now() - before }; }
  });
  // Same frozen event corpus, isolated baseline fault: ignore a mismatched amount.
  const corpus = [2000, 2001];
  const comparison = corpus.map(amount => {
    const { state, paymentId } = preparedPayment();
    const event = successEvent(state, paymentId, { amountFen: amount });
    const faulty = execute(state, ACTORS.provider, { ...event, amountFen: 2000 });
    const fixed = execute(state, ACTORS.provider, event);
    const expectedSettlement = amount === 2000;
    return { amountFen: amount, expectedSettlement,
      seededBaselinePass: !!faulty.state.stays[0].receipt === expectedSettlement,
      guardedPass: !!fixed.state.stays[0].receipt === expectedSettlement };
  });
  return { kind: 'counterexamples', recordedAt: new Date().toISOString(), version: '1.0.0',
    durationMs: performance.now() - started, results, comparison,
    limits: 'Isolated browser-domain experiment. Baseline deliberately normalizes a wrong amount; it is a seeded fault, not a discovered provider vulnerability.' };
}
export function recoveryExperiment() {
  const initial = preparedPayment();
  const timeout = execute(initial.state, ACTORS.attendant, { type: 'SIMULATE_PROVIDER', paymentId: initial.paymentId, outcome: 'timeout' }).state;
  const after = execute(timeout, ACTORS.attendant, { type: 'ADVANCE', seconds: 45 }).state;
  const recovered = execute(after, ACTORS.operator, { type: 'RECONCILE', paymentId: initial.paymentId }).state;
  // A local synchronous policy benchmark. No claim about server or network latency.
  const timings = []; let errors = 0;
  for (let i = 0; i < 200; i++) {
    const start = performance.now();
    try {
      const s = execute(createState(), ACTORS.alice, { type: 'QUOTE', stayId: 'S1', version: 0 });
      if (s.state.quotes[0].fen !== 2000) errors++;
    } catch { errors++; }
    timings.push(performance.now() - start);
  }
  timings.sort((a, b) => a - b);
  return { kind: 'recovery', recordedAt: new Date().toISOString(), version: '1.0.0',
    workload: { samples: 200, concurrency: 1, fixture: 'S1:61-minutes:normal', clock: 'synthetic', faultClearSeconds: 30, reconcileSeconds: 45 },
    baseline: { status: after.payments[0].status, unresolved: after.payments.filter(x=>x.status==='PENDING').length, orders: Object.keys(after.providerOrders).length, settlements: after.audit.filter(x=>x.kind==='PAYMENT_CONFIRMED').length },
    intervention: { status: recovered.payments[0].status, unresolved: recovered.payments.filter(x=>x.status==='PENDING').length, orders: Object.keys(recovered.providerOrders).length,
      simulatedRecoverySeconds: (recovered.payments[0].settledAt-(initial.state.now+30000))/1000, settlements: recovered.audit.filter(x => x.kind === 'PAYMENT_CONFIRMED').length },
    localBenchmark: { samples: 200, errors, p50Ms: timings[99], p95Ms: timings[189], p99Ms: timings[197], rawMs: timings },
    trace: recovered.audit,
    limits: 'Recovery time is simulated. Timings are real synchronous browser/Node domain calls, excluding network, storage and backend. No field, server-load or resource-utilization claim.' };
}
