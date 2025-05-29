import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';

interface Course {
  id: string;
  title: string;
  description: string;
  image?: string;
  duration: string;
  level: string;
  progress?: number;
}

const courses: Course[] = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    description: 'Learn the fundamentals of HTML and web development',
    duration: '2 hours',
    level: 'Beginner',
    progress: 60,
  },
  {
    id: 'css-basics',
    title: 'CSS Basics',
    description: 'Master CSS styling and layout techniques',
    duration: '3 hours',
    level: 'Beginner',
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Get started with JavaScript programming',
    duration: '4 hours',
    level: 'Intermediate',
  },
];

const CourseCard = ({ course, isDarkMode }: { course: Course; isDarkMode: boolean }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.courseCard,
        { backgroundColor: isDarkMode ? '#333333' : '#ffffff' }
      ]}
      onPress={() => navigation.navigate('CourseDetails', { courseId: course.id, title: course.title } as never)}
    >
      <View style={styles.courseContent}>
        <Text style={[styles.courseTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          {course.title}
        </Text>
        <Text style={[styles.courseDescription, { color: isDarkMode ? '#cccccc' : '#666666' }]}>
          {course.description}
        </Text>
        <View style={styles.courseMetadata}>
          <View style={styles.metadataItem}>
            <Ionicons name="time-outline" size={16} color={isDarkMode ? '#cccccc' : '#666666'} />
            <Text style={[styles.metadataText, { color: isDarkMode ? '#cccccc' : '#666666' }]}>
              {course.duration}
            </Text>
          </View>
          <View style={styles.metadataItem}>
            <Ionicons name="school-outline" size={16} color={isDarkMode ? '#cccccc' : '#666666'} />
            <Text style={[styles.metadataText, { color: isDarkMode ? '#cccccc' : '#666666' }]}>
              {course.level}
            </Text>
          </View>
        </View>
        {course.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
            </View>
            <Text style={[styles.progressText, { color: isDarkMode ? '#cccccc' : '#666666' }]}>
              {course.progress}%
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function Courses() {
  const { isDarkMode } = useTheme();
  const { translations } = useLanguage();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          {translations.courses}
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#cccccc' : '#666666' }]}>
          Start your learning journey
        </Text>
      </View>

      <View style={styles.courseList}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isDarkMode={isDarkMode}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  courseList: {
    padding: 16,
  },
  courseCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  courseMetadata: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metadataText: {
    fontSize: 14,
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 