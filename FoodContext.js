import React, { createContext, useState } from 'react';



export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [mealsData, setMealsData] = useState({
    'Сніданок': [],
    'Обід': [],
    'Вечеря': [],
    'Перекус': [],
  });
  const [dailyGoal, setDailyGoal] = useState(2000);

  const [foodDataList, setDataList] = useState([  { id: '1', name: 'Вівсянка', calories: 150, protein: 5, fat: 3, carbs: 27 },
  { id: '2', name: 'Яйця варені (2 шт)', calories: 140, protein: 12, fat: 10, carbs: 1 },
  { id: '3', name: 'Куряче філе (100 г)', calories: 165, protein: 31, fat: 3, carbs: 0 },
  { id: '4', name: 'Гречка (150 г)', calories: 180, protein: 6, fat: 1, carbs: 35 },
  { id: '5', name: 'Овочевий салат', calories: 80, protein: 2, fat: 5, carbs: 8 },
  { id: '6', name: 'Йогурт натуральний', calories: 140, protein: 8, fat: 4, carbs: 18 },
  { id: '7', name: 'Горіхи (30 г)', calories: 180, protein: 5, fat: 16, carbs: 6 },]  );

  const addFoodItem = (name, calories, protein, fat, carbs) => {
    const newFood ={
      id: Date.now().toString(),
      name: name,
      calories: calories,
      protein: protein,
      fat: fat,
      carbs: carbs,
    };
    setDataList(prev => [...prev, newFood]);
  
    }

  const toggleFood = (mealName, foodId) => {
    setMealsData(prev => {
      const currentMealFoods = prev[mealName ];
      if (currentMealFoods.includes(foodId)) {
        return { ...prev, [mealName]: currentMealFoods.filter(id => id !== foodId) };
      } else {
        return { ...prev, [mealName]: [...currentMealFoods, foodId] };
      }
    });
  };

  return (
    <FoodContext.Provider value={{ mealsData, toggleFood, foodDataList, dailyGoal, setDailyGoal, addFoodItem }}>
      {children}
    </FoodContext.Provider>
  );
};