# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React Native application with cross-platform support for iOS, Android, and Web. The project uses NativeWind (Tailwind CSS for React Native) for styling, TypeScript for type safety, and includes internationalization (i18n) support.

## Architecture

### Dual Project Structure
The project has a dual structure with two distinct apps:
- **Main React Native app** (root level): Traditional React Native setup with TypeScript, NativeWind styling
- **MyApp/** (Expo-based): Contains an Expo application with file-based routing

### Cross-Platform Navigation
The app implements platform-aware navigation through `src/navigation/RootNavigator.tsx`:
- Web platform uses `WebNavigator`
- Mobile platforms use `MobileNavigator`
- Automatic platform detection via `Platform.OS`

### Theming System
- Uses NativeWind's `useColorScheme` hook for theme management
- Custom theme context in `src/theme/ThemeContext.tsx`
- Supports light/dark/system themes with theme-aware Tailwind utilities
- Custom color palette defined in `tailwind.config.js` with gradients and theme-specific colors

### Styling Architecture
- **NativeWind 4.x**: Primary styling solution using Tailwind CSS
- **Cross-platform CSS**: 
  - `global.css` imported for iOS/Android
  - `nativewind.css` compiled output used for web
- **Custom Tailwind utilities**: Theme-aware gradients, spacing, and color utilities
- **Path aliasing**: `@/*` maps to `MyApp/*` directory

## Development Commands

### Mobile Development
```bash
# Start Metro bundler
npm start

# Build and run on Android
npm run android

# Build and run on iOS (requires CocoaPods setup)
bundle install          # First time only
bundle exec pod install # After native dependency changes
npm run ios
```

### Web Development
```bash
# Start web development server with auto-rebuilding CSS
npm run web

# One-time webpack dev server (without CSS watching)
npm run web:once
```

### Code Quality
```bash
# Lint code
npm lint

# Run tests
npm test

# Build Tailwind CSS manually
npm run tailwind:build
```

### iOS-Specific Setup
For iOS development, CocoaPods dependencies must be managed:
1. Run `bundle install` on first clone
2. Run `bundle exec pod install` after updating native dependencies
3. Use `npm run ios` to build and run

## Key Technologies

- **React Native 0.81.4** with TypeScript
- **NativeWind 4.2.1** for cross-platform styling
- **React Navigation** with platform-specific navigators  
- **i18next** for internationalization with TypeScript-safe resources
- **React Native Reanimated 4.x** for animations
- **Webpack 5** for web bundling with React Native Web

## Development Workflow

### CSS Development
The web development command (`npm run web`) includes automatic CSS rebuilding:
- Watches Tailwind config and CSS files
- Rebuilds CSS automatically on file changes
- Runs webpack dev server with hot reload

### Testing
- Jest configured for React Native testing
- Test files in `__tests__/` directory
- Single test execution: `npm test -- --testNamePattern="specific test"`

### Platform-Specific Code
Use platform extensions for platform-specific implementations:
- `.ios.tsx/.android.tsx` for native platforms
- `.web.tsx` for web platform
- Webpack configured to resolve platform extensions automatically

## File Structure Patterns

### Source Organization
- `src/components/`: Reusable UI components organized by feature
- `src/screens/`: Screen components for navigation
- `src/navigation/`: Platform-aware navigation setup
- `src/theme/`: Theme context and utilities
- `src/i18n/`: Internationalization setup and resources

### Cross-Platform Assets
- Web assets in `public/`
- Native assets follow React Native conventions
- Webpack configured for asset resolution

## Code Style

### ESLint & Prettier
- ESLint extends `@react-native` configuration
- Prettier configured with single quotes, no arrow parens, trailing commas
- Tailwind plugin for Prettier class sorting

### TypeScript Configuration
- Path aliases configured for cleaner imports (`@/*` → `MyApp/*`)
- React Native TypeScript preset
- Strict type checking enabled

## Platform Considerations

### Web Deployment
- Webpack configured for React Native Web compatibility
- Firebase modules disabled for web builds
- Custom polyfills for platform-specific APIs
- Output to `dist/` directory

### Native Builds
- Android: Standard React Native CLI workflow
- iOS: Requires Xcode and CocoaPods setup
- Metro bundler handles JavaScript bundling

This project structure supports efficient cross-platform development with shared business logic and platform-specific optimizations where needed.