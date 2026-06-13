import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LanguageKey, t } from '../i18n/translations';

export default function OnboardingScreen({ language, onDone }: { language: LanguageKey; onDone: () => void }) {
  const text = t[language];
  const pages = [
    {
      title: text.onboarding1Title,
      subtitle: text.onboarding1Subtitle,
      tags: [
        { text: '🎮 Gamer', x: 40, y: 210 },
        { text: '🏀 Basketball', x: 34, y: 295 },
        { text: '🎧 Music Lover', x: 72, y: 410 },
      ],
      person: '🧑🏻‍💻',
    },
    {
      title: text.onboarding2Title,
      subtitle: text.onboarding2Subtitle,
      tags: [
        { text: '☕ Coffee Lover', x: 80, y: 300 },
        { text: '🎨 Designer', x: 90, y: 370 },
        { text: '🌸 Anime Club', x: 88, y: 455 },
      ],
      person: '👩🏻‍🎤',
    },
    {
      title: text.onboarding3Title,
      subtitle: text.onboarding3Subtitle,
      tags: [
        { text: '💜', x: 80, y: 315 },
        { text: '🤝', x: 230, y: 330 },
        { text: '👥', x: 152, y: 235 },
        { text: '6m', x: 210, y: 455 },
      ],
      person: '🌌',
    },
  ];

  const [page, setPage] = useState(0);
  const item = pages[page];

  const next = () => {
    if (page === pages.length - 1) onDone();
    else setPage((value) => value + 1);
  };

  return (
    <View style={styles.root}>
      <View style={styles.phone}>
        <Text style={styles.time}>9:41</Text>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        <View style={styles.stage}>
          <View style={styles.personGlow}>
            <Text style={styles.person}>{item.person}</Text>
          </View>

          {item.tags.map((tag, index) => (
            <View key={`${tag.text}-${index}`} style={[styles.floatTag, { left: tag.x, top: tag.y }]}>
              <Text style={styles.floatTagText}>{tag.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.dots}>
          {pages.map((_, index) => <View key={index} style={[styles.dot, index === page && styles.dotActive]} />)}
        </View>

        <View style={styles.footer}>
          <Pressable onPress={onDone}>
            <Text style={styles.skip}>{text.skip}</Text>
          </Pressable>

          <Pressable style={styles.nextBtn} onPress={next}>
            <Text style={styles.nextText}>{page === pages.length - 1 ? text.start : text.next}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814', alignItems: 'center', justifyContent: 'center', padding: 18 },
  phone: { width: '100%', maxWidth: 390, height: '94%', borderRadius: 34, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', backgroundColor: '#090A18', overflow: 'hidden', padding: 24 },
  time: { color: '#fff', fontWeight: '900' },
  title: { color: '#fff', textAlign: 'center', fontSize: 24, fontWeight: '900', marginTop: 24 },
  subtitle: { color: '#B9BCE0', textAlign: 'center', lineHeight: 22, marginTop: 8 },
  stage: { flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  personGlow: { width: 190, height: 260, borderRadius: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(139,92,246,0.12)' },
  person: { fontSize: 110 },
  floatTag: { position: 'absolute', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: 'rgba(143,49,191,0.86)', borderWidth: 1, borderColor: '#F05CFF' },
  floatTagText: { color: '#fff', fontWeight: '900' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#3C3E5A' },
  dotActive: { backgroundColor: '#C026D3', width: 18 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  skip: { color: '#fff', fontWeight: '800' },
  nextBtn: { width: 118, height: 50, borderRadius: 16, backgroundColor: '#5B4BFF', alignItems: 'center', justifyContent: 'center' },
  nextText: { color: '#fff', fontWeight: '900' },
});
