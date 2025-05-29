import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  lastAccessed: string;
  completed: boolean;
  currentLesson: string;
  totalLessons: number;
  completedLessons: number;
  timeSpent: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalAchievements: number;
  learningStreak: number;
  totalTimeSpent: number;
  battleRoyaleWins: number;
  totalBattles: number;
  points: number;
  rank: string;
  experienceLevel: string;
  currentStudyStreak: number;
  bestStudyStreak: number;
  averageDailyStudy: number;
}

interface ProgressContextType {
  courseProgress: CourseProgress[];
  achievements: Achievement[];
  userStats: UserStats;
  loading: boolean;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalCourses: 0,
    completedCourses: 0,
    totalAchievements: 0,
    learningStreak: 0,
    totalTimeSpent: 0,
    battleRoyaleWins: 0,
    totalBattles: 0,
    points: 0,
    rank: 'BRONZE',
    experienceLevel: 'beginner',
    currentStudyStreak: 0,
    bestStudyStreak: 0,
    averageDailyStudy: 0,
  });
  const [loading, setLoading] = useState(true);

  const refreshProgress = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);

      // Fetch user stats
      const userDoc = doc(db, "users", currentUser.uid);
      const userUnsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setUserStats({
            totalCourses: data.totalCourses || 0,
            completedCourses: data.completedCourses || 0,
            totalAchievements: data.totalAchievements || 0,
            learningStreak: data.learningStreak || 0,
            totalTimeSpent: data.totalTimeSpent || 0,
            battleRoyaleWins: data.battleRoyaleWins || 0,
            totalBattles: data.totalBattles || 0,
            points: data.points || 0,
            rank: data.rank || 'BRONZE',
            experienceLevel: data.experienceLevel || 'beginner',
            currentStudyStreak: data.currentStudyStreak || 0,
            bestStudyStreak: data.bestStudyStreak || 0,
            averageDailyStudy: data.averageDailyStudy || 0,
          });
        }
      });

      // Fetch course progress
      const progressRef = collection(db, "courseProgress");
      const progressQuery = query(
        progressRef,
        where("userId", "==", currentUser.uid),
        orderBy("lastAccessed", "desc")
      );
      const progressUnsubscribe = onSnapshot(progressQuery, (snapshot) => {
        const progressData = snapshot.docs.map(doc => ({
          courseId: doc.id,
          ...doc.data()
        })) as CourseProgress[];
        setCourseProgress(progressData);
      });

      // Fetch achievements
      const achievementsRef = collection(db, "userAchievements");
      const achievementsQuery = query(
        achievementsRef,
        where("userId", "==", currentUser.uid),
        orderBy("earnedDate", "desc")
      );
      const achievementsUnsubscribe = onSnapshot(achievementsQuery, (snapshot) => {
        const achievementsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Achievement[];
        setAchievements(achievementsData);
      });

      // Return cleanup function
      return () => {
        userUnsubscribe();
        progressUnsubscribe();
        achievementsUnsubscribe();
      };
    } catch (error) {
      console.error("Error refreshing progress:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cleanup = refreshProgress();
    return () => {
      if (cleanup) cleanup();
    };
  }, [currentUser]);

  return (
    <ProgressContext.Provider value={{
      courseProgress,
      achievements,
      userStats,
      loading,
      refreshProgress: async () => {
        await refreshProgress();
      }
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}; 