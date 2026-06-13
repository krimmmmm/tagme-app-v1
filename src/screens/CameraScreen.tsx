import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TagBadge from '../components/TagBadge';

export default function CameraScreen() {
  return (
    <View style={styles.root}>
      <LinearGradient colors={["#1C1D2F", "#22243F", "#0E1023"]} style={styles.cameraMock}>
        <View style={styles.topBar}>
          <Pressable style={styles.pillActive}><Text style={styles.pillText}>AR</Text></Pressable>
          <Pressable style={styles.pill}><Text style={styles.pillDim}>Radar</Text></Pressable>
        </View>
        <View style={styles.sceneLine}><View style={styles.personTall}/><View style={styles.person}/><View style={styles.personTall}/></View>
        <View style={[styles.floating, { top: 120, left: 24 }]}><TagBadge icon="🎌" title="Anime Club" color="#9C27B0" /></View>
        <View style={[styles.floating, { top: 195, left: 120 }]}><TagBadge icon="☕" title="Coffee Lover" color="#F59E0B" /></View>
        <View style={[styles.floating, { top: 145, right: 24 }]}><TagBadge icon="🎮" title="Gamer" subtitle="Looking for Team" color="#22C55E" /></View>
        <View style={styles.distance}><Text style={styles.distanceText}>5m</Text></View>
        <View style={styles.sideActions}>
          <Round label="Record" icon="videocam" />
          <Round label="Live" icon="radio" />
          <Round label="Shop" icon="storefront" />
        </View>
        <View style={styles.bottomCapture}>
          <Pressable style={styles.smallBtn}><Ionicons name="camera" size={22} color="#fff" /></Pressable>
          <Pressable style={styles.recordBtn}><Ionicons name="ellipse" size={48} color="#FF4D67" /></Pressable>
          <Pressable style={styles.smallBtn}><Ionicons name="sparkles" size={22} color="#fff" /></Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}
function Round({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) { return <Pressable style={styles.round}><Ionicons name={icon} size={22} color="#fff"/><Text style={styles.roundText}>{label}</Text></Pressable>; }
const styles = StyleSheet.create({
  root:{ flex:1, padding:14 },
  cameraMock:{ flex:1, borderRadius:30, overflow:'hidden', borderWidth:1, borderColor:'rgba(255,255,255,0.1)' },
  topBar:{ position:'absolute', zIndex:3, top:18, alignSelf:'center', flexDirection:'row', backgroundColor:'rgba(0,0,0,0.28)', borderRadius:22, padding:4 },
  pillActive:{ backgroundColor:'#4057FF', paddingVertical:9, paddingHorizontal:28, borderRadius:18 },
  pill:{ paddingVertical:9, paddingHorizontal:24 }, pillText:{ color:'#fff', fontWeight:'800'}, pillDim:{ color:'#A8ACCF', fontWeight:'700'},
  sceneLine:{ position:'absolute', bottom:170, width:'100%', flexDirection:'row', justifyContent:'space-around', alignItems:'flex-end'},
  personTall:{ width:72, height:260, borderRadius:36, backgroundColor:'rgba(255,255,255,0.18)'}, person:{ width:62, height:220, borderRadius:31, backgroundColor:'rgba(255,255,255,0.22)'},
  floating:{ position:'absolute', zIndex:4 }, distance:{ position:'absolute', top:330, alignSelf:'center', backgroundColor:'#43BE7A', padding:8, borderRadius:20 }, distanceText:{color:'#fff', fontWeight:'900'},
  sideActions:{ position:'absolute', right:14, bottom:190, gap:14 }, round:{ width:62, height:62, borderRadius:31, backgroundColor:'rgba(0,0,0,0.45)', alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'rgba(255,255,255,0.14)'}, roundText:{ color:'#fff', fontSize:10, marginTop:2 },
  bottomCapture:{ position:'absolute', bottom:24, width:'100%', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:26 }, smallBtn:{ width:54, height:54, borderRadius:27, backgroundColor:'rgba(255,255,255,0.12)', alignItems:'center', justifyContent:'center'}, recordBtn:{ width:76, height:76, borderRadius:38, borderWidth:4, borderColor:'#fff', alignItems:'center', justifyContent:'center'}
});
