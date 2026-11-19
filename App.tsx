import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import Home from './src/screens/Home';
import Mapa from './src/screens/Mapa';
import Detalhes from './src/screens/Detalhes';
import Perfil from './src/screens/Perfil';
import Favoritos from './src/screens/Favoritos';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { BottomTabParamList, RootStackParamList } from './src/types/navigations';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function MainTabs() {
  return (
    <FavoritesProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#1E7334',
          tabBarInactiveTintColor: '#5A6E58',
          tabBarStyle: { backgroundColor: '#FFFFFF', height: 60, paddingBottom: 8 },
          tabBarIcon: ({ color, size }) => {
            const icons: Record<keyof BottomTabParamList, keyof typeof Ionicons.glyphMap> = {
              Explorar: 'leaf',
              Mapa: 'map',
              Favoritos: 'heart',
              Perfil: 'person',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Explorar" component={Home} options={{ title: 'Início' }} />
        <Tab.Screen name="Mapa" component={Mapa} />
        <Tab.Screen name="Favoritos" component={Favoritos} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </FavoritesProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="DetalhesEcoponto"
          component={Detalhes}
          options={{ presentation: 'transparentModal', animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
