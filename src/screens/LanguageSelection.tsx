import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '../constants/languages';
import { useTheme } from '../theme/ThemeContext';
import { SupportedLanguage } from '../i18n/resources';

const cardStyles = ['app-card-theme-1', 'app-card-theme-2', 'app-card-theme-3', 'app-card-theme-4'] as const;

const getCardStyle = (index: number) => cardStyles[index % cardStyles.length];

type LanguageCardProps = {
  language: {
    id: string;
    label: string;
    code: string;
    flag: string;
  };
  index: number;
  isSelected: boolean;
  onPress: () => void;
};

function LanguageCard({ language, index, isSelected, onPress }: LanguageCardProps) {
  const cardStyle = useMemo(() => getCardStyle(index), [index]);
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${cardStyle} app-theme-transition p-4 rounded-2xl mb-3 mx-4 shadow-lg ${
        isSelected ? 'scale-105 shadow-xl' : 'scale-100'
      }`}
      style={{
        transform: [{ scale: isSelected ? 1.02 : 1 }],
        elevation: isSelected ? 8 : 4,
      }}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
            <Text className="text-white text-lg font-bold">{language.code.toUpperCase()}</Text>
          </View>
          <Text className="app-card-text text-lg font-semibold flex-1" numberOfLines={1}>
            {language.label}
          </Text>
        </View>
        <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
          <Text className="text-2xl" accessibilityLabel={`${language.label} flag`}>
            {language.flag}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function LanguageSelectionScreen() {
  const { t, i18n } = useTranslation();
  const { currentTheme, setTheme, isDark } = useTheme();
  const normalizedInitial = (i18n.language?.split('-')[0] || 'en') as SupportedLanguage;
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(normalizedInitial);

  const handleLanguageChange = (code: SupportedLanguage) => {
    setSelectedLanguage(code);
    if (i18n.language !== code) {
      i18n.changeLanguage(code).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to change language', error);
      });
    }
  };

  return (
    <View className={`flex-1 ${currentTheme === 'dark' ? 'dark' : ''}`}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#111827' : '#f8fafc'}
      />
      <SafeAreaView className="flex-1 app-screen-bg app-theme-transition">
        <View className="pt-4 pb-6">
          <Text className="app-header-text text-2xl font-bold text-center mb-2">
            {t('languageSelection.title')}
          </Text>
          <Text className="app-header-text text-center opacity-70 px-6">
            {t('languageSelection.subtitle')}
          </Text>
        </View>

        <View className="px-4 mb-4">
          <TouchableOpacity
            onPress={() => setTheme(isDark ? 'light' : 'dark')}
            className="self-end rounded-lg bg-gray-200 dark:bg-gray-700 px-3 py-2"
          >
            <Text className="text-gray-800 dark:text-gray-200 text-sm">
              {isDark ? t('languageSelection.toggleTheme.light') : t('languageSelection.toggleTheme.dark')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {languageOptions.map((language, index) => (
            <LanguageCard
              key={language.id}
              language={{
                id: language.id,
                code: language.code,
                label: t(language.nameKey),
                flag: language.flag,
              }}
              index={index}
              isSelected={selectedLanguage === language.code}
              onPress={() => handleLanguageChange(language.code)}
            />
          ))}
        </ScrollView>

        <View className="p-6">
          <TouchableOpacity
            className="app-primary-btn py-4 px-8 rounded-full shadow-lg app-theme-transition"
            style={{ elevation: 6 }}
            accessibilityRole="button"
            accessibilityHint="Proceed with the selected language"
          >
            <Text className="text-center font-bold text-lg text-white">
              {t('common.actions.continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
