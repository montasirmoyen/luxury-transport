import { User as FirebaseUser } from "firebase/auth";

export interface UserProfile {
  username?: string;
  bio?: string;
  profilePicture?: string; // URL or base64 string
  createdAt: string;
  updatedAt: string;
}

export interface BaseUser extends FirebaseUser {
  profileData: UserProfile | null;
}

export interface SignUpProfileData {
  username: string;
  bio?: string;
}

export interface AuthContextType {
  user: BaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    profileData: SignUpProfileData
  ) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}