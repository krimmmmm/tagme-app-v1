import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Category = 'recommended' | 'crest' | 'frame' | 'symbol' | 'effect';

type ShopItem = {
  id: string;
  category: Category;
  title: string;
  rarity: string;
  price: number;
  icon?: string;
  image?: any;
  tag?: string;
};

const items: ShopItem[] = [
  {
    id: 'cat-neon-frame-epic-empty',
    category: 'frame',
    title: 'Cat Neon Frame',
    rarity: 'Epic Frame',
    price: 499,
    image: require('../../assets/frames/cat-neon-frame-epic-empty.png'),
    tag: 'NEW',
  },
  { id: 'dragon-crest', category: 'crest', title: 'Dragon Crest', rarity: 'Legendary', price: 299, icon: '🐉' },
  { id: 'sakura-frame', category: 'frame', title: 'Sakura Frame', rarity: 'Epic', price: 199, icon: '🌸' },
  { id: 'golden-crown', category: 'symbol', title: 'Golden Crown', rarity: 'Epic', price: 199, icon: '👑' },
  { id: 'angel-wing', category: 'effect', title: 'Angel Wing', rarity: 'Epic', price: 199, icon: '🪽' },
  { id: 'neon-ring', category: 'effect', title: 'Neon Ring', rarity: 'Rare', price: 149, icon: '🌀' },
  { id: 'ice-aura', category: 'effect', title: 'Ice Aura', rarity: 'Rare', price: 149, icon: '❄️' },
];

const categories: Array<{ key: Category; label: string }> = [
  { key: 'recommended', label: 'แนะนำ' },
  { key: 'crest', label: 'Crest' },
  { key: 'frame', label: 'Frame' },
  { key: 'symbol', label: 'Symbol' },
  { key: 'effect', label: 'Effect' },
];

export default function ShopScreen() {
  const [category, setCategory] = useState<Category>('recommended');
  const [coins, setCoins] = useState(12450);
  const [owned, setOwned] = useState<string[]>([]);

  const visibleItems =
    category === 'recommended'
      ? items
      : items.filter((item) => item.category === category);

  const buyItem = (item: ShopItem) => {
    if (owned.includes(item.id)) return;
    if (coins < item.price) return;
    setCoins((value) => value - item.price);
    setOwned((value) => [...value, item.id]);
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>ร้านค้า</Text>
            <Text style={styles.subtitle}>ซื้อ Crest, Frame, Symbol และ Effect สำหรับ TagMe</Text>
          </View>

          <View style={styles.coinPill}>
            <Text style={styles.coinIcon}>🪙</Text>
            <Text style={styles.coinText}>{coins.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          {categories.map((item) => {
            const active = item.key === category;
            return (
              <Pressable
                key={item.key}
                onPress={() => setCategory(item.key)}
                style={[styles.tab, active && styles.tabActive]}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {category === 'frame' ? (
          <View style={styles.featureBox}>
            <Text style={styles.featureTitle}>Frame Marketplace</Text>
            <Text style={styles.featureText}>
              เลือกกรอบข้อความ AR สำหรับใช้ลอยเหนือศีรษะในหน้า AR Camera
            </Text>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>{category === 'frame' ? 'กรอบข้อความ' : 'สินค้าขายดี'}</Text>

        <View style={styles.grid}>
          {visibleItems.map((item) => {
            const isOwned = owned.includes(item.id);
            return (
              <Pressable key={item.id} style={styles.card} onPress={() => buyItem(item)}>
                <View style={styles.previewBox}>
                  {item.image ? (
                    <Image source={item.image} style={styles.framePreview} resizeMode="contain" />
                  ) : (
                    <Text style={styles.iconPreview}>{item.icon}</Text>
                  )}

                  {item.tag ? (
                    <View style={styles.newTag}>
                      <Text style={styles.newTagText}>{item.tag}</Text>
                    </View>
                  ) : null}
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.rarity}>{item.rarity}</Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.price}>🪙 {item.price}</Text>
                    <View style={[styles.buyPill, isOwned && styles.ownedPill]}>
                      <Text style={[styles.buyText, isOwned && styles.ownedText]}>
                        {isOwned ? 'มีแล้ว' : 'ซื้อ'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814' },
  content: { padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, marginBottom: 18 },
  title: { color: '#fff', fontSize: 34, fontWeight: '900' },
  subtitle: { color: '#B9BDF5', fontSize: 15, fontWeight: '700', marginTop: 8 },
  coinPill: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: 'rgba(245,158,11,0.18)' },
  coinIcon: { fontSize: 16 },
  coinText: { color: '#FDE68A', fontSize: 16, fontWeight: '900' },
  tabs: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 22 },
  tab: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.07)' },
  tabActive: { backgroundColor: '#3345FF' },
  tabText: { color: '#A8ACCF', fontWeight: '900' },
  tabTextActive: { color: '#fff' },
  featureBox: { borderRadius: 24, padding: 18, marginBottom: 18, backgroundColor: 'rgba(139,92,246,0.12)', borderWidth: 1, borderColor: 'rgba(102,233,255,0.20)' },
  featureTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  featureText: { color: '#B9BDF5', marginTop: 8, fontWeight: '700', lineHeight: 20 },
  sectionTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { flexBasis: '31%', minWidth: 260, flexGrow: 1, borderRadius: 24, padding: 14, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  previewBox: { height: 126, borderRadius: 18, backgroundColor: '#070814', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' },
  framePreview: { width: '112%', height: '112%' },
  iconPreview: { fontSize: 42 },
  newTag: { position: 'absolute', top: 10, right: 10, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 999, backgroundColor: 'rgba(236,72,153,0.9)' },
  newTagText: { color: '#fff', fontSize: 11, fontWeight: '900' },
  cardBody: { marginTop: 14 },
  itemTitle: { color: '#fff', fontSize: 16, fontWeight: '900' },
  rarity: { color: '#C084FC', fontSize: 14, fontWeight: '900', marginTop: 6 },
  priceRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { color: '#FDE68A', fontSize: 15, fontWeight: '900' },
  buyPill: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, backgroundColor: '#5B4BFF' },
  ownedPill: { backgroundColor: 'rgba(34,197,94,0.18)', borderWidth: 1, borderColor: '#22C55E' },
  buyText: { color: '#fff', fontWeight: '900' },
  ownedText: { color: '#86EFAC' },
});
