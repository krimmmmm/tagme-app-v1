import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import TagBadge from '../components/TagBadge';
import ScreenTitle from '../components/ScreenTitle';

export default function ProfileScreen() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const fileInputRef = useRef<any>(null);

  const openImagePicker = () => {
    if (Platform.OS === 'web') {
      fileInputRef.current?.click();
    }
  };

  const onWebImageSelected = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatarUri(imageUrl);
  };

  return (
    <View style={styles.root}>
      <ScreenTitle title="Profile" subtitle="ตั้งค่าตัวตนที่จะแสดงในโลกจริง" />

      {Platform.OS === 'web' ? (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onWebImageSelected}
          style={{ display: 'none' }}
        />
      ) : null}

      <View style={styles.card}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarEmoji}>😎</Text>
            )}
          </View>

          <Pressable style={styles.uploadBtn} onPress={openImagePicker}>
            <Text style={styles.uploadText}>
              {avatarUri ? 'เปลี่ยนรูปโปรไฟล์' : 'Upload รูปโปรไฟล์'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.name}>Beam</Text>
        <Text style={styles.handle}>@beamm.me</Text>

        <View style={styles.badgeList}>
          <TagBadge icon="💼" title="Project Manager" color="#2563EB" />
          <TagBadge icon="☕" title="Coffee Lover" color="#F59E0B" />
          <TagBadge icon="♌" title="Solar Leo" color="#F97316" />
        </View>

        <Pressable style={styles.save}>
          <Text style={styles.saveText}>บันทึก Status</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  card: {
    margin: 20,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#12142B',
  },

  avatarWrap: {
    alignItems: 'flex-start',
  },

  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(102,233,255,0.7)',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  avatarEmoji: {
    fontSize: 42,
  },

  uploadBtn: {
    marginTop: 12,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: 'rgba(139,92,246,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(192,132,252,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  uploadText: {
    color: '#E9D5FF',
    fontSize: 13,
    fontWeight: '800',
  },

  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 14,
  },

  handle: {
    color: '#A8ACCF',
    fontSize: 14,
  },

  badgeList: {
    gap: 12,
    marginTop: 18,
  },

  save: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#5B4BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  saveText: {
    color: '#fff',
    fontWeight: '900',
  },
});
