import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  CourseDetails: { courseId: string };
  HtmlBasicsCourse: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Courses: undefined;
  Battle: undefined;
  Profile: undefined;
  Community: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 