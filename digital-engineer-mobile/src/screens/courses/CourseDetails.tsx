import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  CourseDetails: { courseId: string; title: string };
  HtmlBasicsCourse: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetails'>;

const CourseDetails: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { translations } = useLanguage();
  const { courseId, title } = route.params;

  const handleStartCourse = () => {
    navigation.navigate('HtmlBasicsCourse');
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
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Course Overview
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            This course will teach you the fundamentals of HTML and web development.
            You'll learn how to create and structure web pages, add content, and
            style your websites.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            What You'll Learn
          </Text>
          <View style={styles.learningPoints}>
            <View style={styles.point}>
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
              <Text style={[styles.pointText, { color: theme.text }]}>
                HTML Basics and Structure
              </Text>
            </View>
            <View style={styles.point}>
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
              <Text style={[styles.pointText, { color: theme.text }]}>
                Working with Text and Links
              </Text>
            </View>
            <View style={styles.point}>
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
              <Text style={[styles.pointText, { color: theme.text }]}>
                Images and Media
              </Text>
            </View>
            <View style={styles.point}>
              <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
              <Text style={[styles.pointText, { color: theme.text }]}>
                Forms and Input Elements
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: theme.primary }]}
          onPress={handleStartCourse}
        >
          <Text style={styles.startButtonText}>Start Course</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  learningPoints: {
    gap: 12,
  },
  point: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointText: {
    fontSize: 16,
  },
  startButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseDetails; 