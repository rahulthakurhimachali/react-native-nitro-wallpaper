# react-native-nitro-wallpaper Example

A single-screen [Expo](https://expo.dev) (SDK 57) app showing how to use [`react-native-nitro-wallpaper`](../README.md). Set a wallpaper from a URL or a gallery image on the home screen, lock screen, or both.

The library works the same in bare React Native apps. See the [root README](../README.md#installation) for setup.

> **Note:** This library is Android-only and uses native code, so it doesn't run in Expo Go. The example uses a development build.

## Prerequisites

- Node.js >= 20
- Android Studio with an Android SDK and NDK
- An Android device or emulator

## Running

From the repository root:

```sh
yarn install
yarn example android
```

`expo run:android` generates the `android/` folder (with the library's config plugin applied), builds the app and installs it. After the first build, you can start just the dev server:

```sh
yarn example start
```

## How the library is wired up

`app.json` adds the config plugin, which adds the `SET_WALLPAPER` permission:

```json
{
  "expo": {
    "plugins": ["react-native-nitro-wallpaper"]
  }
}
```

Metro resolves the library from `../src`, so JS changes show up without rebuilding. Native changes in `../android` need `yarn example android` again.
