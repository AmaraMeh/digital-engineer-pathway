import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Auth Stack Screens
import Login from './src/screens/auth/Login';
import Signup from './src/screens/auth/Signup';

// Main Tab Screens
import Home from './src/screens/main/Home';
import Courses from './src/screens/main/Courses';
import BattleRoyale from './src/screens/main/BattleRoyale';
import Profile from './src/screens/main/Profile';

// Course Screens
import CourseDetails from './src/screens/courses/CourseDetails';
import HtmlBasicsCourse from './src/screens/courses/HtmlBasicsCourse';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Courses':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Battle':
              iconName = focused ? 'game-controller' : 'game-controller-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Battle" component={BattleRoyale} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="MainTabs" component={MainTabs} />
              <Stack.Screen 
                name="CourseDetails" 
                component={CourseDetails}
                options={{
                  headerShown: true,
                  title: 'Course Details'
                }}
              />
              <Stack.Screen
                name="HtmlBasicsCourse"
                component={HtmlBasicsCourse}
                options={{
                  headerShown: true,
                  title: 'HTML Basics'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
} 