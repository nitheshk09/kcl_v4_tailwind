export const NAV_ROUTES = [
  { key: 'dashboard', labelKey: 'common.navigation.dashboard', icon: '📊' },
  { key: 'language', labelKey: 'common.navigation.language', icon: '🗣️' },
  { key: 'settings', labelKey: 'common.navigation.settings', icon: '⚙️' },
  { key: 'profile', labelKey: 'common.navigation.profile', icon: '👤' },
] as const;

export type RouteKey = typeof NAV_ROUTES[number]['key'];
