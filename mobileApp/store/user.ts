import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IUser {
    userId: string;
    name: string;
    email: string;
    picture: string;
    createdAt: string;
}

interface IUserState {
    user: IUser | null;
    accessToken: string | null;

    setUser: (userData: IUser) => void;
    logout: () => void;

    setAccessToken: (token: string) => void;

    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<IUserState>()(
    persist(
        (set, get) => ({
            user: null,
            accessToken: null,

            setUser: (userData: IUser) => set({ user: userData }),
            logout: () => set({ user: null, accessToken: null }),

            setAccessToken: (token: string) => set({ accessToken: token }),

            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state
                })
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            }
        }
    )
)