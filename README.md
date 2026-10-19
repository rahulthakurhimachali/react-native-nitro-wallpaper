# react-native-nitro-wallpaper

Set wallpaper on React Native (Android only)

## Compatibility

| Setup | Supported |
| --- | --- |
| Bare React Native (Android) | ✅ |
| Expo with a development build (`expo prebuild` / `expo run:android` / EAS Build) | ✅ |
| Expo Go | ❌ (contains native code) |
| iOS | ❌ (throws an error) |

Native libraries are 16 KB page size aligned, as required by Google Play for apps targeting Android 15+.

## Installation

### Bare React Native

```sh
npm install react-native-nitro-wallpaper react-native-nitro-modules
```

> `react-native-nitro-modules` is required as this library relies on [Nitro Modules](https://nitro.margelo.com/).

No additional setup required. The library is autolinked and the `SET_WALLPAPER` permission is merged into your app's manifest automatically. Rebuild the app:

```sh
npx react-native run-android
```

### Expo

```sh
npx expo install react-native-nitro-wallpaper react-native-nitro-modules
```

Add the config plugin to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["react-native-nitro-wallpaper"]
  }
}
```

Then build a development build (this library doesn't work in Expo Go):

```sh
npx expo run:android
```

Or with EAS: `eas build --platform android`.

## Usage

```js
import { WallpaperSet } from 'react-native-nitro-wallpaper';

// Set wallpaper from URL (Sets both Home and Lock screens by default)
await WallpaperSet.setWallpaper('https://example.com/image.jpg');

// Set wallpaper from local file path
await WallpaperSet.setWallpaper('/storage/emulated/0/Pictures/wallpaper.jpg');

// Set wallpaper from file URI
await WallpaperSet.setWallpaper('file:///storage/emulated/0/Pictures/wallpaper.jpg');

// Set wallpaper from content URI
await WallpaperSet.setWallpaper('content://media/external/images/media/123');

// Set specific screen
await WallpaperSet.setWallpaper('https://example.com/image.jpg', 'home'); // Home screen only
await WallpaperSet.setWallpaper('https://example.com/image.jpg', 'lock'); // Lock screen only
await WallpaperSet.setWallpaper('https://example.com/image.jpg', 'both'); // Both screens
```

### Example

```jsx
import React from 'react';
import { Button, Alert } from 'react-native';
import { WallpaperSet } from 'react-native-nitro-wallpaper';

function App() {
  const handleSetWallpaper = async () => {
    try {
      await WallpaperSet.setWallpaper('https://images.unsplash.com/photo-1506744038136-46273834b3fb');
      Alert.alert('Success', 'Wallpaper set successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return <Button title="Set Wallpaper" onPress={handleSetWallpaper} />;
}
```

A full Expo example app is in the [`example`](example) folder.


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
