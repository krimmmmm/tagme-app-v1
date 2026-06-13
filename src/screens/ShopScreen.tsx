import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import { LanguageKey, t } from '../i18n/translations';

export default function ShopScreen({ language }: { language: LanguageKey }) {
  const text = t[language];

  const products = [
    { icon: '🐉', name: 'Dragon Crest', rarity: 'Legendary', price: '299', color: '#F97316' },
    { icon: '🌸', name: 'Sakura Frame', rarity: 'Epic', price: '199', color: '#EC4899' },
    { icon: '👑', name: 'Golden Crown', rarity: 'Epic', price: '199', color: '#FBBF24' },
    { icon: '🪽', name: 'Angel Wing', rarity: 'Rare', price: '99', color: '#F9A8D4' },
    { icon: '🌀', name: 'Neon Ring', rarity: 'Epic', price: '149', color: '#A855F7' },
    { icon: '❄️', name: 'Ice Aura', rarity: 'Rare', price: '99', color: '#38BDF8' },
  ];

  return (
    <View style={styles.root}>
      <ScreenTitle title={text.shopTitle} subtitle={text.shopSubtitle} />

      <View style={styles.coinBox}><Text style={styles.coinText}>🪙 12,450</Text></View>

      <View style={styles.categories}>
        {[text.recommended, 'Crest', 'Frame', 'Symbol', 'Effect'].map((item, index) => (
          <Text key={item} style={[styles.category, index === 0 && styles.categoryActive]}>{item}</Text>
        ))}
      </View>

      <Text style={styles.saleTitle}>{text.saleItems}</Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {products.map((item) => (
          <View key={item.name} style={styles.card}>
            <Text style={[styles.productIcon, { color: item.color }]}>{item.icon}</Text>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.rarity}>{item.rarity}</Text>
            <Text style={styles.price}>🪙 {item.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814' },
  coinBox: { position: 'absolute', right: 20, top: 30, borderRadius: 999, backgroundColor: 'rgba(245,158,11,0.14)', paddingHorizontal: 14, paddingVertical: 8 },
  coinText: { color: '#FDE68A', fontWeight: '900' },
  categories: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 4 },
  category: { color: '#8B8EA6', backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, overflow: 'hidden', fontWeight: '800' },
  categoryActive: { backgroundColor: '#2536C9', color: '#fff' },
  saleTitle: { color: '#fff', fontWeight: '900', fontSize: 18, marginTop: 18, marginHorizontal: 20 },
  grid: { padding: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  card: { width: '30%', minWidth: 130, flexGrow: 1, borderRadius: 22, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 14 },
  productIcon: { height: 94, borderRadius: 16, backgroundColor: '#090A18', textAlign: 'center', paddingTop: 22, fontSize: 46, overflow: 'hidden' },
  productName: { color: '#fff', fontWeight: '900', marginTop: 12 },
  rarity: { color: '#C084FC', marginTop: 4, fontWeight: '700' },
  price: { color: '#FDE68A', marginTop: 8, fontWeight: '900' },
});
