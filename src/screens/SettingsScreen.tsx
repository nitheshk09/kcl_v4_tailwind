import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';

export function SettingsScreen() {
  const { t } = useTranslation();
  const { isDark, setTheme } = useTheme();

  return (
    <View className="flex-1 app-screen-bg px-6 py-8">
      <Text className="app-header-text text-3xl font-bold mb-6">{t('settings.title')}</Text>
      <View className="rounded-2xl app-screen-bg border border-border-light dark:border-border-dark p-4 mb-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="app-header-text text-lg font-semibold">{t('settings.darkMode')}</Text>
            <Text className="app-header-text opacity-70 text-sm">{t('settings.darkModeDescription')}</Text>
          </View>
          <Switch value={isDark} onValueChange={(value) => setTheme(value ? 'dark' : 'light')} />
        </View>
      </View>
      <View className="rounded-2xl app-screen-bg border border-border-light dark:border-border-dark p-4">
        <Text className="app-header-text text-lg font-semibold mb-2">{t('settings.notifications')}</Text>
        <Text className="app-header-text opacity-70 text-sm">{t('settings.notificationsDescription')}</Text>
      </View>
    </View>
  );
}
