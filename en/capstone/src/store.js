import { createState, execute, DomainError } from './domain.js';
export const STORAGE_KEY = 'ise.parking.evidence.v1';
export function validateSnapshot(value) {
  if (!value || value.schema !== 1 || !Number.isSafeInteger(value.revision) || !Number.isSafeInteger(value.now) ||
    !Array.isArray(value.stays) || !Array.isArray(value.quotes) || !Array.isArray(value.payments) ||
    !Array.isArray(value.audit) || !Array.isArray(value.labRuns) || !Array.isArray(value.observations) ||
    !value.tariffs?.[value.tariff] || !value.providerOrders || !value.providerEvents || !value.keys) {
    throw new DomainError('STORAGE_INVALID', 'Saved lab data is invalid or from another version. Export it or reset this lab.');
  }
  return value;
}
export function readState(storage = localStorage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return createState();
  try { return validateSnapshot(JSON.parse(raw)); }
  catch { throw new DomainError('STORAGE_INVALID', 'Saved lab data cannot be loaded. Reset this lab to continue.'); }
}
export async function commit(actor, command) {
  const work = () => {
    const { state, result } = execute(readState(), actor, command);
    // Do not report success if browser storage is unavailable or full.
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { throw new DomainError('STORAGE_UNAVAILABLE', 'Your browser could not save this operation. No success is claimed; export your evidence before retrying.'); }
    return { state, result };
  };
  if (!globalThis.navigator?.locks) throw new DomainError('LOCKS_UNAVAILABLE', 'This lab requires a browser with Web Locks on HTTPS or localhost to serialize saved operations.');
  return navigator.locks.request(STORAGE_KEY, work);
}
export async function reset() {
  if (!navigator.locks) throw new DomainError('LOCKS_UNAVAILABLE', 'Web Locks is required to reset the lab.');
  return navigator.locks.request(STORAGE_KEY, () => {
    const state = createState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return state;
  });
}
