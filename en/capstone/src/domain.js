// The same deterministic domain is used by the browser, fault lab, and Node tests.
// Principals and provider verification are simulated, never a security boundary.
export const VERSION = '1.0.0';
export const ACTORS = Object.freeze({
  attendant: { id: 'STAFF-01', role: 'attendant', lot: 'DEMO' },
  alice: { id: 'ALICE', role: 'driver', lot: 'DEMO' },
  bob: { id: 'BOB', role: 'driver', lot: 'DEMO' },
  operator: { id: 'OPS-01', role: 'operator', lot: 'DEMO' },
  provider: { id: 'SIM-PROVIDER', role: 'provider', lot: 'DEMO' },
});
export class DomainError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}
const fail = (code, message) => { throw new DomainError(code, message); };
const requireRule = (condition, code, message) => { if (!condition) fail(code, message); };
const integer = (n, min = 0) => Number.isSafeInteger(n) && n >= min;
export const money = (fen) => `CNY ${(fen / 100).toFixed(2)}`;

export function calculateFee(seconds, rateFen = 1000, numerator = 1, denominator = 1) {
  requireRule(integer(seconds) && integer(rateFen) && integer(numerator, 1) && integer(denominator, 1),
    'INVALID_FEE_INPUT', 'Use nonnegative whole seconds and fen, with a positive rational coefficient.');
  const hours = (BigInt(seconds) + 3599n) / 3600n;
  const exact = hours * BigInt(rateFen) * BigInt(numerator);
  const denom = BigInt(denominator);
  const fen = (2n * exact + denom) / (2n * denom);
  requireRule(fen <= BigInt(Number.MAX_SAFE_INTEGER), 'AMOUNT_OVERFLOW', 'Amount exceeds the supported exact-money range.');
  return { seconds, hours: Number(hours), fen: Number(fen) };
}
export function createState() {
  const now = Date.parse('2026-09-28T02:01:00Z');
  return { schema: 1, version: VERSION, revision: 0, sequence: 1, now,
    tariff: 'T1', tariffs: { T1: { id: 'T1', label: 'Standard · v1', rateFen: 1000, numerator: 1, denominator: 1 } },
    stays: [{ id: 'S1', token: 'DEMO-101', owner: 'ALICE', lot: 'DEMO', enteredAt: now - 3660000,
      exitedAt: null, tariff: 'T1', state: 'OPEN', version: 0, quoteId: null, receipt: null }],
    quotes: [], payments: [], providerOrders: {}, providerEvents: {}, keys: {}, audit: [],
    observations: [], labRuns: [], debt: [],
  };
}
const nextId = (s, prefix) => `${prefix}${++s.sequence}`;
function log(s, kind, entity, detail) {
  s.audit.push({ id: nextId(s, 'E'), at: s.now, kind, entity, detail });
}
function role(actor, allowed) {
  requireRule(actor && allowed.includes(actor.role) && actor.lot === 'DEMO', 'FORBIDDEN', 'This simulated role cannot perform that operation.');
}
export function getStay(s, id, actor) {
  const stay = s.stays.find(x => x.id === id);
  requireRule(stay && actor && actor.lot === stay.lot &&
    (['attendant', 'operator', 'provider'].includes(actor.role) || (actor.role === 'driver' && actor.id === stay.owner)),
  'NOT_FOUND', 'Stay unavailable for this role and lot.');
  return stay;
}
export function visibleStays(s, actor) {
  return s.stays.filter(x => x.lot === actor.lot &&
    (['attendant', 'operator'].includes(actor.role) || (actor.role === 'driver' && x.owner === actor.id)));
}
function checkVersion(stay, version) {
  requireRule(stay.version === version, 'STALE_VERSION', 'This stay changed. Refresh its version and try again.');
}
function idempotent(s, actor, operation, key, payload, work) {
  requireRule(typeof key === 'string' && key.length >= 1 && key.length <= 100, 'INVALID_KEY', 'Supply a request key of 1–100 characters.');
  const scope = JSON.stringify([actor.lot, actor.id, operation, key]);
  const fingerprint = JSON.stringify(payload);
  const previous = s.keys[scope];
  if (previous) {
    requireRule(previous.fingerprint === fingerprint, 'IDEMPOTENCY_CONFLICT', 'This request key already belongs to different input.');
    return { ...previous.result, replayed: true };
  }
  const result = work();
  s.keys[scope] = { fingerprint, result };
  return result;
}
function quoteFor(s, id, actor) {
  const quote = s.quotes.find(x => x.id === id);
  requireRule(quote, 'NOT_FOUND', 'Quote unavailable.');
  const stay = getStay(s, quote.stayId, actor);
  return { quote, stay };
}
function paymentFor(s, id, actor) {
  const payment = s.payments.find(x => x.id === id);
  requireRule(payment, 'NOT_FOUND', 'Payment unavailable.');
  const stay = getStay(s, payment.stayId, actor);
  return { payment, stay };
}
function settle(s, payment, stay, event) {
  const quote = s.quotes.find(x => x.id === payment.quoteId);
  const valid = event.merchant === 'DEMO-MERCHANT' && event.currency === 'CNY' &&
    event.amountFen === quote.fen && event.orderId === payment.orderId &&
    integer(event.paidAt) && event.paidAt >= payment.createdAt && event.paidAt <= quote.expiresAt;
  if (!valid) {
    payment.review = 'Provider evidence does not match the quote, merchant, or payment window.';
    log(s, 'REVIEW_REQUIRED', payment.id, payment.review);
    return { status: 'REVIEW_REQUIRED', id: payment.id };
  }
  if (payment.status === 'SUCCEEDED') return { status: 'SUCCEEDED', id: payment.id, replayed: true };
  if (payment.status === 'FAILED') {
    payment.review = 'Late success after a failed attempt needs operator reconciliation.';
    log(s, 'REVIEW_REQUIRED', payment.id, payment.review);
    return { status: 'REVIEW_REQUIRED', id: payment.id };
  }
  requireRule(stay.state === 'OPEN', 'STATE_CONFLICT', 'Stay cannot accept another settlement.');
  payment.status = 'SUCCEEDED'; payment.settledAt = s.now; payment.review = null;
  stay.state = 'SETTLED'; stay.version += 1;
  stay.receipt = { id: nextId(s, 'R'), quoteId: quote.id, paymentId: payment.id, amountFen: quote.fen, at: s.now, type: 'SIMULATED_PAYMENT' };
  log(s, 'PAYMENT_CONFIRMED', stay.id, `${money(quote.fen)} · ${payment.orderId}`);
  return { id: payment.id, status: 'SUCCEEDED' };
}
function providerEvent(s, actor, c) {
  role(actor, ['provider']);
  requireRule(c.verified === true, 'INVALID_PROVIDER', 'Unverified simulated provider event rejected.');
  requireRule(typeof c.eventId === 'string' && c.eventId.length <= 100 && c.eventId.length > 0,
    'INVALID_EVENT', 'Provider event needs a bounded identifier.');
  const { payment, stay } = paymentFor(s, c.paymentId, actor);
  const fingerprint = JSON.stringify([c.paymentId, c.status, c.merchant, c.currency, c.amountFen, c.orderId, c.paidAt]);
  const existing = s.providerEvents[c.eventId];
  if (existing) {
    requireRule(existing === fingerprint, 'EVENT_CONFLICT', 'Provider event ID reused with a changed payload.');
    return { id: payment.id, status: payment.status, replayed: true };
  }
  requireRule(['SUCCEEDED', 'FAILED'].includes(c.status), 'INVALID_EVENT', 'Unsupported provider status.');
  // Both success AND failure must refer to the expected merchant/order/currency/amount.
  const q = s.quotes.find(x => x.id === payment.quoteId);
  if (c.merchant !== 'DEMO-MERCHANT' || c.orderId !== payment.orderId || c.currency !== 'CNY' || c.amountFen !== q.fen) {
    payment.review = 'Provider identity or amount mismatch.';
    log(s, 'REVIEW_REQUIRED', payment.id, payment.review);
    s.providerEvents[c.eventId] = fingerprint;
    return { id: payment.id, status: 'REVIEW_REQUIRED' };
  }
  let result;
  if (c.status === 'SUCCEEDED') result = settle(s, payment, stay, c);
  else if (payment.status === 'SUCCEEDED') {
    log(s, 'STALE_EVENT_IGNORED', payment.id, 'A failure event cannot downgrade a confirmed payment.');
    result = { id: payment.id, status: 'SUCCEEDED' };
  } else {
    payment.status = 'FAILED';
    log(s, 'PAYMENT_FAILED', payment.id, 'Simulator confirmed failure; no settlement.');
    result = { id: payment.id, status: 'FAILED' };
  }
  s.providerEvents[c.eventId] = fingerprint;
  return result;
}

