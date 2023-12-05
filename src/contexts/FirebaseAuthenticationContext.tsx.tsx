"use client"

import React, { ReactNode, useContext, createContext, useEffect, useState } from "react";

import { auth, database } from "@/lib/firebase/config/firebase";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User
} from "firebase/auth";
import {
  ref,
  set,
  serverTimestamp
} from "firebase/database";

import { Error } from "@/lib/errorFirebase";
import { useRouter } from "next/navigation";

interface FirebaseAuthenticationContextProviderProps {
  children: ReactNode;
}

interface AuthenticationContextProps {
  user: User | null;
  isAuthenticated: boolean;
  loginWithEmailPassword: (props: SignInProps) => void;
  signUpWithEmailPassword: (props: SignUpProps) => Promise<void>;
  resetPassword: (props: ResetProps) => void;
  logout: () => void;
  loading: boolean;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  institution: string;
  discipline: string;
  email: string;
  password: string;
  role?: "adm" | "tearch" | "student";
}

interface ResetProps {
  email: string;
}

export const AuthenticationContext = createContext<AuthenticationContextProps | null>(null)

export function FirebaseAuthenticationContextProvider({ children }: FirebaseAuthenticationContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = !!user;
  const router = useRouter();

  const loginWithEmailPassword = async ({ email, password }: SignInProps) => {
    try {
      setLoading(true)
      const { user: User } = await signInWithEmailAndPassword(auth, email, password)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const { err } = Error(error)
      alert(err)
    }
  }

  const signUpWithEmailPassword = async ({ discipline, email, institution, password, role }: SignUpProps) => {
    try {
      setLoading(true)
      const { user: User } = await createUserWithEmailAndPassword(auth, email, password);

      if (User.uid) {
        await set(ref(database, `users/${User.uid}`), {
          email: email,
          discipline: discipline,
          institution: institution,
          created_at: serverTimestamp(),
          role: role = "student"
        }).then(() => {
          setLoading(false)
        })
      }

    } catch (error) {
      setLoading(false)
      const { err } = Error(error)
      alert(err)
    }
  }

  const resetPassword = async ({ email }: ResetProps) => {
    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email).then(() => alert("Link para redefinir sua senha foi enviado com sucesso!"))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const { err } = Error(error)
      alert(err)
    }
  }

  const logout = async () => {
    const confirm = window.confirm("Você deseja realmente sair?")

    if (confirm) {
      await signOut(auth)
    } else {
      return null
    }
  }

  useEffect(() => {
    const stateUser = onAuthStateChanged(auth, (state) => {
      if (state?.email) {
        setUser(state)
        router.push("/dashboard/sys/patient")
      } else {
        router.push("/auth/signin")
      }
    })

    return () => stateUser();
  }, [])

  return (
    <AuthenticationContext.Provider value={{ user, isAuthenticated, loginWithEmailPassword, signUpWithEmailPassword, resetPassword, logout, loading }}>
      {children}
    </AuthenticationContext.Provider>
  )

} 

export const useAuthenticationContext = () => useContext(AuthenticationContext)