import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const people = [
  { tag: '☕ Coffee Lover', left: '38%', top: '31%', color: '#D97706', distance: '5m' },
  { tag: '🎌 Anime Club', left: '10%', top: '24%', color: '#A855F7', distance: '8m' },
  { tag: '🎮 Gamer\\nLooking for Team', left: '60%', top: '25%', color: '#16A34A', distance: '7m' },
];

const radarItems = [
  { name: '🎌 Anime Club', detail: '12 คน', distance: '8m' },
  { name: '☕ Coffee Lovers', detail: '7 คน', distance: '10m' },
  { name: '🎮 Gamer Thailand', detail: '15 คน', distance: '12m' },
  { name: '🏍 BigBike Club', detail: '4 คน', distance: '15m' },
];

export default function CameraScreen() {
  const [mode, setMode] = useState<'ar' | 'radar'>('ar');

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.profileIcon}>👤</Text>
        <View style={styles.segment}>
          <Pressable onPress={() => setMode('ar')} style={[styles.segmentBtn, mode === 'ar' && styles.segmentActive]}>
            <Text style={[styles.segmentText, mode === 'ar' && styles.segmentTextActive]}>AR</Text>
          </Pressable>
          <Pressable onPress={() => setMode('radar')} style={[styles.segmentBtn, mode === 'radar' && styles.segmentActive]}>
            <Text style={[styles.segmentText, mode === 'radar' && styles.segmentTextActive]}>Radar</Text>
          </Pressable>
        </View>
        <Text style={styles.search}>⌕</Text>
      </View>

      {mode === 'ar' ? (
        <View style={styles.cameraArea}>
          <View style={styles.arHeader}>
            <Text style={styles.nearby}>☘ 5 คนใกล้คุณ</Text>
            <Text style={styles.filter}>⏷ ทั้งหมด</Text>
          </View>

          <View style={styles.street}>
            <Text style={styles.personLeft}>🚶‍♂️</Text>
            <Text style={styles.personMid}>🚶‍♀️</Text>
            <Text style={styles.personRight}>🚶‍♂️</Text>

            {people.map((item, index) => (
              <View key={index} style={[styles.floatTag, { left: item.left as any, top: item.top as any, borderColor: item.color }]}>
                <Text style={styles.floatText}>{item.tag}</Text>
              </View>
            ))}

            <Text style={[styles.bubble, { left: '16%', bottom: 36 }]}>8m</Text>
            <Text style={[styles.bubble, { left: '48%', bottom: 82, backgroundColor: '#15803D' }]}>5m</Text>
            <Text style={[styles.bubble, { right: '18%', bottom: 70, backgroundColor: '#5B4BFF' }]}>5m</Text>
          </View>

          <View style={styles.sideButtons}>
            <Text style={styles.sideBtn}>⭐\\nไอเท็ม</Text>
            <Text style={styles.sideBtn}>👥\\nกลุ่ม</Text>
            <Text style={styles.sideBtn}>🛒\\nร้านค้า</Text>
          </View>
        </View>
      ) : (
        <View style={styles.radarPage}>
          <Text style={styles.radarTitle}>กลุ่มและคนรอบตัวคุณ</Text>
          <View style={styles.radarCircle}>
            <View style={styles.ring1} />
            <View style={styles.ring2} />
            <View style={styles.ring3} />
            <Text style={[styles.avatarDot, { left: '46%', top: '18%' }]}>😎</Text>
            <Text style={[styles.avatarDot, { left: '30%', top: '35%' }]}>👨</Text>
            <Text style={[styles.avatarDot, { left: '60%', top: '38%' }]}>👩</Text>
            <Text style={[styles.avatarDot, { left: '42%', top: '62%' }]}>👱</Text>
            <Text style={[styles.smallBadge, { left: '20%', top: '56%' }]}>🎌</Text>
            <Text style={[styles.smallBadge, { left: '70%', top: '28%' }]}>☕</Text>
          </View>

          <View style={styles.radarList}>
            {radarItems.map((item) => (
              <View key={item.name} style={styles.radarItem}>
                <View>
                  <Text style={styles.radarName}>{item.name}</Text>
                  <Text style={styles.radarDetail}>{item.detail}</Text>
                </View>
                <Text style={styles.radarDistance}>{item.distance}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814' },
  topBar: { height: 78, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  profileIcon: { fontSize: 24 },
  search: { color: '#fff', fontSize: 32 },
  segment: { flexDirection: 'row', borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.06)', padding: 4 },
  segmentBtn: { height: 36, minWidth: 78, alignItems: 'center', justifyContent: 'center', borderRadius: 18 },
  segmentActive: { backgroundColor: '#3345FF' },
  segmentText: { color: '#9EA2C5', fontWeight: '800' },
  segmentTextActive: { color: '#fff' },
  cameraArea: { flex: 1, position: 'relative' },
  arHeader: { position: 'absolute', zIndex: 5, left: 20, right: 20, top: 4, flexDirection: 'row', justifyContent: 'space-between' },
  nearby: { color: '#86EFAC', backgroundColor: 'rgba(21,128,61,0.28)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, fontWeight: '900' },
  filter: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, fontWeight: '900' },
  street: { flex: 1, margin: 16, borderRadius: 26, backgroundColor: '#1B1C2E', overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 80 },
  personLeft: { position: 'absolute', bottom: 48, left: '17%', fontSize: 105 },
  personMid: { position: 'absolute', bottom: 78, left: '43%', fontSize: 92 },
  personRight: { position: 'absolute', bottom: 48, right: '14%', fontSize: 105 },
  floatTag: { position: 'absolute', borderWidth: 1.2, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: 'rgba(20,20,40,0.82)' },
  floatText: { color: '#fff', fontWeight: '900', textAlign: 'center' },
  bubble: { position: 'absolute', color: '#fff', backgroundColor: '#6B7280', padding: 8, borderRadius: 999, fontWeight: '900' },
  sideButtons: { position: 'absolute', right: 18, bottom: 42, gap: 12 },
  sideBtn: { width: 58, height: 58, borderRadius: 29, color: '#fff', textAlign: 'center', paddingTop: 7, backgroundColor: 'rgba(255,255,255,0.16)', overflow: 'hidden', fontSize: 12, fontWeight: '900' },
  radarPage: { flex: 1, padding: 20 },
  radarTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 16 },
  radarCircle: { height: 300, borderRadius: 150, borderWidth: 1, borderColor: 'rgba(102,233,255,0.35)', position: 'relative', alignItems: 'center', justifyContent: 'center' },
  ring1: { position: 'absolute', width: 230, height: 230, borderRadius: 115, borderWidth: 1, borderColor: 'rgba(102,233,255,0.25)' },
  ring2: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 1, borderColor: 'rgba(102,233,255,0.25)' },
  ring3: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(14,165,233,0.18)' },
  avatarDot: { position: 'absolute', width: 42, height: 42, borderRadius: 21, textAlign: 'center', paddingTop: 6, backgroundColor: 'rgba(255,255,255,0.18)', overflow: 'hidden', fontSize: 22 },
  smallBadge: { position: 'absolute', fontSize: 22, backgroundColor: 'rgba(139,92,246,0.4)', padding: 8, borderRadius: 20, overflow: 'hidden' },
  radarList: { marginTop: 20, gap: 10 },
  radarItem: { minHeight: 66, borderRadius: 18, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  radarName: { color: '#fff', fontWeight: '900', fontSize: 16 },
  radarDetail: { color: '#A8ACCF', marginTop: 4 },
  radarDistance: { color: '#66E9FF', fontWeight: '900' },
});
