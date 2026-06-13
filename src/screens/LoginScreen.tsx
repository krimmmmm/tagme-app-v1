import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <View style={styles.root}>
      <View style={styles.logoGlow}>
        <Image
          source={require('../../assets/tagme-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.brand}>TagMe</Text>
      <Text style={styles.tagline}>TAG. CONNECT. BE SEEN.</Text>
      <Text style={styles.thai}>แสดงตัวตนของคุณในโลกจริง</Text>

      <View style={styles.card}>
        <Pressable style={styles.primaryBtn} onPress={onLogin}>
          <Text style={styles.btnIcon}>📞</Text>
          <Text style={styles.primaryText}>เข้าสู่ระบบด้วยเบอร์โทรศัพท์</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={onLogin}>
          <Text style={styles.btnIcon}>G</Text>
          <Text style={styles.secondaryText}>เข้าสู่ระบบด้วย Google</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={onLogin}>
          <Text style={styles.btnIcon}>✉️</Text>
          <Text style={styles.secondaryText}>เข้าสู่ระบบด้วยอีเมล</Text>
        </Pressable>

        <Text style={styles.signup}>ยังไม่มีบัญชี? สมัครสมาชิก</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#070814',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  logoGlow: {
    width: 126,
    height: 126,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4DE8',
    shadowOpacity: 0.85,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },

  logoImage: {
    width: 120,
    height: 120,
  },

  brand: {
    fontSize: 46,
    color: '#fff',
    fontWeight: '900',
    marginTop: 18,
  },

  tagline: {
    color: '#66E9FF',
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 6,
  },

  thai: {
    color: '#D8D9FF',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 420,
    marginTop: 34,
    gap: 12,
  },

  primaryBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  secondaryBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  btnIcon: {
    color: '#fff',
    fontWeight: '900',
  },

  primaryText: {
    color: '#fff',
    fontWeight: '800',
  },

  secondaryText: {
    color: '#fff',
    fontWeight: '700',
  },

  signup: {
    textAlign: 'center',
    color: '#C084FC',
    marginTop: 12,
    fontWeight: '700',
  },
});
