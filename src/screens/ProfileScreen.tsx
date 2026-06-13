import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import TagBadge from '../components/TagBadge';
import ScreenTitle from '../components/ScreenTitle';
import { LanguageKey, t } from '../i18n/translations';

export default function ProfileScreen({ language }: { language: LanguageKey }) {
  const text = t[language];
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const fileInputRef = useRef<any>(null);

  const openImagePicker = () => {
    if (Platform.OS === 'web') fileInputRef.current?.click();
  };

  const onWebImageSelected = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarUri(URL.createObjectURL(file));
  };

  return (
    <View style={styles.root}>
      <ScreenTitle title={text.profileTitle} subtitle={text.profileSubtitle} />

      {Platform.OS === 'web' ? (
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onWebImageSelected} style={{ display: 'none' }} />
      ) : null}

      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.avatar}>
            {avatarUri ? <Image source={{ uri: avatarUri }} style={styles.avatarImage} /> : <Text style={styles.avatarEmoji}>😎</Text>}
          </View>

          <View style={styles.profileText}>
            <Text style={styles.name}>Beam</Text>
            <Text style={styles.handle}>@beamm.me</Text>
            <View style={styles.chips}>
              <Text style={styles.chip}>🔮 Lv.25</Text>
              <Text style={styles.chipGold}>👑 Premium</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.uploadBtn} onPress={openImagePicker}>
          <Text style={styles.uploadText}>{avatarUri ? text.changeProfile : text.uploadProfile}</Text>
        </Pressable>

        <Text style={styles.bio}>Coffee Addict ☕ | Photographer 📸{'\n'}Travel | Working Remotely</Text>

        <View style={styles.stats}>
          <View><Text style={styles.statNo}>128</Text><Text style={styles.statLabel}>{text.friends}</Text></View>
          <View><Text style={styles.statNo}>23</Text><Text style={styles.statLabel}>{text.groups}</Text></View>
          <View><Text style={styles.statNo}>1.2K</Text><Text style={styles.statLabel}>{text.followers}</Text></View>
        </View>

        <Pressable style={styles.editBtn}><Text style={styles.editText}>{text.editProfile}</Text></Pressable>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>{text.usedSymbols}</Text>
          <Text style={styles.link}>{text.seeAll}</Text>
        </View>

        <View style={styles.symbolGrid}>
          {['☕', '📷', '✈️', '🦋'].map((item) => <Text key={item} style={styles.symbol}>{item}</Text>)}
        </View>

        <View style={styles.badgeList}>
          <TagBadge icon="💼" title="Project Manager" color="#2563EB" />
          <TagBadge icon="☕" title="Coffee Lover" color="#F59E0B" />
          <TagBadge icon="♌" title="Solar Leo" color="#F97316" />
        </View>

        <Pressable style={styles.save}>
          <Text style={styles.saveText}>{text.save}</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 },
  card: { margin: 20, borderRadius: 28, padding: 22, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: '#12142B' },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 2, borderColor: '#66E9FF' },
  avatarImage: { width: '100%', height: '100%' },
  avatarEmoji: { fontSize: 42 },
  profileText: { flex: 1 },
  name: { color: '#fff', fontSize: 26, fontWeight: '900' },
  handle: { color: '#A8ACCF', fontSize: 14, marginTop: 2 },
  chips: { flexDirection: 'row', gap: 8, marginTop: 10 },
  chip: { color: '#D8B4FE', backgroundColor: 'rgba(139,92,246,0.18)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, overflow: 'hidden', fontWeight: '800' },
  chipGold: { color: '#FDE68A', backgroundColor: 'rgba(245,158,11,0.14)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, overflow: 'hidden', fontWeight: '800' },
  uploadBtn: { marginTop: 16, height: 38, paddingHorizontal: 16, borderRadius: 999, backgroundColor: 'rgba(139,92,246,0.22)', borderWidth: 1, borderColor: 'rgba(192,132,252,0.55)', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  uploadText: { color: '#E9D5FF', fontSize: 13, fontWeight: '800' },
  bio: { color: '#E5E7FF', lineHeight: 24, marginTop: 16 },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 18, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  statNo: { color: '#fff', fontWeight: '900', fontSize: 18, textAlign: 'center' },
  statLabel: { color: '#A8ACCF', textAlign: 'center', marginTop: 4 },
  editBtn: { marginTop: 16, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center' },
  editText: { color: '#fff', fontWeight: '800' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, marginBottom: 12 },
  sectionTitle: { color: '#fff', fontWeight: '900', fontSize: 18 },
  link: { color: '#66E9FF', fontWeight: '800' },
  symbolGrid: { flexDirection: 'row', gap: 12 },
  symbol: { width: 58, height: 58, borderRadius: 16, backgroundColor: '#0B0D20', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)', textAlign: 'center', paddingTop: 14, fontSize: 24, overflow: 'hidden' },
  badgeList: { gap: 12, marginTop: 18 },
  save: { height: 54, borderRadius: 16, backgroundColor: '#5B4BFF', alignItems: 'center', justifyContent: 'center', marginTop: 22 },
  saveText: { color: '#fff', fontWeight: '900' },
});
