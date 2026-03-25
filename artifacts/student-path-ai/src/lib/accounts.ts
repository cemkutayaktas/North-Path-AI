import { MatchResult, ProfileType, HiddenMatch, WhyNotEntry, QuestionnaireAnswers } from "./store";

export interface SavedResult {
  results: MatchResult[];
  profile: ProfileType;
  hidden: HiddenMatch | null;
  whyNot: WhyNotEntry[] | null;
  answers: QuestionnaireAnswers;
  savedAt: string;
}

export interface Account {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  savedResult: SavedResult | null;
  savedGoals: string[];
  preferredCountries: string[];
  securityQuestion?: string;
  securityAnswerHash?: string;
}

// ─── Security questions ──────────────────────────────────────────────────────
export const SECURITY_QUESTIONS = [
  "securityQ_pet",
  "securityQ_city",
  "securityQ_school",
  "securityQ_food",
  "securityQ_friend",
] as const;
export type SecurityQuestionKey = (typeof SECURITY_QUESTIONS)[number];

const ACCOUNTS_KEY = "northpath_accounts";
const CURRENT_KEY = "northpath_current_account";

// ─── Password hashing (SHA-256 via SubtleCrypto) ─────────────────────────────
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "northpath_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ─── Email validation ────────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

// ─── Password validation ─────────────────────────────────────────────────────
export interface PasswordCheck {
  valid: boolean;
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
}

export function checkPassword(password: string): PasswordCheck {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return {
    valid: minLength && hasUppercase && hasLowercase && hasNumber,
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
  };
}

// ─── Storage helpers ─────────────────────────────────────────────────────────
function loadAccounts(): Account[] {
  try {
    const d = localStorage.getItem(ACCOUNTS_KEY);
    return d ? JSON.parse(d) : [];
  } catch { return []; }
}

