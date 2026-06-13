import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { LanguageKey, t } from '../i18n/translations';

export default function GroupsScreen({ language }: { language: LanguageKey }) {
  const text = t[language];

  const groups = [
    { icon: '🎌', name: 'Anime Club', count: `12,345 ${text.memberCount}`, role: text.owner, color: '#C026D3' },
    { icon: '🎮', name: 'Gamer Thailand', count: `8,765 ${text.memberCount}`, role: text.admin, color: '#2563EB' },
    { icon: '☕', name: 'Coffee Lovers', count: `4,321 ${text.memberCount}`, role: text.member, color: '#F59E0B' },
    { icon: '📸', name: 'Photo Journey', count: `2,100 ${text.memberCount}`, role: text.member, color: '#EC4899' },
  ];

  return (
    <View style={styles.root}>
      <ScreenTitle title={text.createStatus} subtitle={text.createStatusSubtitle} />

      <View style={styles.tabRow}>
        <Text style={styles.tabActive}>{text.joined}</Text>
        <Text style={styles.tab}>{text.manage}</Text>
        <Text style={styles.tab}>{text.requests}</Text>
      </View>

      <View style={styles.list}>
        {groups.map((item) => (
          <Pressable key={item.name} style={styles.groupItem}>
            <Text style={[styles.groupIcon, { borderColor: item.color }]}>{item.icon}</Text>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupCount}>{item.count}</Text>
            </View>
            <Text style={styles.role}>{item.role}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814' },
  tabRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 38, marginTop: 4 },
  tabActive: { color: '#FFFFFF', fontWeight: '900', borderBottomWidth: 2, borderBottomColor: '#A855F7', paddingBottom: 8 },
  tab: { color: '#8B8EA6', fontWeight: '800' },
  list: { margin: 20, gap: 14 },
  groupItem: { minHeight: 82, borderRadius: 22, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', flexDirection: 'row', alignItems: 'center', padding: 14, gap: 14 },
  groupIcon: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, textAlign: 'center', paddingTop: 11, fontSize: 28, backgroundColor: '#090A18', overflow: 'hidden' },
  groupInfo: { flex: 1 },
  groupName: { color: '#fff', fontWeight: '900', fontSize: 17 },
  groupCount: { color: '#A8ACCF', marginTop: 4 },
  role: { color: '#8B8EA6', fontWeight: '800', fontSize: 12 },
});
