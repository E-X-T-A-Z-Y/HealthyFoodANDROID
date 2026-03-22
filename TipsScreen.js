import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const WIKI_TOPICS = [
  { WIKI_ID: 'Здорове_харчування', icon: 'food-apple-outline' },
  { WIKI_ID: 'Питна_вода', icon: 'water-outline' },
  { WIKI_ID: 'Вітаміни', icon: 'pill' },
  { WIKI_ID: 'Калорія', icon: 'fire' },
  { WIKI_ID: 'Білки', icon: 'food-drumstick-outline' }
];

export default function TipsScreen() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const fetchedTips = [];
        
        for (const topic of WIKI_TOPICS) {
          const response = await fetch(`https://uk.wikipedia.org/api/rest_v1/page/summary/${topic.WIKI_ID}`);
          
          if (response.ok) {
            const data = await response.json();
            
            fetchedTips.push({
              id: data.pageid.toString(),
              title: data.title,
              description: data.extract.length > 150 ? data.extract.substring(0, 150) + '...' : data.extract,
              icon: topic.icon,
              link: data.content_urls.desktop.page 
            });
          }
        }

        setTips(fetchedTips);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження з Вікіпедії:", error);
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Не вдалося відкрити посилання", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Порада дня</Text>
        <Text style={styles.headerSubtitle}>Корисні статті з Вікіпедії</Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#A37A53" />
          <Text style={styles.loaderText}>Завантажуємо статті...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {tips.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name={tip.icon} size={28} color="#7DBA72" />
                </View>
                <Text style={styles.tipTitle}>{tip.title}</Text>
              </View>
              
              <Text style={styles.tipDescription}>{tip.description}</Text>
              
              <TouchableOpacity style={styles.readMoreButton} onPress={() => openLink(tip.link)}>
                <Text style={styles.readMoreText}>Читати повну статтю</Text>
                <Ionicons name="arrow-forward" size={16} color="#A37A53" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDF9F2' },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#FDF9F2', borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1C1816', textAlign: 'center' },
  headerSubtitle: { fontSize: 14, color: '#8C8C8C', textAlign: 'center', marginTop: 5 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 15, fontSize: 16, color: '#A37A53', fontWeight: '600' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 150 },
  tipCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#EFEFEF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F0F7EF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  tipTitle: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#1C1816' },
  tipDescription: { fontSize: 14, color: '#5A5A5A', lineHeight: 22, marginBottom: 20 },
  readMoreButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#FFF4EB' },
  readMoreText: { fontSize: 14, fontWeight: 'bold', color: '#A37A53', marginRight: 5 }
});