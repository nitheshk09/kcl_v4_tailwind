import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

type CarouselItem = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
};

type HeroCarouselProps = {
  items: CarouselItem[];
};

export function HeroCarousel({ items }: HeroCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 16 }}
      snapToAlignment="center"
      decelerationRate="fast"
    >
      {items.map((item) => (
        <Pressable key={item.id} className="mr-4 w-72 rounded-3xl app-primary-btn p-6">
          {item.badge ? (
            <View className="mb-3 self-start rounded-full bg-black/20 px-3 py-1 dark:bg-white/10">
              <Text className="text-xs font-semibold uppercase tracking-wider text-white">
                {item.badge}
              </Text>
            </View>
          ) : null}
          <Text className="mb-2 text-2xl font-bold text-white">{item.title}</Text>
          <Text className="text-sm text-white opacity-80">{item.subtitle}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
