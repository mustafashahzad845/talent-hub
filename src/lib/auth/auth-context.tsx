"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Role } from "@/lib/types";
import { getStoredRole, storeRole } from "@/lib/auth/mock-auth";

interface AuthContextValue {
  role: Role;
  isHR: boolean;
  isEmployee: boolean;
  setMockRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(() => getStoredRole());

  const setMockRole = useCallback((next: Role) => {
    storeRole(next);
    setRole(next);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      role,
      isHR: role === "HR" || role === "ADMIN",
      isEmployee: role === "EMPLOYEE",
      setMockRole,
    }),
    [role, setMockRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}