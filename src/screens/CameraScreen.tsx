import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, TextInput } from 'react-native';
import { LanguageKey, t } from '../i18n/translations';

type Tag = {
  id: string;
  emoji: string;
  title: string;
  left: number;
  top: number;
  color: string;
};

const initialTags: Tag[] = [
  { id: '1', emoji: '☕', title: 'Coffee Lover', left: 42, top: 30, color: '#F59E0B' },
  { id: '2', emoji: '🎌', title: 'Anime Club', left: 12, top: 24, color: '#C026D3' },
  { id: '3', emoji: '🎮', title: 'Gamer', left: 66, top: 26, color: '#22C55E' },
];

export default function CameraScreen({ language }: { language: LanguageKey }) {
  const text = t[language];

  const videoRef = useRef<any>(null);
  const streamRef = useRef<any>(null);
  const detectorRef = useRef<any>(null);
  const loopRef = useRef<any>(null);

  const [mode, setMode] = useState<'ar' | 'radar'>('ar');
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [faceMode, setFaceMode] = useState(false);
  const [faceStatus, setFaceStatus] = useState('Face Follow: Off');

  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedTagId, setSelectedTagId] = useState('1');
  const [myStatus, setMyStatus] = useState('ขอความช่วยเหลือ');

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    let mounted = true;

    async function startCamera() {
      try {
        const stream = await (navigator as any).mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });

        if (!mounted) return;

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play?.();
        }

        setCameraReady(true);
      } catch {
        setCameraError('ไม่สามารถเปิดกล้องได้ กรุณาอนุญาต Camera Permission');
      }
    }

    startCamera();

    return () => {
      mounted = false;
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
      streamRef.current?.getTracks?.().forEach((track: any) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!faceMode || Platform.OS !== 'web') return;

    let active = true;

    async function setupDetector() {
      try {
        const FaceDetectorClass = (window as any).FaceDetector;

        if (!FaceDetectorClass) {
          setFaceStatus('Face Follow: Browser ยังไม่รองรับ FaceDetector');
          return;
        }

        detectorRef.current = new FaceDetectorClass({
          fastMode: true,
          maxDetectedFaces: 3,
        });

        setFaceStatus('Face Follow: Searching...');

        const detectLoop = async () => {
          try {
            const video = videoRef.current;

            if (!active || !video || video.readyState < 2) {
              loopRef.current = requestAnimationFrame(detectLoop);
              return;
            }

            const faces = await detectorRef.current.detect(video);

            if (faces?.length) {
              const firstFace = faces[0].boundingBox;
              const videoWidth = video.videoWidth || 1280;
              const videoHeight = video.videoHeight || 720;

              const centerX = ((firstFace.x + firstFace.width / 2) / videoWidth) * 100;
              const topY = (firstFace.y / videoHeight) * 100;

              setTags((items) =>
                items.map((item) =>
                  item.id === selectedTagId
                    ? {
                        ...item,
                        left: Math.max(5, Math.min(82, centerX - 13)),
                        top: Math.max(8, Math.min(75, topY - 10)),
                      }
                    : item
                )
              );

              setFaceStatus(`Face Follow: เจอใบหน้า ${faces.length} คน`);
            } else {
              setFaceStatus('Face Follow: ไม่พบใบหน้า');
            }
          } catch {
            setFaceStatus('Face Follow: ตรวจจับไม่สำเร็จ');
          }

          loopRef.current = requestAnimationFrame(detectLoop);
        };

        detectLoop();
      } catch {
        setFaceStatus('Face Follow: ไม่สามารถเริ่มระบบได้');
      }
    }

    setupDetector();

    return () => {
      active = false;
      if (loopRef.current) cancelAnimationFrame(loopRef.current);
    };
  }, [faceMode, selectedTagId]);

  const applyStatus = () => {
    setTags((items) =>
      items.map((item) =>
        item.id === selectedTagId
          ? { ...item, emoji: '🆘', title: myStatus || item.title, color: '#EF4444' }
          : item
      )
    );
  };

  if (mode === 'radar') {
    return (
      <View style={styles.root}>
        <TopBar mode={mode} setMode={setMode} />
        <View style={styles.radarPage}>
          <Text style={styles.radarTitle}>{text.radarTitle}</Text>

          <View style={styles.radarCircle}>
            <View style={styles.ring1} />
            <View style={styles.ring2} />
            <View style={styles.ring3} />
            <Text style={[styles.avatarDot, { left: '46%', top: '18%' }]}>😎</Text>
            <Text style={[styles.avatarDot, { left: '30%', top: '35%' }]}>👨</Text>
            <Text style={[styles.avatarDot, { left: '60%', top: '38%' }]}>👩</Text>
            <Text style={[styles.smallBadge, { left: '20%', top: '56%' }]}>🎌</Text>
            <Text style={[styles.smallBadge, { left: '70%', top: '28%' }]}>☕</Text>
          </View>

          <View style={styles.radarList}>
            {[
              ['🎌 Anime Club', `12 ${text.people}`, '8m'],
              ['☕ Coffee Lovers', `7 ${text.people}`, '10m'],
              ['🎮 Gamer Thailand', `15 ${text.people}`, '12m'],
              ['🏍 BigBike Club', `4 ${text.people}`, '15m'],
            ].map(([name, detail, distance]) => (
              <View key={name} style={styles.radarItem}>
                <View>
                  <Text style={styles.radarName}>{name}</Text>
                  <Text style={styles.radarDetail}>{detail}</Text>
                </View>
                <Text style={styles.radarDistance}>{distance}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <TopBar mode={mode} setMode={setMode} />

      <View style={styles.cameraArea}>
        <View style={styles.arHeader}>
          <Text style={styles.nearby}>☘ {text.nearby}</Text>
          <Text style={styles.filter}>⏷ {text.all}</Text>
        </View>

        <View style={styles.cameraFrame}>
          {Platform.OS === 'web'
            ? React.createElement('video', {
                ref: videoRef,
                autoPlay: true,
                playsInline: true,
                muted: true,
                style: {
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scaleX(-1)',
                  backgroundColor: '#111827',
                },
              })
            : (
              <View style={styles.mobileMock}>
                <Text style={styles.mobileMockText}>AR Camera Preview</Text>
              </View>
            )}

          {!cameraReady ? (
            <View style={styles.cameraFallback}>
              <Text style={styles.fallbackTitle}>AR Camera Test</Text>
              <Text style={styles.fallbackText}>{cameraError || 'กำลังเปิดกล้อง...'}</Text>
            </View>
          ) : null}

          <View style={styles.dimOverlay} />

          {tags.map((tag) => {
            const active = tag.id === selectedTagId;
            return (
              <Pressable
                key={tag.id}
                onPress={() => setSelectedTagId(tag.id)}
                style={[
                  styles.floatTag,
                  {
                    left: `${tag.left}%` as any,
                    top: `${tag.top}%` as any,
                    borderColor: tag.color,
                    backgroundColor: active ? 'rgba(91,75,255,0.92)' : 'rgba(20,20,40,0.82)',
                  },
                ]}
              >
                <Text style={styles.floatText}>{tag.emoji} {tag.title}</Text>
              </Pressable>
            );
          })}

          <Text style={[styles.distanceBubble, { left: '18%', bottom: 36 }]}>8m</Text>
          <Text style={[styles.distanceBubble, { left: '48%', bottom: 82, backgroundColor: '#15803D' }]}>5m</Text>
          <Text style={[styles.distanceBubble, { right: '18%', bottom: 70, backgroundColor: '#5B4BFF' }]}>7m</Text>
        </View>

        <View style={styles.testPanel}>
          <View style={styles.panelTop}>
            <View>
              <Text style={styles.panelTitle}>ทดสอบ AR Face Follow</Text>
              <Text style={styles.panelSub}>{faceStatus}</Text>
            </View>

            <Pressable
              style={[styles.faceBtn, faceMode && styles.faceBtnActive]}
              onPress={() => setFaceMode((value) => !value)}
            >
              <Text style={styles.faceBtnText}>{faceMode ? 'ON' : 'OFF'}</Text>
            </Pressable>
          </View>

          <View style={styles.inputRow}>
            <TextInput
              value={myStatus}
              onChangeText={setMyStatus}
              placeholder="พิมพ์ข้อความ เช่น ขอความช่วยเหลือ"
              placeholderTextColor="#8B8EA6"
              style={styles.input}
            />
            <Pressable style={styles.applyBtn} onPress={applyStatus}>
              <Text style={styles.applyText}>แสดง</Text>
            </Pressable>
          </View>

          <Text style={styles.hint}>
            เปิด Face Follow แล้วกล่องที่เลือกจะพยายามตามใบหน้าบนกล้อง
          </Text>
        </View>
      </View>
    </View>
  );
}

function TopBar({
  mode,
  setMode,
}: {
  mode: 'ar' | 'radar';
  setMode: (mode: 'ar' | 'radar') => void;
}) {
  return (
    <View style={styles.topBar}>
      <Text style={styles.profileIcon}>👤</Text>

      <View style={styles.segment}>
        <Pressable onPress={() => setMode('ar')} style={[styles.segmentBtn, mode === 'ar' && styles.segmentActive]}>
          <Text style={[styles.segmentText, mode === 'ar' && styles.segmentTextActive]}>AR</Text>
        </Pressable>
        <Pressable onPress={() => setMode('radar')} style={[styles.segmentBtn, mode === 'radar' && styles.segmentActive]}>
          <Text style={[styles.segmentText, mode === 'radar' && styles.segmentTextActive]}>Radar</Text>
        </Pressable>
      </View>

      <Text style={styles.search}>⌕</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814' },
  topBar: { height: 78, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  profileIcon: { fontSize: 24 },
  search: { color: '#fff', fontSize: 32 },
  segment: { flexDirection: 'row', borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.06)', padding: 4 },
  segmentBtn: { height: 36, minWidth: 78, alignItems: 'center', justifyContent: 'center', borderRadius: 18 },
  segmentActive: { backgroundColor: '#3345FF' },
  segmentText: { color: '#9EA2C5', fontWeight: '800' },
  segmentTextActive: { color: '#fff' },

  cameraArea: { flex: 1 },
  arHeader: { position: 'absolute', zIndex: 10, left: 20, right: 20, top: 4, flexDirection: 'row', justifyContent: 'space-between' },
  nearby: { color: '#86EFAC', backgroundColor: 'rgba(21,128,61,0.32)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, fontWeight: '900' },
  filter: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.14)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, fontWeight: '900' },

  cameraFrame: { flex: 1, margin: 16, borderRadius: 26, backgroundColor: '#111827', overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: 'rgba(102,233,255,0.18)' },
  mobileMock: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827' },
  mobileMockText: { color: '#fff', fontSize: 22, fontWeight: '900' },
  cameraFallback: { position: 'absolute', inset: 0 as any, alignItems: 'center', justifyContent: 'center', padding: 30, backgroundColor: '#111827' },
  fallbackTitle: { color: '#fff', fontSize: 28, fontWeight: '900' },
  fallbackText: { color: '#A8ACCF', marginTop: 12, textAlign: 'center', lineHeight: 22 },
  dimOverlay: { position: 'absolute', inset: 0 as any, backgroundColor: 'rgba(0,0,0,0.16)' },

  floatTag: { position: 'absolute', zIndex: 20, borderWidth: 1.4, borderRadius: 14, paddingHorizontal: 13, paddingVertical: 9, shadowColor: '#C026D3', shadowOpacity: 0.65, shadowRadius: 14, shadowOffset: { width: 0, height: 0 } },
  floatText: { color: '#fff', fontWeight: '900', textAlign: 'center', fontSize: 15 },
  distanceBubble: { position: 'absolute', zIndex: 20, color: '#fff', backgroundColor: '#6B7280', padding: 8, borderRadius: 999, fontWeight: '900' },

  testPanel: { marginHorizontal: 16, marginBottom: 12, borderRadius: 22, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', padding: 14 },
  panelTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  panelTitle: { color: '#fff', fontWeight: '900', fontSize: 17 },
  panelSub: { color: '#A8ACCF', marginTop: 4, fontSize: 13, fontWeight: '700' },
  faceBtn: { width: 64, height: 38, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.10)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  faceBtnActive: { backgroundColor: '#16A34A', borderColor: '#86EFAC' },
  faceBtnText: { color: '#fff', fontWeight: '900' },
  inputRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  input: { flex: 1, height: 46, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 14, color: '#fff', fontWeight: '700' },
  applyBtn: { width: 82, height: 46, borderRadius: 14, backgroundColor: '#5B4BFF', alignItems: 'center', justifyContent: 'center' },
  applyText: { color: '#fff', fontWeight: '900' },
  hint: { color: '#8B8EA6', marginTop: 10, fontSize: 12 },

  radarPage: { flex: 1, padding: 20 },
  radarTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginBottom: 16 },
  radarCircle: { height: 300, borderRadius: 150, borderWidth: 1, borderColor: 'rgba(102,233,255,0.35)', position: 'relative', alignItems: 'center', justifyContent: 'center' },
  ring1: { position: 'absolute', width: 230, height: 230, borderRadius: 115, borderWidth: 1, borderColor: 'rgba(102,233,255,0.25)' },
  ring2: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 1, borderColor: 'rgba(102,233,255,0.25)' },
  ring3: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(14,165,233,0.18)' },
  avatarDot: { position: 'absolute', width: 42, height: 42, borderRadius: 21, textAlign: 'center', paddingTop: 6, backgroundColor: 'rgba(255,255,255,0.18)', overflow: 'hidden', fontSize: 22 },
  smallBadge: { position: 'absolute', fontSize: 22, backgroundColor: 'rgba(139,92,246,0.4)', padding: 8, borderRadius: 20, overflow: 'hidden' },
  radarList: { marginTop: 20, gap: 10 },
  radarItem: { minHeight: 66, borderRadius: 18, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  radarName: { color: '#fff', fontWeight: '900', fontSize: 16 },
  radarDetail: { color: '#A8ACCF', marginTop: 4 },
  radarDistance: { color: '#66E9FF', fontWeight: '900' },
});
