import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './src/screens/LoginScreen';
import CameraScreen from './src/screens/CameraScreen';
import FeedScreen from './src/screens/FeedScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import ShopScreen from './src/screens/ShopScreen';
import ProfileScreen from './src/screens/ProfileScreen';

type TabKey = 'feed' | 'camera' | 'groups' | 'shop' | 'profile';

const tabs: Array<{ key: TabKey; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { key: 'feed', label: 'Feed', icon: 'home' },
  { key: 'camera', label: 'AR', icon: 'scan' },
  { key: 'groups', label: 'Groups', icon: 'people' },
  { key: 'shop', label: 'Shop', icon: 'storefront' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [tab, setTab] = useState<TabKey>('camera');

  if (!signedIn) return <LoginScreen onLogin={() => setSignedIn(true)} />;

  const renderScreen = () => {
    switch (tab) {
      case 'feed': return <FeedScreen />;
      case 'camera': return <CameraScreen />;
      case 'groups': return <GroupsScreen />;
      case 'shop': return <ShopScreen />;
      case 'profile': return <ProfileScreen />;
    }
  };

  return (
    <LinearGradient colors={["#070814", "#11122B"]} style={styles.app}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>{renderScreen()}</View>
        <View style={styles.tabBar}>
          {tabs.map((item) => {
            const active = item.key === tab;
            return (
              <Pressable key={item.key} onPress={() => setTab(item.key)} style={styles.tabItem}>
                <Ionicons name={item.icon} size={24} color={active ? '#66E9FF' : '#8B8EA6'} />
                <Text style={[styles.tabLabel, active && styles.activeLabel]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1 },
  safe: { flex: 1 },
  content: { flex: 1 },
  tabBar: {
    height: 76,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(7,8,20,0.92)',
  },
  tabItem: { alignItems: 'center', gap: 4, flex: 1 },
  tabLabel: { color: '#8B8EA6', fontSize: 11, fontWeight: '600' },
  activeLabel: { color: '#66E9FF' },
});
