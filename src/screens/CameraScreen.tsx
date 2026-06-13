import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import TagBadge from '../components/TagBadge';

export default function CameraScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.topBar}><Text style={styles.mode}>AR</Text><Text style={styles.radar}>Radar</Text></View>
      <View style={styles.cameraMock}>
        <Text style={styles.hint}>AR CAMERA PREVIEW</Text>
        <View style={styles.personRow}>
          <TagBadge icon="🎌" title="Anime Club" subtitle="8m" color="#A855F7" />
          <TagBadge icon="☕" title="Coffee Lover" subtitle="5m" color="#F59E0B" />
          <TagBadge icon="🎮" title="Gamer" subtitle="Looking for Team" color="#22C55E" />
        </View>
        <View style={styles.actionStack}>
          <Round icon="⭐" label="ไอเท็ม" />
          <Round icon="👥" label="กลุ่ม" />
          <Round icon="🛒" label="ร้านค้า" />
        </View>
        <View style={styles.recordBar}>
          <Pressable style={styles.smallBtn}><Text style={styles.btnText}>📸</Text></Pressable>
          <Pressable style={styles.recordBtn}><Text style={styles.recordText}>●</Text></Pressable>
          <Pressable style={styles.smallBtn}><Text style={styles.btnText}>✨</Text></Pressable>
        </View>
      </View>
    </View>
  );
}
function Round({ icon, label }: { icon: string; label: string }) { return <Pressable style={styles.round}><Text style={styles.roundIcon}>{icon}</Text><Text style={styles.roundText}>{label}</Text></Pressable>; }
const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:'#070814',padding:16},
  topBar:{height:56,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:12},
  mode:{color:'#fff',fontWeight:'900',backgroundColor:'#4F46E5',paddingHorizontal:28,paddingVertical:10,borderRadius:20},
  radar:{color:'#8B8EA6',fontWeight:'800',backgroundColor:'rgba(255,255,255,.06)',paddingHorizontal:22,paddingVertical:10,borderRadius:20},
  cameraMock:{flex:1,borderRadius:28,overflow:'hidden',backgroundColor:'#15172A',borderWidth:1,borderColor:'rgba(255,255,255,.12)',padding:18,justifyContent:'space-between'},
  hint:{color:'#626780',alignSelf:'center',marginTop:40,fontWeight:'900',letterSpacing:1},
  personRow:{gap:14,marginTop:50},
  actionStack:{position:'absolute',right:14,top:160,gap:12},
  round:{width:66,height:66,borderRadius:33,backgroundColor:'rgba(0,0,0,.45)',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'rgba(255,255,255,.16)'},
  roundIcon:{fontSize:22}, roundText:{color:'#fff',fontSize:11,fontWeight:'700'},
  recordBar:{height:86,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:34},
  smallBtn:{width:54,height:54,borderRadius:27,backgroundColor:'rgba(255,255,255,.12)',alignItems:'center',justifyContent:'center'},
  btnText:{fontSize:24},
  recordBtn:{width:74,height:74,borderRadius:37,backgroundColor:'rgba(255,77,103,.12)',alignItems:'center',justifyContent:'center',borderWidth:4,borderColor:'#fff'},
  recordText:{color:'#FF4D67',fontSize:48,lineHeight:52}
});
