import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TagBadge from '../components/TagBadge';
import ScreenTitle from '../components/ScreenTitle';

export default function FeedScreen(){return <View style={styles.root}><ScreenTitle title="Feed" subtitle="คลิปและ Live ที่มี AR Tag"/><LinearGradient colors={["#171832", "#0B0C1B"]} style={styles.video}><TagBadge icon="💼" title="Project Manager" subtitle="Open to Chat" color="#2563EB"/><Text style={styles.center}>VIDEO / LIVE PREVIEW</Text><View style={styles.actions}><Ionicons name="heart" size={26} color="#FF4DE8"/><Ionicons name="chatbubble" size={26} color="#fff"/><Ionicons name="share-social" size={26} color="#fff"/></View></LinearGradient><Pressable style={styles.liveBtn}><Text style={styles.liveText}>🔴 Start Live</Text></Pressable></View>}
const styles=StyleSheet.create({root:{flex:1},video:{margin:20,borderRadius:28,flex:1,padding:18,justifyContent:'space-between',borderWidth:1,borderColor:'rgba(255,255,255,0.1)'},center:{color:'#565B84',fontSize:22,fontWeight:'900',textAlign:'center'},actions:{alignSelf:'flex-end',gap:18},liveBtn:{marginHorizontal:20,marginBottom:16,height:54,borderRadius:16,backgroundColor:'#D51F4C',alignItems:'center',justifyContent:'center'},liveText:{color:'#fff',fontWeight:'900',fontSize:16}})
