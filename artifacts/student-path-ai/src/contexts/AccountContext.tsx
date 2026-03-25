import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import {
  Account, SavedResult, ExportedData,
  getCurrentAccount, registerAccount, loginAccount, logoutAccount,
  saveResultToAccount, updateAccountGoals, updatePreferredCountries,
  changePassword, exportAccountData, importAccountData,
  getSecurityQuestionForEmail, resetPasswordWithSecurity, updateSecurityQuestion,
  updateUsername, updateEmail, deleteAccount,
} from "@/lib/accounts";

interface AccountContextValue {
  account: Account | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (username: string, email: string, password: string, securityQuestion?: string, securityAnswer?: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  saveResult: (data: SavedResult) => void;
  setGoals: (goals: string[]) => void;
  setPreferredCountries: (countries: string[]) => void;
  changePass: (currentPassword: string, newPassword: string) => Promise<{ ok: boolean; error?: string }>;
  exportData: () => ExportedData | null;
  importData: (data: ExportedData) => { ok: boolean; error?: string };
  getSecurityQuestion: (email: string) => { found: boolean; question?: string };
  resetPassword: (email: string, securityAnswer: string, newPassword: string) => Promise<{ ok: boolean; error?: string }>;
  updateSecurityQ: (currentPassword: string, question: string, answer: string) => Promise<{ ok: boolean; error?: string }>;
  updateUser: (currentPassword: string, newUsername: string) => Promise<{ ok: boolean; error?: string }>;
  updateUserEmail: (currentPassword: string, newEmail: string) => Promise<{ ok: boolean; error?: string }>;
  deleteAcc: () => { ok: boolean; error?: string };
  refresh: () => void;
}

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(() => getCurrentAccount());

  const refresh = useCallback(() => setAccount(getCurrentAccount()), []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginAccount(email, password);
    if (res.ok && res.account) setAccount(res.account);
    return { ok: res.ok, error: res.error };
  }, []);

  const register = useCallback(async (username: string, email: string, password: string, securityQuestion?: string, securityAnswer?: string) => {
    const res = await registerAccount(username, email, password, securityQuestion, securityAnswer);
    if (res.ok && res.account) setAccount(res.account);
    return { ok: res.ok, error: res.error };
  }, []);

  const logout = useCallback(() => {
    logoutAccount();
    setAccount(null);
  }, []);

  const saveResult = useCallback((data: SavedResult) => {
    if (!account) return;
    saveResultToAccount(account.id, data);
    refresh();
  }, [account, refresh]);

  const setGoals = useCallback((goals: string[]) => {
    if (!account) return;
    updateAccountGoals(account.id, goals);
    refresh();
  }, [account, refresh]);

  const setPreferredCountries = useCallback((countries: string[]) => {
    if (!account) return;
    updatePreferredCountries(account.id, countries);
    refresh();
  }, [account, refresh]);

  const changePass = useCallback(async (currentPassword: string, newPassword: string) => {
    if (!account) return { ok: false, error: "Not logged in." };
    const res = await changePassword(account.id, currentPassword, newPassword);
    return res;
  }, [account]);

  const exportData = useCallback(() => {
    if (!account) return null;
    return exportAccountData(account.id);
  }, [account]);

  const importData = useCallback((data: ExportedData) => {
    if (!account) return { ok: false, error: "Not logged in." };
    const res = importAccountData(account.id, data);
    if (res.ok) refresh();
    return res;
  }, [account, refresh]);

  const getSecurityQuestion = useCallback((email: string) => {
    return getSecurityQuestionForEmail(email);
  }, []);

  const resetPassword = useCallback(async (email: string, securityAnswer: string, newPassword: string) => {
    return resetPasswordWithSecurity(email, securityAnswer, newPassword);
  }, []);

  const updateSecurityQ = useCallback(async (currentPassword: string, question: string, answer: string) => {
    if (!account) return { ok: false, error: "Not logged in." };
    const res = await updateSecurityQuestion(account.id, currentPassword, question, answer);
    if (res.ok) refresh();
    return res;
  }, [account, refresh]);

  const updateUser = useCallback(async (currentPassword: string, newUsername: string) => {
    if (!account) return { ok: false, error: "Not logged in." };
    const res = await updateUsername(account.id, currentPassword, newUsername);
    if (res.ok) refresh();
    return res;
  }, [account, refresh]);

  const updateUserEmail = useCallback(async (currentPassword: string, newEmail: string) => {
    if (!account) return { ok: false, error: "Not logged in." };
    const res = await updateEmail(account.id, currentPassword, newEmail);
    if (res.ok) refresh();
    return res;
  }, [account, refresh]);

  const deleteAcc = useCallback(() => {
    if (!account) return { ok: false, error: "Not logged in." };
    const res = deleteAccount(account.id);
    if (res.ok) setAccount(null);
    return res;
  }, [account]);

  return (
    <AccountContext.Provider value={{ account, login, register, logout, saveResult, setGoals, setPreferredCountries, changePass, exportData, importData, getSecurityQuestion, resetPassword, updateSecurityQ, updateUser, updateUserEmail, deleteAcc, refresh }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used inside AccountProvider");
  return ctx;
}
