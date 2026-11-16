import '@/global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import AppTabs from '@/components/app-tabs';
export default function RootLayout() {
  const dark = useColorScheme() === 'dark';
  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <AppTabs />
    </ThemeProvider>
  );
}
