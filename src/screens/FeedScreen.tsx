import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ScreenTitle from '../components/ScreenTitle';
import TagBadge from '../components/TagBadge';

export default function FeedScreen(){return <View style={styles.root}><ScreenTitle title="Feed" subtitle="คลิปและ Live ที่มี AR Tag"/><View style={styles.video}><TagBadge icon="💼" title="Project Manager" subtitle="Open to Chat" color="#2563EB"/><Text style={styles.center}>VIDEO / LIVE PREVIEW</Text><View style={styles.actions}><Text style={styles.action}>💖</Text><Text style={styles.action}>💬</Text><Text style={styles.action}>↗️</Text></View></View><Pressable style={styles.liveBtn}><Text style={styles.liveText}>🔴 Start Live</Text></Pressable></View>}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#070814'},video:{flex:1,margin:16,borderRadius:26,backgroundColor:'#14162B',borderWidth:1,borderColor:'rgba(255,255,255,.12)',padding:16},center:{color:'#555B77',fontSize:20,fontWeight:'900',alignSelf:'center',marginTop:120},actions:{position:'absolute',right:18,bottom:34,gap:22},action:{fontSize:26},liveBtn:{margin:16,height:54,borderRadius:16,alignItems:'center',justifyContent:'center',backgroundColor:'#EF4444'},liveText:{color:'#fff',fontWeight:'900'}})
