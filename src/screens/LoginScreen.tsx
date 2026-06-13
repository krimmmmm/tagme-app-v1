import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}><View style={styles.logo}><Text style={styles.logoT}>T</Text></View></View>
      <Text style={styles.brand}>TagMe</Text>
      <Text style={styles.tagline}>TAG. CONNECT. BE SEEN.</Text>
      <Text style={styles.thai}>แสดงตัวตนของคุณในโลกจริง</Text>
      <View style={styles.card}>
        <Pressable style={styles.primaryBtn} onPress={onLogin}><Ionicons name="call" color="#fff" size={18}/><Text style={styles.primaryText}>เข้าสู่ระบบด้วยเบอร์โทรศัพท์</Text></Pressable>
        <Pressable style={styles.secondaryBtn} onPress={onLogin}><Ionicons name="logo-google" color="#fff" size={18}/><Text style={styles.secondaryText}>เข้าสู่ระบบด้วย Google</Text></Pressable>
        <Pressable style={styles.secondaryBtn} onPress={onLogin}><Ionicons name="mail" color="#fff" size={18}/><Text style={styles.secondaryText}>เข้าสู่ระบบด้วยอีเมล</Text></Pressable>
      </View>
      <Text style={styles.footer}>เริ่มต้นสร้าง AR Status ของคุณ</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center', padding:24, backgroundColor:'#070814' },
  logoBox:{ shadowColor:'#FF4DE8', shadowOpacity:0.8, shadowRadius:30 },
  logo:{ width:116, height:116, borderRadius:28, alignItems:'center', justifyContent:'center', backgroundColor:'#8B5CF6' },
  logoT:{ color:'#fff', fontSize:70, fontWeight:'900', textShadowColor:'#fff', textShadowRadius:12 },
  brand:{ color:'#fff', fontSize:54, fontWeight:'900', marginTop:22 },
  tagline:{ color:'#7CEBFF', fontSize:15, fontWeight:'800', letterSpacing:2, marginTop:6 },
  thai:{ color:'#D9D9F5', fontSize:20, marginTop:22, marginBottom:30 },
  card:{ width:'100%', gap:12 },
  primaryBtn:{ height:56, borderRadius:16, flexDirection:'row', gap:10, alignItems:'center', justifyContent:'center', backgroundColor:'#8B2BFF' },
  primaryText:{ color:'#fff', fontWeight:'800', fontSize:15 },
  secondaryBtn:{ height:54, borderRadius:16, flexDirection:'row', gap:10, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(255,255,255,0.08)', borderWidth:1, borderColor:'rgba(255,255,255,0.08)' },
  secondaryText:{ color:'#fff', fontWeight:'700', fontSize:15 },
  footer:{ color:'#8B8EA6', marginTop:24 }
});
