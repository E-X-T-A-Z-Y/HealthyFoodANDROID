import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        

        { <Image source={require('./assets/avocado.png')} style={styles.image} /> }
      
        <Text style={styles.title}>Вітаю, Олексію!</Text>
        <Text style={styles.subtitle}>Твій персональний помічник для здорового харчування та контролю калорій.</Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.replace('MainTabs')} 
        >
          <Text style={styles.buttonText}>Почати роботу</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF9F2', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emojiContainer: {
    width: 180,
    height: 180,
    backgroundColor: '#F0F7EF', 
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 100,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1816',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8C8C8C',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#A37A53', 
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});