export function execute(state, actor, command) {
  // A rejected operation never changes the input. Persistence is a separate adapter.
  const s = structuredClone(state);
  const c = command;
  let result;
  switch (c.type) {
    case 'ENTER': {
      role(actor, ['attendant', 'operator']);
      const token = String(c.token ?? '').trim().toUpperCase();
      requireRule(/^DEMO-[A-Z0-9-]{1,20}$/.test(token), 'INVALID_TOKEN', 'Use a synthetic token such as DEMO-102.');
      requireRule(['ALICE', 'BOB'].includes(c.owner), 'INVALID_OWNER', 'Choose a simulated driver.');
      result = idempotent(s, actor, 'ENTER', c.key, [token, c.owner], () => {
        requireRule(!s.stays.some(x => x.token === token && x.lot === actor.lot && x.state !== 'CLOSED'), 'DUPLICATE_STAY', 'This vehicle already has an active stay.');
        requireRule(s.stays.filter(x => x.state !== 'CLOSED').length < 12, 'LOT_FULL', 'All 12 teaching spaces are occupied.');
        const stay = { id: nextId(s, 'S'), token, owner: c.owner, lot: actor.lot, enteredAt: s.now, exitedAt: null,
          tariff: s.tariff, state: 'OPEN', version: 0, quoteId: null, receipt: null };
        s.stays.push(stay); log(s, 'ENTRY_RECORDED', stay.id, `${token} · tariff ${stay.tariff}`);
        return { id: stay.id, status: stay.state };
      }); break;
    }
    case 'QUOTE': {
      role(actor, ['driver', 'attendant', 'operator']);
      const stay = getStay(s, c.stayId, actor); checkVersion(stay, c.version);
      requireRule(stay.state === 'OPEN', 'STATE_CONFLICT', 'Only an open stay can receive a new quote.');
      requireRule(!s.payments.some(p => p.stayId === stay.id && (p.status === 'PENDING' || p.review)), 'PAYMENT_PENDING', 'Resolve the existing payment before replacing its quote.');
      const tariff = s.tariffs[stay.tariff];
      const fee = calculateFee((s.now - stay.enteredAt) / 1000, tariff.rateFen, tariff.numerator, tariff.denominator);
      const quote = { id: nextId(s, 'Q'), stayId: stay.id, tariff: stay.tariff, cutoff: s.now, expiresAt: s.now + 300000, ...fee };
      s.quotes.push(quote); stay.quoteId = quote.id; stay.version += 1;
      log(s, 'QUOTE_CREATED', stay.id, `${fee.hours} billed hours · ${money(fee.fen)} · ${stay.tariff}`);
      result = { id: quote.id, status: 'QUOTED' }; break;
    }
    case 'PAY': {
      role(actor, ['driver', 'attendant', 'operator']);
      const { quote, stay } = quoteFor(s, c.quoteId, actor);
      result = idempotent(s, actor, 'PAY', c.key, [c.quoteId], () => {
        requireRule(stay.state === 'OPEN' && stay.quoteId === quote.id, 'STATE_CONFLICT', 'This quote is no longer payable.');
        const pending = s.payments.find(x => x.stayId === stay.id && (x.status === 'PENDING' || x.review));
        if (pending) return { id: pending.id, status: pending.status, reused: true };
        requireRule(s.now <= quote.expiresAt, 'QUOTE_EXPIRED', 'Quote expired. Create a new quote before paying.');
        requireRule(quote.fen > 0, 'ZERO_FEE', 'An attendant must record a zero-fee settlement.');
        const payment = { id: nextId(s, 'P'), stayId: stay.id, quoteId: quote.id, orderId: nextId(s, 'ORDER'),
          status: 'PENDING', createdAt: s.now, settledAt: null, review: null };
        s.payments.push(payment); log(s, 'PAYMENT_PENDING', stay.id, `${payment.orderId} · waiting for provider evidence`);
        return { id: payment.id, status: 'PENDING' };
      }); break;
    }
    case 'ZERO_SETTLE': {
      role(actor, ['attendant', 'operator']);
      const { quote, stay } = quoteFor(s, c.quoteId, actor);
      result = idempotent(s, actor, 'ZERO_SETTLE', c.key, [c.quoteId, c.version], () => {
        checkVersion(stay, c.version);
        requireRule(stay.state === 'OPEN' && stay.quoteId === quote.id && quote.fen === 0 && s.now <= quote.expiresAt,
          'NOT_ZERO_FEE', 'A current zero-fee quote is required.');
        stay.state = 'SETTLED'; stay.version += 1;
        stay.receipt = { id: nextId(s, 'R'), quoteId: quote.id, paymentId: null, amountFen: 0, at: s.now, type: 'ZERO_FEE' };
        log(s, 'ZERO_FEE_SETTLED', stay.id, 'Authorized zero-fee receipt; no provider order.');
        return { id: stay.receipt.id, status: 'SETTLED' };
      }); break;
    }
    case 'PROVIDER_EVENT': result = providerEvent(s, actor, c); break;
    case 'SIMULATE_PROVIDER': {
      role(actor, ['attendant', 'operator']);
      const { payment } = paymentFor(s, c.paymentId, actor);
      requireRule(['success', 'timeout', 'failure', 'mismatch'].includes(c.outcome), 'INVALID_OUTCOME', 'Unknown simulator outcome.');
      const quote = s.quotes.find(x => x.id === payment.quoteId);
      // Simulator authority is a separate persisted ledger. A timeout preserves its accepted order.
      let event = s.providerOrders[payment.orderId];
      if (!event) {
        event = { type: 'PROVIDER_EVENT', verified: true, eventId: `EV-${payment.orderId}`, paymentId: payment.id,
          orderId: payment.orderId, merchant: 'DEMO-MERCHANT', currency: 'CNY',
          amountFen: quote.fen + (c.outcome === 'mismatch' ? 1 : 0),
          status: c.outcome === 'failure' ? 'FAILED' : 'SUCCEEDED', paidAt: s.now };
        s.providerOrders[payment.orderId] = event;
      }
      if (c.outcome === 'timeout') {
        log(s, 'PROVIDER_TIMEOUT', payment.id, 'Provider accepted the order; local confirmation is unavailable.');
        result = { id: payment.id, status: payment.status };
      } else result = providerEvent(s, ACTORS.provider, event);
      break;
    }
    case 'RECONCILE': {
      role(actor, ['attendant', 'operator']);
      const { payment } = paymentFor(s, c.paymentId, actor);
      const event = s.providerOrders[payment.orderId];
      requireRule(event, 'PROVIDER_UNAVAILABLE', 'No authoritative simulator record yet. Keep the payment pending.');
      result = providerEvent(s, ACTORS.provider, event);
      log(s, 'RECONCILIATION', payment.id, `Queried existing order ${payment.orderId}; no new charge.`);
      break;
    }
    case 'EXIT': {
      role(actor, ['attendant', 'operator']);
      const stay = getStay(s, c.stayId, actor); checkVersion(stay, c.version);
      requireRule(stay.state === 'SETTLED', 'PAYMENT_REQUIRED', 'Confirm settlement before recording exit.');
      requireRule(s.now >= stay.enteredAt, 'INVALID_TIME', 'Exit cannot precede entry.');
      stay.state = 'CLOSED'; stay.exitedAt = s.now; stay.version += 1;
      log(s, 'EXIT_RECORDED', stay.id, 'Separate physical-exit observation recorded.');
      result = { id: stay.id, status: 'CLOSED' }; break;
    }
    case 'ADVANCE': {
      role(actor, ['attendant', 'operator']);
      requireRule(integer(c.seconds, 1) && c.seconds <= 86400, 'INVALID_TIME', 'Advance by 1–86,400 whole seconds.');
      s.now += c.seconds * 1000; result = { status: 'CLOCK_ADVANCED' }; break;
    }
    case 'TARIFF': {
      role(actor, ['operator']);
      const id = nextId(s, 'T');
      requireRule(['normal', 'peak'].includes(c.policy), 'INVALID_TARIFF', 'Choose a supported policy.');
      s.tariffs[id] = { id, label: `${c.policy === 'peak' ? 'Peak' : 'Standard'} · ${id}`, rateFen: 1000,
        numerator: c.policy === 'peak' ? 3 : 1, denominator: c.policy === 'peak' ? 2 : 1 };
      s.tariff = id; log(s, 'TARIFF_VERSIONED', id, 'Applies only to new stays. Historical tariffs remain unchanged.');
      result = { id, status: 'TARIFF_UPDATED' }; break;
    }
    case 'OBSERVATION': {
      requireRule(['hypothesis', 'synthetic observation', 'field evidence pending'].includes(c.category), 'INVALID_EVIDENCE', 'Choose an evidence category.');
      requireRule(typeof c.note === 'string' && c.note.trim().length >= 5 && c.note.length <= 500, 'INVALID_EVIDENCE', 'Use 5–500 characters and no personal data.');
      s.observations.push({ id: nextId(s, 'OBS'), at: s.now, category: c.category, note: c.note.trim() });
      result = { status: 'EVIDENCE_SAVED' }; break;
    }
    case 'SAVE_LAB': {
      requireRule(c.run && ['counterexamples', 'recovery'].includes(c.run.kind), 'INVALID_RUN', 'Unknown lab result.');
      s.labRuns.push(c.run); s.labRuns = s.labRuns.slice(-20); result = { status: 'RUN_SAVED' }; break;
    }
    default: fail('UNKNOWN_COMMAND', 'Unsupported command; no state was changed.');
  }
  s.revision += 1;
  return { state: s, result };
}
