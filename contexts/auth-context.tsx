"use client"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../lib/firebase";
import {
  AuthContextType,
  BaseUser,
  SignUpProfileData,
  UserProfile,
} from "../types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const toIsoString = (value: any): string => {
  if (!value) {
    return new Date().toISOString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "object" && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  if (typeof value === "string") {
    return value;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

const normalizeProfileData = (profileData: any): UserProfile | null => {
  if (!profileData) {
    return null;
  }

  return {
    username: profileData.username ?? undefined,
    createdAt: toIsoString(profileData.createdAt),
    updatedAt: toIsoString(profileData.updatedAt),
  };
};

const buildBaseUser = (firebaseUser: User, profileData: any): BaseUser => ({
  ...firebaseUser,
  profileData: normalizeProfileData(profileData),
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(buildBaseUser(firebaseUser, userData.profileData));
        } else {
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (
    email: string,
    password: string,
    profileData: SignUpProfileData
  ) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (profileData.username) {
        await updateProfile(firebaseUser, { displayName: profileData.username });
      }

      const now = new Date().toISOString();
      const firestoreProfileData: UserProfile = {
        username: profileData.username,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(doc(db, "users", firebaseUser.uid), {
        profileData: firestoreProfileData,
        createdAt: now,
        updatedAt: now,
      });

    } catch (error) {
      console.error("Error signing up:", error);
      if (auth.currentUser) {
        await auth.currentUser.delete();
      }
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      if (!userDoc.exists()) {
        await signOut(auth);
        throw new Error("User profile not found. Please contact support.");
      }
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            throw new Error("No account found with this email address.");
          case "auth/wrong-password":
            throw new Error("Incorrect password. Please try again.");
          case "auth/invalid-email":
            throw new Error("Please enter a valid email address.");
          case "auth/user-disabled":
            throw new Error(
              "This account has been disabled. Please contact support."
            );
          case "auth/too-many-requests":
            throw new Error(
              "Too many failed attempts. Please try again later."
            );
          case "auth/network-request-failed":
            throw new Error(
              "Network error. Please check your connection and try again."
            );
          default:
            throw new Error(
              "Login failed. Please check your credentials and try again."
            );
        }
      }

      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const updateUserProfile = async (
    profileData: Partial<UserProfile>
  ) => {
    if (!user) {
      throw new Error("No user logged in");
    }

    try {
      if (profileData.username && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: profileData.username,
        });
      }

      if (profileData.profilePicture && auth.currentUser) {
        await updateProfile(auth.currentUser, {
          photoURL: profileData.profilePicture,
        });
      }

      const now = new Date().toISOString();
      const updatedProfileData: UserProfile = {
        username: profileData.username ?? user.profileData?.username,
        bio: profileData.bio ?? user.profileData?.bio,
        profilePicture: profileData.profilePicture ?? user.profileData?.profilePicture,
        createdAt: user.profileData?.createdAt ?? now,
        updatedAt: now,
      };

      await updateDoc(doc(db, "users", user.uid), {
        profileData: updatedProfileData,
        updatedAt: now,
      });

      setUser({
        ...user,
        profileData: updatedProfileData,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut: signOutUser,
    updateProfile: updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
