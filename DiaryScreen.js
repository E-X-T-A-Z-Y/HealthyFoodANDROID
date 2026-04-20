import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { FoodContext } from './FoodContext'; 

const ProgressBar = ({ label, current, total, color }) => (
  <View style={styles.macroContainer}>
    <View style={styles.macroTextRow}>
      <Text style={styles.macroLabel}>{label}</Text>
      <Text style={styles.macroNumbers}>{current}/{total}г</Text>
    </View>
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${Math.min((current / total) * 100, 100)}%`, backgroundColor: color }]} />
    </View>
  </View>
);

export default function DiaryScreen({ navigation }) {
  const { mealsData, foodDataList, dailyGoal } = useContext(FoodContext);
  const [activeMeal, setActiveMeal] = useState('Сніданок');
  const meals = ['Сніданок', 'Обід', 'Вечеря', 'Перекус'];

  const activeMealItems = mealsData[activeMeal].map(id => foodDataList.find(f => f.id === id)).filter(Boolean); 
  const activeMealCalories = activeMealItems.reduce((sum, f) => sum + f.calories, 0);

  let totalEaten = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;

  Object.values(mealsData).forEach(mealArray => {
    mealArray.forEach(id => {
      const food = foodDataList.find(item => item.id === id);
      if (food) {
        totalEaten += food.calories;
        totalProtein += food.protein;
        totalFat += food.fat;
        totalCarbs += food.carbs;
      }
    });
  });

const goalCalories = dailyGoal;
  
  const isOverLimit = totalEaten > goalCalories;
  const remaining = isOverLimit ? totalEaten - goalCalories : goalCalories - totalEaten;
  const remainingLabel = isOverLimit ? "Перебір" : "Залишилось";
  const remainingColor = isOverLimit ? "#EF476F" : "#1C1816"; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.headerTitle}>Щоденник харчування</Text>

        <View style={styles.circleSection}>
          <View style={styles.circleContainer}>
            <View style={styles.circleWrapper} />
            <View style={styles.circleTextContainer}>
              <Text style={styles.remainingLabel}>{remainingLabel}</Text>
              <Text style={[styles.remainingValue, { color: remainingColor }]}>{remaining}</Text>
              <Text style={styles.remainingUnit}>ккал</Text>
            </View>
          </View>
          
          <View style={styles.eatenBurnedRow}>
            <Text style={styles.eatenText}>З'їдено {totalEaten}</Text>
            <Text style={styles.burnedText}>Спалено 0</Text>
          </View>
        </View>

        <View style={styles.macrosSection}>
          <ProgressBar label="Білки" current={totalProtein} total={150} color="#7EBAFF" />
          <ProgressBar label="Жири" current={totalFat} total={70} color="#FFD166" />
          <ProgressBar label="Вуглеводи" current={totalCarbs} total={220} color="#EF476F" />
        </View>

        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {meals.map((meal) => (
              <TouchableOpacity 
                key={meal}
                style={[styles.tabButton, activeMeal === meal && styles.tabButtonActive]}
                onPress={() => setActiveMeal(meal)}
              >
                <Text style={[styles.tabText, activeMeal === meal && styles.tabTextActive]}>
                  {meal}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.mealDetailsSection}>
          <Text style={styles.mealDetailsTitle}>{activeMeal} {activeMealCalories} ккал</Text>
          
          {activeMealItems.length > 0 ? (
            <View style={styles.foodList}>
              {activeMealItems.map((item, index) => (
                <View key={index} style={styles.foodItem}>
                  <Text style={styles.foodItemName}>{item.name}</Text>
                  <Text style={styles.foodItemCalories}>{item.calories} ккал</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyMealText}>Ще нічого не додано</Text>
          )}
        </View>

        <View style={styles.inlineAddFoodButtonContainer}>
          <TouchableOpacity 
            style={styles.addFoodButton} 
            onPress={() => navigation.navigate('Menu', { selectedMeal: activeMeal })}
          >
            <Text style={styles.addFoodButtonText}>+ Додати їжу</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDF9F2' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 200 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1C1816', textAlign: 'center', marginBottom: 20 },
  circleSection: { alignItems: 'center', marginBottom: 20 },
  circleContainer: { width: 160, height: 160, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  circleWrapper: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 10, borderColor: '#EFEFEF', borderTopColor: '#7DBA72', borderRightColor: '#7DBA72', transform: [{ rotate: '-45deg' }] },
  circleTextContainer: { alignItems: 'center', justifyContent: 'center' },
  remainingLabel: { fontSize: 14, color: '#1C1816', fontWeight: '600' },
  remainingValue: { fontSize: 40, fontWeight: 'bold', lineHeight: 45 },
  remainingUnit: { fontSize: 16, color: '#8C8C8C', fontWeight: '600' },
  eatenBurnedRow: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 15 },
  eatenText: { fontSize: 14, fontWeight: 'bold', color: '#7DBA72' },
  burnedText: { fontSize: 14, fontWeight: 'bold', color: '#EF476F' },
  macrosSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  macroContainer: { width: '30%' },
  macroTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  macroLabel: { fontSize: 12, fontWeight: 'bold', color: '#1C1816' },
  macroNumbers: { fontSize: 12, fontWeight: 'bold', color: '#A37A53' },
  progressBarBackground: { height: 6, backgroundColor: '#EAEAEA', borderRadius: 3 },
  progressBarFill: { height: '100%', borderRadius: 3 },
  tabsContainer: { marginBottom: 15 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: '#A37A53', marginRight: 10, backgroundColor: 'transparent' },
  tabButtonActive: { backgroundColor: '#A37A53' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#A37A53' },
  tabTextActive: { color: '#FFFFFF' },
  mealDetailsSection: { marginTop: 10 },
  mealDetailsTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1816', marginBottom: 10 },
  foodList: { width: '100%' },
  foodItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
  foodItemName: { fontSize: 14, fontWeight: '600', color: '#1C1816' },
  foodItemCalories: { fontSize: 14, fontWeight: 'bold', color: '#8C8C8C' },
  emptyMealText: { fontSize: 14, color: '#8C8C8C', fontStyle: 'italic' },
  inlineAddFoodButtonContainer: { marginTop: 30, marginBottom: 20 },
  addFoodButton: { backgroundColor: '#A37A53', paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
  addFoodButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});