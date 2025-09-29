import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES, RouteKey } from '../routes';
import { DashboardScreen } from '../../screens/DashboardScreen';
import { LanguageSelectionScreen } from '../../screens/LanguageSelection';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';

const ROUTE_COMPONENTS: Record<RouteKey, React.ComponentType> = {
  dashboard: DashboardScreen,
  language: LanguageSelectionScreen,
  settings: SettingsScreen,
  profile: ProfileScreen,
};

export function MobileNavigator() {
  const { t } = useTranslation();
  const [activeRoute, setActiveRoute] = useState<RouteKey>('dashboard');

  const ActiveComponent = useMemo(() => ROUTE_COMPONENTS[activeRoute] ?? DashboardScreen, [activeRoute]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <ActiveComponent />
      </View>
      <View className="app-screen-bg border-t border-border-light dark:border-border-dark px-4 py-3">
        <View className="flex-row justify-between">
          {NAV_ROUTES.map((route) => {
            const isActive = route.key === activeRoute;
            return (
              <Pressable
                key={route.key}
                className={`flex-1 items-center rounded-full py-2 mx-1 ${
                  isActive ? 'app-primary-btn' : 'app-screen-bg'
                }`}
                onPress={() => setActiveRoute(route.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <Text className={`text-xl ${isActive ? 'text-white' : 'app-header-text'}`}>{route.icon}</Text>
                <Text
                  className={`text-xs font-medium mt-1 ${
                    isActive ? 'text-white' : 'app-header-text opacity-80'
                  }`}
                >
                  {t(route.labelKey)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
