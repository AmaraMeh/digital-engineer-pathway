import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5XYqWKhHdiVDXJx4iOwtpxD8eUCPRfKU",
  authDomain: "universite-de-bejaia-547fc.firebaseapp.com",
  databaseURL: "https://universite-de-bejaia-547fc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "universite-de-bejaia-547fc",
  storageBucket: "universite-de-bejaia-547fc.firebasestorage.app",
  messagingSenderId: "517622731583",
  appId: "1:517622731583:web:25453d5e01226585bf798a",
  measurementId: "G-SQ0WWSCS7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

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
    await setDoc(doc(firestore, "users", userCredential.user.uid), {
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
    await setDoc(doc(firestore, "leaderboard", userCredential.user.uid), {
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

export { app, analytics, db, firestore, auth, storage };
