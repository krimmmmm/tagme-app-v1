import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

type LanguageKey = 'th' | 'en' | 'zh';

const languages: Array<{ key: LanguageKey; label: string; flag: string }> = [
  { key: 'th', label: 'ไทย', flag: '🇹🇭' },
  { key: 'en', label: 'EN', flag: '🇬🇧' },
  { key: 'zh', label: '中文', flag: '🇨🇳' },
];

const copy = {
  th: {
    main: 'แสดงตัวตนของคุณในโลกจริง',
    phone: 'เข้าสู่ระบบด้วยเบอร์โทรศัพท์',
    google: 'เข้าสู่ระบบด้วย Google',
    email: 'เข้าสู่ระบบด้วยอีเมล',
    signup: 'ยังไม่มีบัญชี? สมัครสมาชิก',
  },
  en: {
    main: 'Show who you are in the real world',
    phone: 'Sign in with phone number',
    google: 'Sign in with Google',
    email: 'Sign in with email',
    signup: "Don’t have an account? Sign up",
  },
  zh: {
    main: '在现实世界中展示你的身份',
    phone: '使用电话号码登录',
    google: '使用 Google 登录',
    email: '使用电子邮件登录',
    signup: '还没有账号？注册',
  },
};

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [language, setLanguage] = useState<LanguageKey>('th');
  const text = copy[language];

  return (
    <View style={styles.root}>
      <View style={styles.languageBar}>
        {languages.map((item) => {
          const active = item.key === language;
          return (
            <Pressable
              key={item.key}
              onPress={() => setLanguage(item.key)}
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

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/tagme-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.brand}>TagMe</Text>
      <Text style={styles.tagline}>TAG. CONNECT. BE SEEN.</Text>
      <Text style={styles.mainText}>{text.main}</Text>

      <View style={styles.card}>
        <Pressable style={styles.primaryBtn} onPress={onLogin}>
          <Text style={styles.primaryText}>{text.phone}</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={onLogin}>
          <Text style={styles.btnIcon}>G</Text>
          <Text style={styles.secondaryText}>{text.google}</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={onLogin}>
          <Text style={styles.btnIcon}>✉️</Text>
          <Text style={styles.secondaryText}>{text.email}</Text>
        </Pressable>

        <Text style={styles.signup}>{text.signup}</Text>
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

  languageBar: {
    position: 'absolute',
    top: 28,
    right: 24,
    flexDirection: 'row',
    gap: 8,
  },

  languageBtn: {
    minWidth: 68,
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

  languageBtnActive: {
    backgroundColor: 'rgba(139,92,246,0.35)',
    borderColor: '#66E9FF',
  },

  flag: {
    fontSize: 14,
  },

  languageText: {
    color: '#9EA2C5',
    fontSize: 12,
    fontWeight: '800',
  },

  languageTextActive: {
    color: '#FFFFFF',
  },

  logoContainer: {
    width: 148,
    height: 148,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImage: {
    width: 142,
    height: 142,
  },

  brand: {
    fontSize: 46,
    color: '#fff',
    fontWeight: '900',
    marginTop: 10,
  },

  tagline: {
    color: '#66E9FF',
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 6,
  },

  mainText: {
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
