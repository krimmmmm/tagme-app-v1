import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';

type MemorySlot = {
  slot: number;
  unlockLevel: number;
  imageUri?: string | null;
};

const userLevel = 25;

const initialSlots: MemorySlot[] = [
  { slot: 1, unlockLevel: 0, imageUri: null },
  { slot: 2, unlockLevel: 50, imageUri: null },
  { slot: 3, unlockLevel: 101, imageUri: null },
  { slot: 4, unlockLevel: 201, imageUri: null },
];

export default function ProfileScreen() {
  const [slots, setSlots] = useState<MemorySlot[]>(initialSlots);
  const [selectedSlot, setSelectedSlot] = useState(1);
  const fileInputRef = useRef<any>(null);

  const openImagePicker = (slot: MemorySlot) => {
    setSelectedSlot(slot.slot);
    if (userLevel < slot.unlockLevel) return;
    if (Platform.OS === 'web') fileInputRef.current?.click();
  };

  const onWebImageSelected = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const uri = URL.createObjectURL(file);
    setSlots((items) =>
      items.map((item) =>
        item.slot === selectedSlot ? { ...item, imageUri: uri } : item
      )
    );
  };

  const removePhoto = (slotNo: number) => {
    setSlots((items) =>
      items.map((item) =>
        item.slot === slotNo ? { ...item, imageUri: null } : item
      )
    );
  };

  return (
    <View style={styles.root}>
      {Platform.OS === 'web' ? (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onWebImageSelected}
          style={{ display: 'none' }}
        />
      ) : null}

      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>ตั้งค่าตัวตนและรูปที่อยากโชว์ใน AR</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>😎</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Tadchai</Text>
          <Text style={styles.handle}>@tagme.user</Text>
          <Text style={styles.level}>Lv.{userLevel}</Text>
        </View>
      </View>

      <View style={styles.memoryCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>❤️ Memory Gallery</Text>
            <Text style={styles.sectionSub}>รูปที่รักจะไปแสดงชิดขวาของ AR Card</Text>
          </View>
          <Text style={styles.counter}>{slots.filter((s) => s.imageUri).length}/4</Text>
        </View>

        <View style={styles.slotList}>
          {slots.map((slot) => {
            const unlocked = userLevel >= slot.unlockLevel;
            return (
              <View key={slot.slot} style={styles.slotRow}>
                <Pressable
                  onPress={() => openImagePicker(slot)}
                  style={[
                    styles.memoryCircle,
                    unlocked ? styles.memoryCircleUnlocked : styles.memoryCircleLocked,
                  ]}
                >
                  {slot.imageUri ? (
                    <Image source={{ uri: slot.imageUri }} style={styles.memoryImage} />
                  ) : (
                    <Text style={styles.slotIcon}>{unlocked ? '＋' : '🔒'}</Text>
                  )}
                </Pressable>

                <View style={styles.slotInfo}>
                  <Text style={styles.slotTitle}>รูปที่ {slot.slot}</Text>
                  <Text style={styles.slotDesc}>
                    {slot.slot === 1 ? 'ฟรี ใช้ได้เลย' : `ปลดล็อกเมื่อ Level ${slot.unlockLevel}+`}
                  </Text>
                </View>

                {unlocked ? (
                  <Pressable style={styles.addBtn} onPress={() => openImagePicker(slot)}>
                    <Text style={styles.addText}>{slot.imageUri ? 'เปลี่ยนรูป' : 'Add รูป'}</Text>
                  </Pressable>
                ) : (
                  <View style={styles.disabledBtn}>
                    <Text style={styles.disabledText}>Locked</Text>
                  </View>
                )}

                {slot.imageUri ? (
                  <Pressable style={styles.deleteBtn} onPress={() => removePhoto(slot.slot)}>
                    <Text style={styles.deleteText}>ลบ</Text>
                  </Pressable>
                ) : null}
              </View>
            );
          })}
        </View>

        <View style={styles.ruleBox}>
          <Text style={styles.ruleTitle}>เงื่อนไข Slot</Text>
          <Text style={styles.ruleText}>รูปที่ 1 = ฟรี</Text>
          <Text style={styles.ruleText}>รูปที่ 2 = Level 50-100</Text>
          <Text style={styles.ruleText}>รูปที่ 3 = Level 101-200</Text>
          <Text style={styles.ruleText}>รูปที่ 4 = Level 201-300</Text>
        </View>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>AR Preview</Text>
        <View style={styles.fakeArCard}>
          <Text style={styles.fakeName}>Tadchai</Text>
          <Text style={styles.fakeStatus}>🎮 Gamer</Text>
          <Text style={styles.fakeMsg}>💬 ขอความช่วยเหลือ</Text>

          <View style={styles.fakeGallery}>
            {slots.map((slot) => {
              const unlocked = userLevel >= slot.unlockLevel;
              return (
                <View
                  key={slot.slot}
                  style={[
                    styles.fakeGallerySlot,
                    !unlocked && styles.fakeGallerySlotLocked,
                  ]}
                >
                  {slot.imageUri ? (
                    <Image source={{ uri: slot.imageUri }} style={styles.fakeImage} />
                  ) : (
                    <Text style={styles.fakeIcon}>{unlocked ? '＋' : '🔒'}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070814', padding: 20 },
  header: { marginTop: 16, marginBottom: 16 },
  title: { color: '#fff', fontSize: 34, fontWeight: '900' },
  subtitle: { color: '#A8ACCF', marginTop: 8, fontWeight: '700' },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 16, borderRadius: 26, padding: 18, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  avatar: { width: 78, height: 78, borderRadius: 39, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(139,92,246,0.22)', borderWidth: 2, borderColor: '#66E9FF' },
  avatarText: { fontSize: 34 },
  name: { color: '#fff', fontSize: 26, fontWeight: '900' },
  handle: { color: '#A8ACCF', marginTop: 3, fontWeight: '700' },
  level: { color: '#FDE68A', marginTop: 8, fontWeight: '900' },
  memoryCard: { marginTop: 18, borderRadius: 26, padding: 18, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  sectionTitle: { color: '#fff', fontSize: 22, fontWeight: '900' },
  sectionSub: { color: '#A8ACCF', marginTop: 5, fontWeight: '700' },
  counter: { color: '#66E9FF', fontSize: 18, fontWeight: '900' },
  slotList: { gap: 12, marginTop: 18 },
  slotRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  memoryCircle: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  memoryCircleUnlocked: { borderWidth: 2, borderColor: '#66E9FF', backgroundColor: 'rgba(255,255,255,0.12)' },
  memoryCircleLocked: { borderWidth: 1, borderColor: '#6B7280', backgroundColor: 'rgba(0,0,0,0.45)' },
  memoryImage: { width: '100%', height: '100%' },
  slotIcon: { color: '#fff', fontSize: 22, fontWeight: '900' },
  slotInfo: { flex: 1 },
  slotTitle: { color: '#fff', fontWeight: '900', fontSize: 16 },
  slotDesc: { color: '#9CA3AF', marginTop: 4, fontSize: 12, fontWeight: '700' },
  addBtn: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 999, backgroundColor: '#5B4BFF' },
  addText: { color: '#fff', fontWeight: '900', fontSize: 12 },
  disabledBtn: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 999, backgroundColor: 'rgba(107,114,128,0.20)' },
  disabledText: { color: '#6B7280', fontWeight: '900', fontSize: 12 },
  deleteBtn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, backgroundColor: 'rgba(239,68,68,0.14)', borderWidth: 1, borderColor: '#EF4444' },
  deleteText: { color: '#FCA5A5', fontWeight: '900', fontSize: 12 },
  ruleBox: { marginTop: 18, padding: 14, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)' },
  ruleTitle: { color: '#fff', fontWeight: '900', marginBottom: 8 },
  ruleText: { color: '#A8ACCF', fontWeight: '700', marginTop: 3 },
  previewCard: { marginTop: 18, borderRadius: 26, padding: 18, backgroundColor: '#12142B', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  previewTitle: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 12 },
  fakeArCard: { width: 280, minHeight: 120, borderRadius: 24, borderWidth: 1, borderColor: '#66E9FF', backgroundColor: 'rgba(7,8,20,0.75)', padding: 16, position: 'relative' },
  fakeName: { color: '#fff', fontSize: 20, fontWeight: '900' },
  fakeStatus: { color: '#D8B4FE', marginTop: 8, fontWeight: '900' },
  fakeMsg: { color: '#fff', marginTop: 8, fontWeight: '800' },
  fakeGallery: { position: 'absolute', right: -52, top: 0, gap: 8 },
  fakeGallerySlot: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: '#66E9FF', backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  fakeGallerySlotLocked: { borderColor: '#6B7280', backgroundColor: 'rgba(0,0,0,0.55)' },
  fakeImage: { width: '100%', height: '100%' },
  fakeIcon: { color: '#fff', fontWeight: '900' },
});
