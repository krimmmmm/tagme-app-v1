import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { LanguageKey, languages, t } from '../i18n/translations';

export default function LoginScreen({
  language,
  onLanguageChange,
  onLogin,
}: {
  language: LanguageKey;
  onLanguageChange: (language: LanguageKey) => void;
  onLogin: () => void;
}) {
  const text = t[language];

  return (
    <View style={styles.root}>
      <View style={styles.languageBar}>
        {languages.map((item) => {
          const active = item.key === language;
          return (
            <Pressable
              key={item.key}
              onPress={() => onLanguageChange(item.key)}
              style={[styles.languageBtn, active && styles.languageBtnActive]}
            >
              <Text style={styles.flag}>{item.flag}</Text>
              <Text style={[styles.languageText, active && styles.languageTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Image source={require('../../assets/tagme-logo.png')} style={styles.logoImage} resizeMode="contain" />

      <Text style={styles.brand}>TagMe</Text>
      <Text style={styles.tagline}>TAG. CONNECT. BE SEEN.</Text>
      <Text style={styles.mainText}>{text.loginMain}</Text>

      <View style={styles.card}>
        <Pressable style={styles.primaryBtn} onPress={onLogin}>
          <Text style={styles.primaryText}>{text.phoneLogin}</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={onLogin}>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.secondaryText}>{text.googleLogin}</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={onLogin}>
          <Text style={styles.appleIcon}>●</Text>
          <Text style={styles.secondaryText}>{text.appleLogin}</Text>
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>{text.or}</Text>
          <View style={styles.line} />
        </View>

        <Pressable style={styles.secondaryBtn} onPress={onLogin}>
          <Text style={styles.btnIcon}>✉️</Text>
          <Text style={styles.secondaryText}>{text.emailLogin}</Text>
        </Pressable>

        <Text style={styles.signup}>{text.signup}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814', alignItems: 'center', justifyContent: 'center', padding: 24 },
  languageBar: { position: 'absolute', top: 28, right: 24, flexDirection: 'row', gap: 8 },
  languageBtn: {
    minWidth: 66,
    height: 34,
    borderRadius: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  languageBtnActive: { backgroundColor: 'rgba(139,92,246,0.35)', borderColor: '#FFFFFF' },
  flag: { fontSize: 14 },
  languageText: { color: '#9EA2C5', fontSize: 12, fontWeight: '800' },
  languageTextActive: { color: '#FFFFFF' },
  logoImage: { width: 142, height: 142 },
  brand: { fontSize: 46, color: '#fff', fontWeight: '900', marginTop: 10 },
  tagline: { color: '#66E9FF', fontWeight: '800', letterSpacing: 2, marginTop: 6 },
  mainText: { color: '#D8D9FF', fontSize: 20, marginTop: 20, textAlign: 'center' },
  card: { width: '100%', maxWidth: 420, marginTop: 34, gap: 12 },
  primaryBtn: { height: 54, borderRadius: 16, backgroundColor: '#8B5CF6', alignItems: 'center', justifyContent: 'center' },
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
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 2 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.10)' },
  orText: { color: '#8B8EA6', fontWeight: '700' },
  btnIcon: { color: '#fff', fontWeight: '900' },
  googleIcon: { color: '#FFFFFF', fontWeight: '900', fontSize: 18 },
  appleIcon: { color: '#FFFFFF', fontWeight: '900', fontSize: 16 },
  primaryText: { color: '#fff', fontWeight: '800' },
  secondaryText: { color: '#fff', fontWeight: '700' },
  signup: { textAlign: 'center', color: '#C084FC', marginTop: 12, fontWeight: '700' },
});
