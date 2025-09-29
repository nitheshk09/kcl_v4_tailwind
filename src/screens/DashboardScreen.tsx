import React, { useMemo } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HeroCarousel } from '../components/dashboard/HeroCarousel';
import { ContentCard } from '../components/dashboard/ContentCard';

type SectionProps = {
  title: string;
  actionLabel?: string;
  children: React.ReactNode;
};

function Section({ title, actionLabel, children }: SectionProps) {
  return (
    <View className="mb-8">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xl font-semibold app-header-text">{title}</Text>
        {actionLabel ? <Text className="text-sm font-semibold app-header-text opacity-70">{actionLabel}</Text> : null}
      </View>
      {children}
    </View>
  );
}

export function DashboardScreen() {
  const { t } = useTranslation();

  const heroItems = useMemo(
    () => [
      {
        id: 'hero-1',
        title: t('dashboard.heroTitle'),
        subtitle: t('dashboard.heroSubtitle'),
        badge: t('dashboard.featuredTitle'),
      },
      {
        id: 'hero-2',
        title: 'City Lights',
        subtitle: t('dashboard.heroSubtitle'),
      },
      {
        id: 'hero-3',
        title: 'Beyond the Horizon',
        subtitle: t('dashboard.heroSubtitle'),
      },
    ],
    [t],
  );

  const trendingItems = useMemo(
    () => [
      { id: 'trending-1', title: 'Midnight Dreams', subtitle: '25 min left' },
      { id: 'trending-2', title: 'Legend of Aarya', subtitle: 'S2 • Ep 4' },
      { id: 'trending-3', title: 'The Wanderers', subtitle: 'New' },
      { id: 'trending-4', title: 'Rising Waves', subtitle: 'Recommended' },
    ],
    [],
  );

  const continueItems = useMemo(
    () => [
      { id: 'continue-1', title: 'Hidden Truths', subtitle: '45% complete' },
      { id: 'continue-2', title: 'Ocean Blue', subtitle: '12 min left' },
      { id: 'continue-3', title: 'Crimson Peak', subtitle: 'S1 • Ep 9' },
    ],
    [],
  );

  if (Platform.OS === 'web') {
    return (
      <View className="w-full py-8">
        <Text className="mb-4 text-3xl font-bold app-header-text">{t('common.navigation.dashboard')}</Text>
        <Text className="mb-6 text-base app-header-text opacity-80">{t('dashboard.heroSubtitle')}</Text>

        <HeroCarousel items={heroItems} />

        <Section title={t('dashboard.trendingNow')} actionLabel={t('common.actions.viewAll')}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
            {trendingItems.map((item) => (
              <ContentCard key={item.id} title={item.title} subtitle={item.subtitle} />
            ))}
          </ScrollView>
        </Section>

        <Section title={t('dashboard.continueWatching')}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
            {continueItems.map((item) => (
              <ContentCard key={item.id} title={item.title} subtitle={item.subtitle} />
            ))}
          </ScrollView>
        </Section>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 app-screen-bg px-6 py-8" contentContainerStyle={{ paddingBottom: 32 }}>
      <Text className="app-header-text text-3xl font-bold mb-4">{t('common.navigation.dashboard')}</Text>
      <Text className="app-header-text text-base opacity-80 mb-8">{t('dashboard.heroSubtitle')}</Text>
      <View className="rounded-2xl app-primary-btn p-4 mb-4">
        <Text className="text-lg font-semibold text-white">{t('dashboard.trendingNow')}</Text>
        <Text className="text-sm text-white opacity-90">Hidden Truths • 25 min left</Text>
      </View>
      <View className="rounded-2xl app-screen-bg border border-border-light dark:border-border-dark p-4">
        <Text className="app-header-text text-lg font-semibold">{t('dashboard.continueWatching')}</Text>
        <Text className="app-header-text text-sm opacity-70">Ocean Blue • 12 min left</Text>
      </View>
    </ScrollView>
  );
}
