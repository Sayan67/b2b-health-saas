import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { create } from 'zustand'
import { getFirebaseAuth } from '../lib/firebase'

type AuthUser = {
  displayName: string | null
  email: string | null
  id: string
}

type AuthState = {
  error: string | null
  initialized: boolean
  isLoading: boolean
  user: AuthUser | null
  clearError: () => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  subscribeToAuth: () => () => void
}

function mapAuthError(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : ''

  if (code.includes('invalid-credential') || code.includes('user-not-found') || code.includes('wrong-password')) {
    return 'The email or password is incorrect.'
  }

  if (code.includes('too-many-requests')) {
    return 'Too many attempts. Please wait a moment and try again.'
  }

  if (code.includes('network-request-failed')) {
    return 'Network error. Check your connection and try again.'
  }

  return 'Unable to sign in right now.'
}

export const useAuthStore = create<AuthState>((set) => ({
  error: null,
  initialized: false,
  isLoading: false,
  user: null,
  clearError: () => set({ error: null }),
  login: async (email, password) => {
    const auth = getFirebaseAuth()

    if (!auth) {
      set({
        error: 'Firebase is not configured.',
        isLoading: false,
      })
      return
    }

    set({ error: null, isLoading: true })

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      set({ error: mapAuthError(error) })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
  logout: async () => {
    const auth = getFirebaseAuth()

    if (!auth) {
      set({ user: null })
      return
    }

    await signOut(auth)
  },
  subscribeToAuth: () => {
    const auth = getFirebaseAuth()

    if (!auth) {
      set({ initialized: true, user: null })
      return () => undefined
    }

    return onAuthStateChanged(auth, (firebaseUser) => {
      set({
        initialized: true,
        user: firebaseUser
          ? {
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              id: firebaseUser.uid,
            }
          : null,
      })
    })
  },
}))
