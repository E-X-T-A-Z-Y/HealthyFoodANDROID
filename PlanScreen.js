import React, { useState } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useContext } from 'react';
import { FoodContext } from './FoodContext';

// Допоміжні компоненти (кнопки і картки) 
const GoalOption = ({ label, isSelected, onPress }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress}>
    <View style={styles.radioContainer}>
      {isSelected ? <View style={styles.radioSelected} /> : <View style={styles.radioUnselected} />}
    </View>
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

const MealCard = ({ title, imageSource }) => (
  <View style={styles.mealCard}>
    <Image source={imageSource} style={styles.mealIcon} />
    <Text style={styles.mealText}>{title}</Text>
  </View>
);

// ГОЛОВНА ФУНКЦІЯ ЕКРАНУ
export default function PlanScreen() {
  const [selectedGoal, setSelectedGoal] = useState('lose_weight');
  const { setDailyGoal } = useContext(FoodContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.headerTitle}>Яка твоя ціль?</Text>
        
        <View style={styles.goalsContainer}>
          <GoalOption 
            label="Втратити вагу" 
            isSelected={selectedGoal === 'lose_weight'} 
            onPress={() => {
              setSelectedGoal('lose_weight');
              setDailyGoal(1600); // Відправляємо нову норму калорій
            }} 
          />
          <GoalOption 
            label="Підтримувати вагу" 
            isSelected={selectedGoal === 'maintain_weight'} 
            onPress={() => {
              setSelectedGoal('maintain_weight');
              setDailyGoal(2000);
            }} 
          />
          <GoalOption 
            label="Набирати м'язову вагу" 
            isSelected={selectedGoal === 'gain_muscle'} 
            onPress={() => {
              setSelectedGoal('gain_muscle');
              setDailyGoal(2500);
            }} 
          />
        </View>

        <Text style={styles.subHeaderTitle}>Складений план харчування</Text>

        <View style={styles.mealsContainer}>
          
          { <MealCard title="Сніданок" imageSource={require('./assets/egg.png')} /> }
          { <MealCard title="Обід" imageSource={require('./assets/meat.png')} /> }
          { <MealCard title="Вечеря" imageSource={require('./assets/broccoli.png')} /> }
          
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6ECDF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 150, 
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 32,
    color: '#1C1816',
    textAlign: 'center',
    marginBottom: 35,
  },
  goalsContainer: {
    marginBottom: 15,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#A37A53',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  radioContainer: {
    marginRight: 15,
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B6B6B6',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#7EBAFF',
  },
  optionText: {
    fontWeight: '600',
  
    fontSize:20,
    color: '#A37A53',
  },
  subHeaderTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#1C1816',
    marginBottom: 20,
    textAlign: 'center',
  },
  mealsContainer: {},
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderWidth: 1,
    borderColor: '#A37A53',
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  mealIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 20,
  },
  mealText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#A37A53',
  }
});