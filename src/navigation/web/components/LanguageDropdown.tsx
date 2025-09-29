import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '../../../constants/languages';
import { SupportedLanguage } from '../../../i18n/resources';

export function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = useMemo(() => {
    const code = (i18n.language?.split('-')[0] || 'en') as SupportedLanguage;
    return languageOptions.find((option) => option.code === code) ?? languageOptions[0];
  }, [i18n.language]);

  const handleSelect = async (code: SupportedLanguage) => {
    setIsOpen(false);
    if (code !== currentLanguage.code) {
      try {
        await i18n.changeLanguage(code);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to change language', error);
      }
    }
  };

  return (
    <View className="relative">
      <Pressable
        accessibilityRole="button"
        onPress={() => setIsOpen((previous) => !previous)}
        className="flex-row items-center gap-2 rounded-full border border-border-light dark:border-border-dark bg-black/10 px-3 py-2"
      >
        <Text className="text-lg">🌐</Text>
        <Text className="text-sm font-semibold app-header-text">
          {t(currentLanguage.nameKey)}
        </Text>
      </Pressable>
      {isOpen ? (
        <View className="absolute right-0 mt-2 w-48 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-lg">
          {languageOptions.map((option) => {
            const isSelected = option.code === currentLanguage.code;
            return (
              <Pressable
                key={option.code}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                className={`flex-row items-center justify-between px-4 py-3 ${
                  isSelected ? 'bg-black/10 dark:bg-white/10' : ''
                }`}
                onPress={() => handleSelect(option.code)}
              >
                <View className="flex-row items-center gap-2">
                  <Text className="text-lg">{option.flag}</Text>
                  <Text className="text-sm app-header-text">{t(option.nameKey)}</Text>
                </View>
                {isSelected ? <Text className="text-sm app-header-text">✓</Text> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
