import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, Pressable, StyleSheet } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import CameraScreen from './src/screens/CameraScreen';
import FeedScreen from './src/screens/FeedScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import ShopScreen from './src/screens/ShopScreen';
import ProfileScreen from './src/screens/ProfileScreen';

type AppStage = 'login' | 'onboarding' | 'main';
type TabKey = 'profile' | 'camera' | 'feed' | 'groups' | 'shop';

const tabs: Array<{ key: TabKey; label: string; icon: string; isMain?: boolean }> = [
  { key: 'profile', label: 'โปรไฟล์', icon: '👤' },
  { key: 'camera', label: 'AR', icon: 'T', isMain: true },
  { key: 'feed', label: 'แชท', icon: '💬' },
  { key: 'groups', label: 'กลุ่ม', icon: '👥' },
  { key: 'shop', label: 'ร้านค้า', icon: '🛒' },
];

export default function App() {
  const [stage, setStage] = useState<AppStage>('login');
  const [tab, setTab] = useState<TabKey>('camera');

  if (stage === 'login') {
    return <LoginScreen onLogin={() => setStage('onboarding')} />;
  }

  if (stage === 'onboarding') {
    return <OnboardingScreen onDone={() => setStage('main')} />;
  }

  const renderScreen = () => {
    switch (tab) {
      case 'profile':
        return <ProfileScreen />;
      case 'camera':
        return <CameraScreen />;
      case 'feed':
        return <FeedScreen />;
      case 'groups':
        return <GroupsScreen />;
      case 'shop':
        return <ShopScreen />;
      default:
        return <CameraScreen />;
    }
  };

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>{renderScreen()}</View>

        <View style={styles.tabBar}>
          {tabs.map((item) => {
            const active = item.key === tab;

            return (
              <Pressable key={item.key} onPress={() => setTab(item.key)} style={styles.tabItem}>
                {item.isMain ? (
                  <View style={[styles.arButton, active && styles.arButtonActive]}>
                    <Text style={styles.arIcon}>{item.icon}</Text>
                  </View>
                ) : (
                  <Text style={[styles.tabIcon, active && styles.activeIcon]}>{item.icon}</Text>
                )}

                <Text style={[styles.tabLabel, active && styles.activeLabel]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#070814' },
  safe: { flex: 1 },
  content: { flex: 1 },
  tabBar: {
    height: 78,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(7,8,20,0.96)',
    paddingHorizontal: 8,
  },
  tabItem: { alignItems: 'center', justifyContent: 'center', gap: 4, flex: 1 },
  tabIcon: { fontSize: 22, opacity: 0.65 },
  activeIcon: { opacity: 1 },
  arButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#101225',
    borderWidth: 1,
    borderColor: 'rgba(102,233,255,0.45)',
  },
  arButtonActive: {
    backgroundColor: '#5B4BFF',
    borderColor: '#66E9FF',
    shadowColor: '#66E9FF',
    shadowOpacity: 0.7,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  arIcon: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  tabLabel: { color: '#8B8EA6', fontSize: 11, fontWeight: '700' },
  activeLabel: { color: '#66E9FF' },
});
