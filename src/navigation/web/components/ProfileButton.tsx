import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export function ProfileButton() {
  const { t } = useTranslation();

  return (
    <Pressable
      accessibilityRole="button"
      className="flex-row items-center gap-2 rounded-full border border-border-light dark:border-border-dark bg-black/10 px-3 py-2"
    >
      <View className="h-8 w-8 items-center justify-center rounded-full bg-black/20 dark:bg-white/10">
        <Text className="text-lg">👤</Text>
      </View>
      <Text className="text-sm font-semibold app-header-text">{t('common.navigation.profile')}</Text>
    </Pressable>
  );
}
