import React from 'react';
import { Pressable, Text, View } from 'react-native';

type ContentCardProps = {
  title: string;
  subtitle?: string;
  badge?: string;
};

export function ContentCard({ title, subtitle, badge }: ContentCardProps) {
  return (
    <Pressable className="mr-4 w-52 rounded-2xl bg-black/10 p-4 dark:bg-white/10">
      {badge ? (
        <View className="mb-2 self-start rounded-full bg-black/20 px-3 py-1 dark:bg-white/10">
          <Text className="text-xs font-semibold uppercase tracking-wider text-white">{badge}</Text>
        </View>
      ) : null}
      <Text className="mb-1 text-lg font-semibold app-header-text">{title}</Text>
      {subtitle ? <Text className="text-sm app-header-text opacity-70">{subtitle}</Text> : null}
    </Pressable>
  );
}
