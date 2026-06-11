// Free trial management utilities
// Tracks usage across sessions using localStorage

export interface TrialState {
  copiesUsed: number;
  personalizesUsed: number;
  lastResetDate: string;
}

const TRIAL_STORAGE_KEY = "replykit_trial_state";
const COPIES_LIMIT = 10;
const PERSONALIZES_LIMIT = 5;

/**
 * Get current trial state from localStorage
 */
export function getTrialState(): TrialState {
  if (typeof window === "undefined") {
    return {
      copiesUsed: 0,
      personalizesUsed: 0,
      lastResetDate: new Date().toISOString().split("T")[0],
    };
  }

  const stored = localStorage.getItem(TRIAL_STORAGE_KEY);
  const today = new Date().toISOString().split("T")[0];

  // If no data or data is from a different day, reset
  if (!stored) {
    const newState: TrialState = {
      copiesUsed: 0,
      personalizesUsed: 0,
      lastResetDate: today,
    };
    localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(newState));
    return newState;
  }

  const state = JSON.parse(stored) as TrialState;

  // Reset if day changed
  if (state.lastResetDate !== today) {
    const newState: TrialState = {
      copiesUsed: 0,
      personalizesUsed: 0,
      lastResetDate: today,
    };
    localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(newState));
    return newState;
  }

  return state;
}

/**
 * Check if user can copy (has uses left)
 */
export function canCopy(): boolean {
  const state = getTrialState();
  return state.copiesUsed < COPIES_LIMIT;
}

/**
 * Check if user can personalize (has uses left)
 */
export function canPersonalize(): boolean {
  const state = getTrialState();
  return state.personalizesUsed < PERSONALIZES_LIMIT;
}

/**
 * Get remaining copies for today
 */
export function getRemainingCopies(): number {
  const state = getTrialState();
  return Math.max(0, COPIES_LIMIT - state.copiesUsed);
}

/**
 * Get remaining personalizes for today
 */
export function getRemainingPersonalizes(): number {
  const state = getTrialState();
  return Math.max(0, PERSONALIZES_LIMIT - state.personalizesUsed);
}

/**
 * Increment copy usage
 */
export function incrementCopies(): void {
  const state = getTrialState();
  state.copiesUsed += 1;
  localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(state));
}

/**
 * Increment personalize usage
 */
export function incrementPersonalizes(): void {
  const state = getTrialState();
  state.personalizesUsed += 1;
  localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(state));
}

/**
 * Reset trial (for testing or when user extends trial via email)
 */
export function resetTrial(): void {
  const today = new Date().toISOString().split("T")[0];
  const newState: TrialState = {
    copiesUsed: 0,
    personalizesUsed: 0,
    lastResetDate: today,
  };
  localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(newState));
}
