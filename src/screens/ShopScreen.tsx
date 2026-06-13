import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenTitle from '../components/ScreenTitle';
const items=[['🐉','Dragon Crest','Legendary','299'],['🌸','Sakura Frame','Epic','199'],['♌','Solar Leo','Epic','199'],['🛵','Rider Badge','Rare','99'],['⚡','Neon Aura','Rare','99'],['👑','Golden Title','Legendary','299']];
export default function ShopScreen(){return <View style={styles.root}><ScreenTitle title="Marketplace" subtitle="Frame, Symbol, Zodiac, Aura"/><FlatList data={items} numColumns={2} keyExtractor={(i)=>i[1]} contentContainerStyle={{padding:16}} columnWrapperStyle={{gap:12}} renderItem={({item})=><LinearGradient colors={["#191B3A","#101124"]} style={styles.card}><Text style={styles.icon}>{item[0]}</Text><Text style={styles.name}>{item[1]}</Text><Text style={styles.tier}>{item[2]}</Text><Text style={styles.price}>🪙 {item[3]}</Text></LinearGradient>} /></View>}
const styles=StyleSheet.create({root:{flex:1},card:{flex:1,minHeight:150,borderRadius:22,marginBottom:12,padding:16,borderWidth:1,borderColor:'rgba(255,255,255,0.1)'},icon:{fontSize:42},name:{color:'#fff',fontSize:16,fontWeight:'900',marginTop:10},tier:{color:'#A78BFA',fontWeight:'700',marginTop:4},price:{color:'#FFD166',fontWeight:'900',marginTop:12}})
