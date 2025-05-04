import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

interface DashboardCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
  isDarkMode: boolean;
}

const DashboardCard = ({ title, icon, color, onPress, isDarkMode }: DashboardCardProps) => (
  <TouchableOpacity
    style={[
      styles.card,
      {
        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
        shadowColor: isDarkMode ? '#000000' : '#000000',
      },
    ]}
    onPress={onPress}
  >
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon} size={24} color="white" />
    </View>
    <Text style={[styles.cardTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function Home() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { isDarkMode } = useTheme();
  const { translations } = useLanguage();
  const { user } = useAuth();

  const cardWidth = (width - 48) / 2; // 48 = padding (16) * 2 + gap (16)

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          Welcome back, {user?.displayName || 'User'}!
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <DashboardCard
          title={translations.courses}
          icon="book"
          color="#6366f1"
          onPress={() => navigation.navigate('Courses' as never)}
          isDarkMode={isDarkMode}
        />
        <DashboardCard
          title={translations.battle}
          icon="game-controller"
          color="#ef4444"
          onPress={() => navigation.navigate('Battle' as never)}
          isDarkMode={isDarkMode}
        />
        <DashboardCard
          title="Progress"
          icon="bar-chart"
          color="#10b981"
          onPress={() => navigation.navigate('Profile' as never)}
          isDarkMode={isDarkMode}
        />
        <DashboardCard
          title="Community"
          icon="people"
          color="#8b5cf6"
          onPress={() => navigation.navigate('Community' as never)}
          isDarkMode={isDarkMode}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          Continue Learning
        </Text>
        <TouchableOpacity
          style={[
            styles.courseCard,
            { backgroundColor: isDarkMode ? '#333333' : '#ffffff' }
          ]}
          onPress={() => navigation.navigate('HtmlBasicsCourse' as never)}
        >
          <View style={styles.courseInfo}>
            <Text style={[styles.courseTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              HTML Basics
            </Text>
            <Text style={[styles.courseProgress, { color: isDarkMode ? '#cccccc' : '#666666' }]}>
              Progress: 60%
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          Recent Battles
        </Text>
        <TouchableOpacity
          style={[
            styles.battleCard,
            { backgroundColor: isDarkMode ? '#333333' : '#ffffff' }
          ]}
          onPress={() => navigation.navigate('Battle' as never)}
        >
          <View style={styles.battleInfo}>
            <Text style={[styles.battleTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              HTML Challenge
            </Text>
            <Text style={[styles.battleResult, { color: '#10b981' }]}>
              Victory
            </Text>
          </View>
          <Text style={[styles.battleDate, { color: isDarkMode ? '#cccccc' : '#666666' }]}>
            2 hours ago
          </Text>
        </TouchableOpacity>
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
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  card: {
    flex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  courseCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  courseProgress: {
    fontSize: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  battleCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  battleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  battleTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  battleResult: {
    fontSize: 14,
    fontWeight: '600',
  },
  battleDate: {
    fontSize: 12,
    marginTop: 4,
  },
}); 