import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { LanguageKey, t } from '../i18n/translations';

export default function FeedScreen({ language }: { language: LanguageKey }) {
  const text = t[language];

  const chats = [
    { avatar: '😎', name: '🎌 Anime Club', msg: 'Beam: เจอกันที่งานนะครับ! 🔥', time: '14:30', badge: '12' },
    { avatar: '👩🏻', name: '☕ Coffee Lovers', msg: 'Mint: ใครว่างไปกาแฟบ้าง? 😊', time: '13:45', badge: '5' },
    { avatar: '🎮', name: '🎮 Gamer Thailand', msg: 'Ton: พร้อมลุยคืนนี้ 3 ทุ่ม! 🎮', time: '12:20', badge: '3' },
    { avatar: '👧🏻', name: 'Praew', msg: 'คุณ: ได้เลยครับ 👍', time: '11:15', badge: '' },
    { avatar: '📸', name: '📸 Group: Photo Journey', msg: 'Kook: รูปสวยมากครับ!', time: '10:05', badge: '' },
  ];

  return (
    <View style={styles.root}>
      <ScreenTitle title={text.chatTitle} subtitle={text.chatSubtitle} />

      <View style={styles.search}><Text style={styles.searchText}>⌕ {text.search}</Text></View>

      <ScrollView contentContainerStyle={styles.list}>
        {chats.map((chat) => (
          <View key={chat.name} style={styles.chatItem}>
            <Text style={styles.avatar}>{chat.avatar}</Text>
            <View style={styles.chatInfo}>
              <Text style={styles.name}>{chat.name}</Text>
              <Text style={styles.msg}>{chat.msg}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.time}>{chat.time}</Text>
              {chat.badge ? <Text style={styles.badge}>{chat.badge}</Text> : null}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814' },
  search: { marginHorizontal: 20, height: 48, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.07)', justifyContent: 'center', paddingHorizontal: 16 },
  searchText: { color: '#8B8EA6', fontWeight: '800' },
  list: { padding: 20, gap: 10 },
  chatItem: { minHeight: 74, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#12142B', textAlign: 'center', paddingTop: 9, fontSize: 24, overflow: 'hidden' },
  chatInfo: { flex: 1 },
  name: { color: '#fff', fontWeight: '900' },
  msg: { color: '#A8ACCF', marginTop: 4 },
  right: { alignItems: 'flex-end' },
  time: { color: '#8B8EA6', fontSize: 12 },
  badge: { marginTop: 8, backgroundColor: '#5B4BFF', color: '#fff', minWidth: 24, textAlign: 'center', borderRadius: 12, overflow: 'hidden', fontWeight: '900' },
});
