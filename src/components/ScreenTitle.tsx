import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScreenTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return <View style={styles.wrap}><Text style={styles.title}>{title}</Text>{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}</View>;
}
const styles = StyleSheet.create({ wrap:{ paddingHorizontal:20, paddingTop:14, paddingBottom:12 }, title:{ color:'#fff', fontSize:28, fontWeight:'900'}, subtitle:{ color:'#A8ACCF', fontSize:14, marginTop:4 }});
