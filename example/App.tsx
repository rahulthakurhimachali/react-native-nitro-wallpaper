import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { WallpaperSet } from 'react-native-nitro-wallpaper';

type Location = 'home' | 'lock' | 'both';

const LOCATIONS: Location[] = ['home', 'lock', 'both'];
const SAMPLE_URL = 'https://picsum.photos/1080/1920';

export default function App() {
  const [image, setImage] = useState(SAMPLE_URL);
  const [location, setLocation] = useState<Location>('both');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]!.uri);
    }
  };

  const setWallpaper = async () => {
    if (!image.trim()) {
      Alert.alert('Error', 'Enter an image URL or pick an image');
      return;
    }

    setLoading(true);
    try {
      await WallpaperSet.setWallpaper(image.trim(), location);
      Alert.alert('Success', `Wallpaper set on ${location} screen`);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Nitro Wallpaper</Text>

      {image ? <Image source={{ uri: image }} style={styles.preview} /> : null}

      <Text style={styles.label}>Image URL or file URI</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="https://… or file://…"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Pressable style={styles.secondaryButton} onPress={pickImage}>
        <Text style={styles.secondaryButtonText}>Pick from gallery</Text>
      </Pressable>

      <Text style={styles.label}>Location</Text>
      <View style={styles.segment}>
        {LOCATIONS.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.segmentItem,
              location === item && styles.segmentItemActive,
            ]}
            onPress={() => setLocation(item)}
          >
            <Text
              style={[
                styles.segmentText,
                location === item && styles.segmentTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={setWallpaper}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Set wallpaper</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 64,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: 360,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '600',
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 4,
    marginBottom: 24,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: '#fff',
  },
  segmentText: {
    fontSize: 15,
    color: '#666',
    textTransform: 'capitalize',
  },
  segmentTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
