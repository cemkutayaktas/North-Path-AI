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
