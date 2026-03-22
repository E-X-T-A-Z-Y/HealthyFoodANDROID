import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { FoodProvider } from './FoodContext'; //


// Імпортуємо екрани
import WelcomeScreen from './WelcomeScreen';
import PlanScreen from './PlanScreen';
import MenuScreen from './MenuScreen'; 
import DiaryScreen from './DiaryScreen'; 
import TipsScreen from './TipsScreen';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); 

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const iconSize = 32; 
          if (route.name === 'Plan') return <Ionicons name="clipboard-outline" size={iconSize} color={color} />;
          if (route.name === 'Menu') return <FontAwesome5 name="carrot" size={30} color={color} />; 
          if (route.name === 'Diary') return <Ionicons name="book-outline" size={iconSize} color={color} />;
          if (route.name === 'Tips') return <MaterialCommunityIcons name="lightbulb-on-outline" size={34} color={color} />; 
        },
        tabBarActiveTintColor: '#A37A53',
        tabBarInactiveTintColor: '#1C1816',
        
        tabBarStyle: {
          backgroundColor: '#FDF9F2',
          width: 356,
          height: 117,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: '#B6B6B6',
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: [{ translateX: -178 }], 
          elevation: 0,
          paddingBottom: 20,
          paddingTop: 15,
        },

        tabBarLabel: ({ focused, color }) => {
          let labelText;
          if (route.name === 'Plan') labelText = 'План\nхарчування';
          if (route.name === 'Menu') labelText = 'Меню';
          if (route.name === 'Diary') labelText = 'Щоденник\nкалорій';
          if (route.name === 'Tips') labelText = 'Порада\nдня';

          return (
            <Text style={{
              fontWeight: '400',
              fontSize: 10,
              textAlign: 'center',
              color: color,
              marginTop: 5,
            }}>
              {labelText}
            </Text>
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Plan" component={PlanScreen} options={{ title: 'План\nхарчування' }} />
      <Tab.Screen name="Menu" component={MenuScreen} options={{ title: 'Меню' }} />
      <Tab.Screen name="Diary" component={DiaryScreen} options={{ title: 'Щоденник\nкалорій' }} />
      <Tab.Screen name="Tips" component={TipsScreen} options={{ title: 'Порада\nдня' }} />
    </Tab.Navigator>
  );
}

export default function App() {


return (
    <FoodProvider> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </FoodProvider> 
  );
}