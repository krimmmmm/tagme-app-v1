import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TagBadge({ icon, title, color }: { icon: string; title: string; color: string }) {
  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: '#080A1B',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#A855F7',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  icon: { fontSize: 22 },
  title: { color: '#fff', fontSize: 16, fontWeight: '900' },
});
