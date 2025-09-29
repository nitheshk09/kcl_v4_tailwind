import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export function ProfileScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 app-screen-bg px-6 py-8 items-center">
      <Image
        source={{ uri: 'https://avatars.githubusercontent.com/u/1?v=4' }}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Text className="app-header-text text-2xl font-bold">Ada Lovelace</Text>
      <Text className="app-header-text opacity-70 mb-8">ada@example.com</Text>
      <View className="w-full rounded-2xl app-screen-bg border border-border-light dark:border-border-dark p-4">
        <Text className="app-header-text text-lg font-semibold mb-2">{t('profile.about')}</Text>
        <Text className="app-header-text opacity-70 text-sm">
          Learner, mathematician, and early computing pioneer exploring new languages.
        </Text>
      </View>
    </View>
  );
}
