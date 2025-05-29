import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  HtmlBasicsCourse: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'HtmlBasicsCourse'>;

const HtmlBasicsCourse: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const [currentLesson, setCurrentLesson] = useState(0);

  const lessons = [
    {
      title: 'Introduction to HTML',
      content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages...',
      exercises: [
        'Create a basic HTML document structure',
        'Add headings and paragraphs',
        'Create a simple list',
      ],
    },
    {
      title: 'HTML Elements and Tags',
      content: 'HTML elements are the building blocks of HTML pages...',
      exercises: [
        'Use different heading levels',
        'Create a table',
        'Add images to your page',
      ],
    },
    // Add more lessons as needed
  ];

  const handleNextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>
            {lessons[currentLesson].title}
          </Text>
        </View>

        <View style={styles.lessonContent}>
          <Text style={[styles.contentText, { color: theme.text }]}>
            {lessons[currentLesson].content}
          </Text>

          <View style={styles.exercises}>
            <Text style={[styles.exercisesTitle, { color: theme.text }]}>
              Exercises
            </Text>
            {lessons[currentLesson].exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Ionicons name="code" size={20} color={theme.primary} />
                <Text style={[styles.exerciseText, { color: theme.text }]}>
                  {exercise}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              { backgroundColor: theme.primary },
              currentLesson === 0 && styles.disabledButton,
            ]}
            onPress={handlePreviousLesson}
            disabled={currentLesson === 0}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              { backgroundColor: theme.primary },
              currentLesson === lessons.length - 1 && styles.disabledButton,
            ]}
            onPress={handleNextLesson}
            disabled={currentLesson === lessons.length - 1}
          >
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lessonContent: {
    marginBottom: 30,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  exercises: {
    marginTop: 20,
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  exerciseText: {
    fontSize: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HtmlBasicsCourse; 