function saveAccounts(accounts: Account[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getAllAccounts(): Account[] { return loadAccounts(); }

export function getCurrentAccountId(): string | null {
  return localStorage.getItem(CURRENT_KEY);
}

export function getCurrentAccount(): Account | null {
  const id = getCurrentAccountId();
  if (!id) return null;
  return loadAccounts().find(a => a.id === id) ?? null;
}

export function setCurrentAccount(id: string | null) {
  if (id) localStorage.setItem(CURRENT_KEY, id);
  else localStorage.removeItem(CURRENT_KEY);
}

export async function registerAccount(username: string, email: string, password: string, securityQuestion?: string, securityAnswer?: string): Promise<{ ok: boolean; error?: string; account?: Account }> {
  const trimmedEmail = email.trim().toLowerCase();

  // Validate email format
  if (!isValidEmail(trimmedEmail)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  // Validate password strength
  const pwCheck = checkPassword(password);
  if (!pwCheck.valid) {
    return { ok: false, error: "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number." };
  }

  // Check duplicate email
  const accounts = loadAccounts();
  if (accounts.find(a => a.email === trimmedEmail)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  // Validate username
  if (!username.trim() || username.trim().length < 2) {
    return { ok: false, error: "Username must be at least 2 characters." };
  }

  const hashed = await hashPassword(password);
  const secAnswerHash = securityQuestion && securityAnswer
    ? await hashPassword(securityAnswer.trim().toLowerCase())
    : undefined;
  const account: Account = {
    id: Math.random().toString(36).slice(2) + Date.now().toString(36),
    username: username.trim(),
    email: trimmedEmail,
    passwordHash: hashed,
    createdAt: new Date().toISOString(),
    savedResult: null,
    savedGoals: [],
    preferredCountries: [],
    securityQuestion: securityQuestion || undefined,
    securityAnswerHash: secAnswerHash,
  };
  accounts.push(account);
  saveAccounts(accounts);
  setCurrentAccount(account.id);
  return { ok: true, account };
}

export async function loginAccount(email: string, password: string): Promise<{ ok: boolean; error?: string; account?: Account }> {
  const accounts = loadAccounts();
  const trimmedEmail = email.trim().toLowerCase();
  const account = accounts.find(a => a.email === trimmedEmail);
  if (!account) return { ok: false, error: "No account found with this email." };

  const hashed = await hashPassword(password);

  // Support both old plaintext (legacy) and new hashed passwords
  const passwordMatch = account.passwordHash === hashed
    || (account as any).password === password; // Legacy fallback

  if (!passwordMatch) return { ok: false, error: "Incorrect password." };

  // Migrate legacy plaintext password to hashed
  if ((account as any).password && !account.passwordHash) {
    const idx = accounts.findIndex(a => a.id === account.id);
    if (idx !== -1) {
      accounts[idx] = { ...accounts[idx], passwordHash: hashed };
      delete (accounts[idx] as any).password;
      saveAccounts(accounts);
    }
  }

  setCurrentAccount(account.id);
  return { ok: true, account };
}

export function logoutAccount() {
  setCurrentAccount(null);
}

function updateAccount(id: string, changes: Partial<Account>) {
  const accounts = loadAccounts();
  const idx = accounts.findIndex(a => a.id === id);
  if (idx === -1) return;
  accounts[idx] = { ...accounts[idx], ...changes };
  saveAccounts(accounts);
}

export function saveResultToAccount(id: string, data: SavedResult) {
  updateAccount(id, { savedResult: data });
}

export function updateAccountGoals(id: string, goals: string[]) {
  updateAccount(id, { savedGoals: goals });
}

export function updatePreferredCountries(id: string, countries: string[]) {
  updateAccount(id, { preferredCountries: countries });
}

// ─── Change Password ────────────────────────────────────────────────────────
export async function changePassword(
  id: string,
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  const accounts = loadAccounts();
  const account = accounts.find(a => a.id === id);
  if (!account) return { ok: false, error: "Account not found." };

  // Verify current password
  const currentHash = await hashPassword(currentPassword);
  const match = account.passwordHash === currentHash
    || (account as any).password === currentPassword; // Legacy fallback
  if (!match) return { ok: false, error: "Current password is incorrect." };

  // Validate new password
  const pwCheck = checkPassword(newPassword);
  if (!pwCheck.valid) {
    return { ok: false, error: "New password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number." };
  }

  const newHash = await hashPassword(newPassword);
  const idx = accounts.findIndex(a => a.id === id);
  accounts[idx] = { ...accounts[idx], passwordHash: newHash };
  delete (accounts[idx] as any).password; // Remove legacy field if present
  saveAccounts(accounts);
  return { ok: true };
}

// ─── Forgot Password (Security Question) ────────────────────────────────────
export function getSecurityQuestionForEmail(email: string): { found: boolean; question?: string } {
  const accounts = loadAccounts();
  const account = accounts.find(a => a.email === email.trim().toLowerCase());
  if (!account) return { found: false };
  if (!account.securityQuestion || !account.securityAnswerHash) return { found: false };
  return { found: true, question: account.securityQuestion };
}

export async function resetPasswordWithSecurity(
  email: string,
  securityAnswer: string,
  newPassword: string,
): Promise<{ ok: boolean; error?: string }> {
  const accounts = loadAccounts();
  const trimmedEmail = email.trim().toLowerCase();
  const account = accounts.find(a => a.email === trimmedEmail);
  if (!account) return { ok: false, error: "No account found with this email." };
  if (!account.securityQuestion || !account.securityAnswerHash) {
    return { ok: false, error: "This account has no security question set." };
  }

  const answerHash = await hashPassword(securityAnswer.trim().toLowerCase());
  if (answerHash !== account.securityAnswerHash) {
    return { ok: false, error: "Incorrect security answer." };
  }

  const pwCheck = checkPassword(newPassword);
  if (!pwCheck.valid) {
    return { ok: false, error: "New password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number." };
  }

  const newHash = await hashPassword(newPassword);
  const idx = accounts.findIndex(a => a.id === account.id);
  accounts[idx] = { ...accounts[idx], passwordHash: newHash };
  delete (accounts[idx] as any).password;
  saveAccounts(accounts);
  return { ok: true };
}

export async function updateSecurityQuestion(
  id: string,
  currentPassword: string,
  securityQuestion: string,
  securityAnswer: string,
): Promise<{ ok: boolean; error?: string }> {
  const accounts = loadAccounts();
  const account = accounts.find(a => a.id === id);
  if (!account) return { ok: false, error: "Account not found." };

  const currentHash = await hashPassword(currentPassword);
  const match = account.passwordHash === currentHash
    || (account as any).password === currentPassword;
  if (!match) return { ok: false, error: "Current password is incorrect." };

  if (!securityQuestion || !securityAnswer.trim()) {
    return { ok: false, error: "Please select a question and provide an answer." };
  }

  const answerHash = await hashPassword(securityAnswer.trim().toLowerCase());
  const idx = accounts.findIndex(a => a.id === id);
  accounts[idx] = { ...accounts[idx], securityQuestion, securityAnswerHash: answerHash };
  saveAccounts(accounts);
  return { ok: true };
}

// ─── Update Username ─────────────────────────────────────────────────────────
export async function updateUsername(
  id: string,
  currentPassword: string,
  newUsername: string,
): Promise<{ ok: boolean; error?: string }> {
  const accounts = loadAccounts();
  const account = accounts.find(a => a.id === id);
  if (!account) return { ok: false, error: "Account not found." };
  const currentHash = await hashPassword(currentPassword);
  const match = account.passwordHash === currentHash || (account as any).password === currentPassword;
  if (!match) return { ok: false, error: "Current password is incorrect." };
  const trimmed = newUsername.trim();
  if (!trimmed || trimmed.length < 2) return { ok: false, error: "Username must be at least 2 characters." };
  const idx = accounts.findIndex(a => a.id === id);
  accounts[idx] = { ...accounts[idx], username: trimmed };
  saveAccounts(accounts);
  return { ok: true };
}

// ─── Update Email ─────────────────────────────────────────────────────────────
export async function updateEmail(
  id: string,
  currentPassword: string,
  newEmail: string,
): Promise<{ ok: boolean; error?: string }> {
  const accounts = loadAccounts();
  const account = accounts.find(a => a.id === id);
  if (!account) return { ok: false, error: "Account not found." };
  const currentHash = await hashPassword(currentPassword);
  const match = account.passwordHash === currentHash || (account as any).password === currentPassword;
  if (!match) return { ok: false, error: "Current password is incorrect." };
  const trimmedEmail = newEmail.trim().toLowerCase();
  if (!isValidEmail(trimmedEmail)) return { ok: false, error: "Please enter a valid email address." };
  if (accounts.find(a => a.email === trimmedEmail && a.id !== id)) return { ok: false, error: "This email is already in use." };
  const idx = accounts.findIndex(a => a.id === id);
  accounts[idx] = { ...accounts[idx], email: trimmedEmail };
  saveAccounts(accounts);
  return { ok: true };
}

// ─── Delete Account ───────────────────────────────────────────────────────────
export function deleteAccount(id: string): { ok: boolean; error?: string } {
  const accounts = loadAccounts();
  const idx = accounts.findIndex(a => a.id === id);
  if (idx === -1) return { ok: false, error: "Account not found." };
  accounts.splice(idx, 1);
  saveAccounts(accounts);
  setCurrentAccount(null);
  return { ok: true };
}

// ─── Export / Import Account Data ───────────────────────────────────────────
export interface ExportedData {
  version: 1;
  exportedAt: string;
  username: string;
  email: string;
  savedResult: SavedResult | null;
  savedGoals: string[];
  preferredCountries: string[];
}

export function exportAccountData(id: string): ExportedData | null {
  const account = loadAccounts().find(a => a.id === id);
  if (!account) return null;
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    username: account.username,
    email: account.email,
    savedResult: account.savedResult,
    savedGoals: account.savedGoals,
    preferredCountries: account.preferredCountries,
  };
}

export function importAccountData(
  id: string,
  data: ExportedData
): { ok: boolean; error?: string } {
  if (!data || data.version !== 1) {
    return { ok: false, error: "Invalid or unsupported backup file." };
  }
  const accounts = loadAccounts();
  const idx = accounts.findIndex(a => a.id === id);
  if (idx === -1) return { ok: false, error: "Account not found." };

  accounts[idx] = {
    ...accounts[idx],
    savedResult: data.savedResult,
    savedGoals: data.savedGoals ?? [],
    preferredCountries: data.preferredCountries ?? [],
  };
  saveAccounts(accounts);
  return { ok: true };
}
