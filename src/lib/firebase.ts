import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtv9tiAg4dGG2MfVj-nS-CzoNEUIR_14Y",
  authDomain: "sample-firebase-ai-apph-48570.firebaseapp.com",
  projectId: "sample-firebase-ai-apph-48570",
  storageBucket: "sample-firebase-ai-apph-48570.firebasestorage.app",
  messagingSenderId: "560740686768",
  appId: "1:560740686768:web:2b61a3a13069cfecef5475"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth functions
export const signUp = async (
  email: string, 
  password: string, 
  displayName: string,
  additionalData?: {
    phone?: string;
    experienceLevel?: string;
    primaryLanguage?: string;
    otherLanguages?: string[];
    learningGoals?: string[];
    githubUsername?: string;
    linkedinProfile?: string;
    bio?: string;
    preferredLearningTime?: string;
    newsletter?: boolean;
  }
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: email,
      displayName: displayName,
      photoURL: userCredential.user.photoURL || "",
      createdAt: serverTimestamp(),
      // Learning stats
      totalCourses: 0,
      completedCourses: 0,
      totalAchievements: 0,
      learningStreak: 0,
      totalTimeSpent: 0,
      // Battle stats
      battleRoyaleWins: 0,
      totalBattles: 0,
      // Additional profile data
      phone: additionalData?.phone || "",
      experienceLevel: additionalData?.experienceLevel || "beginner",
      primaryLanguage: additionalData?.primaryLanguage || "",
      otherLanguages: additionalData?.otherLanguages || [],
      learningGoals: additionalData?.learningGoals || [],
      githubUsername: additionalData?.githubUsername || "",
      linkedinProfile: additionalData?.linkedinProfile || "",
      bio: additionalData?.bio || "",
      preferredLearningTime: additionalData?.preferredLearningTime || "flexible",
      newsletter: additionalData?.newsletter || false,
      lastActive: serverTimestamp(),
    });

    // Create initial leaderboard entry
    await setDoc(doc(db, "leaderboard", userCredential.user.uid), {
      uid: userCredential.user.uid,
      displayName: displayName,
      photoURL: userCredential.user.photoURL || "",
      totalScore: 0,
      battlesWon: 0,
      battlesPlayed: 0,
      rank: "bronze",
      experienceLevel: additionalData?.experienceLevel || "beginner",
      primaryLanguage: additionalData?.primaryLanguage || "",
      joinedAt: serverTimestamp(),
      lastActive: serverTimestamp(),
    });

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};
