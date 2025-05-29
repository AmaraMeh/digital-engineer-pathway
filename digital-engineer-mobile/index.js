import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';

// Register the main component
registerRootComponent(App);

// Also register with AppRegistry for React Native
AppRegistry.registerComponent('main', () => App); 