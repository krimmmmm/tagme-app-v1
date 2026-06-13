import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TagBadge({ icon, title, subtitle, verified, color = '#8B5CF6' }: { icon: string; title: string; subtitle?: string; verified?: boolean; color?: string }) {
  return (
    <LinearGradient colors={[color, '#EC4DFF']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.wrap}>
      <View style={styles.inner}>
        <Text style={styles.icon}>{icon}</Text>
        <View>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {verified && <Text style={styles.verified}>✓</Text>}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 18, padding: 1.4, shadowColor: '#D946EF', shadowOpacity: 0.8, shadowRadius: 10 },
  inner: { flexDirection: 'row', gap: 9, alignItems: 'center', backgroundColor: 'rgba(10,11,28,0.78)', borderRadius: 17, paddingVertical: 9, paddingHorizontal: 12 },
  icon: { fontSize: 19 },
  title: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  subtitle: { color: '#D7D9FF', fontSize: 11, marginTop: 2 },
  verified: { color: '#7CFFB2', fontWeight: '900', marginLeft: 5 },
});
