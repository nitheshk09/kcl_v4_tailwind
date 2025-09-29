import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NAV_ROUTES, RouteKey } from '../routes';
import { DashboardScreen } from '../../screens/DashboardScreen';
import { LanguageSelectionScreen } from '../../screens/LanguageSelection';
import { SettingsScreen } from '../../screens/SettingsScreen';
import { ProfileScreen } from '../../screens/ProfileScreen';
import { LanguageDropdown } from './components/LanguageDropdown';
import { ProfileButton } from './components/ProfileButton';

const ROUTE_COMPONENTS: Record<RouteKey, React.ComponentType> = {
  dashboard: DashboardScreen,
  language: LanguageSelectionScreen,
  settings: SettingsScreen,
  profile: ProfileScreen,
};

const PRIMARY_ROUTES = NAV_ROUTES.filter((route) => route.key !== 'language');

export function WebNavigator() {
  const { t } = useTranslation();
  const [activeRoute, setActiveRoute] = useState<RouteKey>('dashboard');

  const ActiveComponent = useMemo(() => ROUTE_COMPONENTS[activeRoute] ?? DashboardScreen, [activeRoute]);

  return (
    <View className="flex-1 app-screen-bg">
      <View className="w-full border-b border-border-light dark:border-border-dark">
        <View
          className="w-full flex-row items-center justify-between px-8 py-4"
          style={{ marginHorizontal: 'auto', maxWidth: 1280 }}
        >
          <Pressable
            accessibilityRole="button"
            className="flex-row items-center gap-3"
            onPress={() => setActiveRoute('dashboard')}
          >
            <View className="h-10 w-10 items-center justify-center rounded-full app-primary-btn">
              <Text className="text-lg font-bold text-white">MP</Text>
            </View>
            <Text className="text-xl font-bold app-header-text">{t('common.appName')}</Text>
          </Pressable>

          <View className="flex-row items-center gap-6">
            {PRIMARY_ROUTES.map((route) => {
              const isActive = route.key === activeRoute;
              return (
                <Pressable
                  key={route.key}
                  className="relative"
                  onPress={() => setActiveRoute(route.key)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                >
                  <Text
                    className={`text-base font-medium ${
                      isActive ? 'text-white' : 'app-header-text opacity-80'
                    }`}
                  >
                    {t(route.labelKey)}
                  </Text>
                  {isActive ? <View className="mt-2 h-1 rounded-full app-primary-btn" /> : null}
                </Pressable>
              );
            })}
          </View>

          <View className="flex-row items-center gap-4">
            <LanguageDropdown />
            <ProfileButton />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 48 }}>
        <View className="w-full px-8" style={{ maxWidth: 1280, width: '100%' }}>
          <ActiveComponent />
        </View>
      </ScrollView>
    </View>
  );
}
