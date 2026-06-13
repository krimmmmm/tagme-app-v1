import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import TagBadge from '../components/TagBadge';
const data=[['🎌','Anime Club','12,345 members','#8B5CF6'],['🎮','Gamer Thailand','8,765 members','#22C55E'],['☕','Coffee Lovers','4,321 members','#F59E0B'],['💼','PM Thailand','2,100 members','#2563EB']];
export default function GroupsScreen(){return <View style={styles.root}><ScreenTitle title="Groups" subtitle="เลือกโชว์ Status ส่วนตัวหรือสัญลักษณ์กลุ่ม"/><FlatList data={data} keyExtractor={(i)=>i[1]} contentContainerStyle={{padding:20,gap:14}} renderItem={({item})=><TagBadge icon={item[0]} title={item[1]} subtitle={item[2]} color={item[3]}/>} /></View>}
const styles=StyleSheet.create({root:{flex:1}})
