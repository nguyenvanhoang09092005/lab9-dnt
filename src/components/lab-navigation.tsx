import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLabTheme } from '@/components/lab-ui';
export default function AppTabs() {
  const t = useLabTheme(),
    insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: t.accent,
        tabBarInactiveTintColor: t.muted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: t.surface,
          borderTopColor: t.border,
          height: 72 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: { fontSize: 12, lineHeight: 18, fontWeight: '600' },
        sceneStyle: { backgroundColor: t.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trải nghiệm',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22, lineHeight: 24, height: 24, width: 26, textAlign: 'center' }}>◈</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Hướng dẫn',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22, lineHeight: 24, height: 24, width: 26, textAlign: 'center' }}>ⓘ</Text>
          ),
        }}
      />
    </Tabs>
  );
}
