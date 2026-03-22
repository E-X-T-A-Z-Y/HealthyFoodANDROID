import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodContext } from './FoodContext';

export default function MenuScreen({ route }) {
  const { mealsData, toggleFood, foodDataList } = useContext(FoodContext);
  
  const selectedMeal = route.params?.selectedMeal || 'Сніданок';
  
  const selectedItems = mealsData[selectedMeal] || [];

  const currentMealCalories = selectedItems.reduce((sum, id) => {
    const food = foodDataList.find(item => item.id === id);
    return sum + (food ? food.calories : 0);
  }, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.headerTitle}>Меню: {selectedMeal}</Text>

        <View style={styles.listContainer}>
          {foodDataList.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <TouchableOpacity key={item.id} style={styles.foodItem} onPress={() => toggleFood(selectedMeal, item.id)}>
                <View style={styles.leftSection}>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Ionicons name="checkmark" size={16} color="#FFF" />}
                  </View>
                  <Text style={[styles.foodName, isSelected && styles.foodNameSelected]}>{item.name}</Text>
                </View>
                <Text style={styles.caloriesText}>{item.calories} ккал</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Всього за {selectedMeal.toLowerCase()}:</Text>
          <Text style={styles.totalValue}>{currentMealCalories} ккал</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6ECDF' },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 150 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1C1816', textAlign: 'center', marginBottom: 30 },
  listContainer: { marginBottom: 20 },
  foodItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 54, borderWidth: 1, borderColor: '#B6B6B6', borderRadius: 15, paddingHorizontal: 15, marginBottom: 12 },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 22, height: 22, borderWidth: 1, borderColor: '#B6B6B6', borderRadius: 6, marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkboxSelected: { backgroundColor: '#7DBA72', borderColor: '#7DBA72' },
  foodName: { fontSize: 14, fontWeight: '600', color: '#A37A53' },
  foodNameSelected: { color: '#7DBA72' },
  caloriesText: { fontSize: 14, fontWeight: 'bold', color: '#1C1816' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: 5 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1C1816' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#1C1816' }
});