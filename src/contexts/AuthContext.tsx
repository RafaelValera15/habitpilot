"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirebaseAnalytics, getFirebaseAuth } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const isBrowser = typeof window !== "undefined";
  const auth = useMemo(() => (isBrowser ? getFirebaseAuth() : null), [isBrowser]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return () => {};
    }

    getFirebaseAnalytics().catch(() => {
      // Analytics is optional in SSR environments; ignore errors silently.
    });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signUp = useCallback(async (email: string, password: string, displayName?: string) => {
    if (!auth) {
      throw new Error("Firebase Auth is not available in this environment.");
    }
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }
    setUser(credential.user);
  }, [auth]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase Auth is not available in this environment.");
    }
    const credential = await signInWithEmailAndPassword(auth, email, password);
    setUser(credential.user);
  }, [auth]);

  const signOutUser = useCallback(async () => {
    if (!auth) {
      throw new Error("Firebase Auth is not available in this environment.");
    }
    await signOut(auth);
    setUser(null);
  }, [auth]);

  const value = useMemo(
    () => ({
      user,
      loading,
      signUp,
      signIn,
      signOutUser,
    }),
    [loading, signIn, signOutUser, signUp, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
