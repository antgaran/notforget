import {Tabs} from 'expo-router';
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import {HapticTab} from '@/components/haptic-tab';
import {IconSymbol} from '@/components/ui/icon-symbol';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
        <Tabs.Screen
            name="schools"
            options={{
                title: 'Schools',
                tabBarIcon: ({ color }) => <Ionicons name="school" size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="students"
            options={{
                title: 'Students',
                tabBarIcon: ({ color }) => <Octicons name="person-fill" size={24} color={color} />,
            }}
        />
        <Tabs.Screen
            name="teachers"
            options={{
                title: 'Teachers',
                tabBarIcon: ({ color }) => <FontAwesome6 name="person-chalkboard" size={24} color={color} />,
            }}
        />
    </Tabs>
  );
}
