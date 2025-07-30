import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeApp from './screens/HomeApp/HomeApp.js';
import MainMenu from './screens/MainMenu/MainMenu.js';
import Vacinas from './screens/VacinasApp/Vacinas.js';
import MeuPet from './screens/MeuPet/MeuPet.js';
import Sobre from './screens/Sobre/Sobre.js';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      {/* Rotas */}
      <Stack.Navigator initialRoute="Home">
        <Stack.Screen 
          name="VaccinCard Pet+" 
          component={HomeApp} 
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontFamily: 'monospace',
              fontWeight: 'bold',
            },
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenu} 
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
            headerShown: true,
            title: 'Menu Principal',
          }}
        />
        <Stack.Screen 
          name="Vacinas" 
          component={Vacinas} 
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
            headerShown: true,
            title: 'Vacinas do Pet',
          }}
        />
        <Stack.Screen 
          name="MeuPet" 
          component={MeuPet} 
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
            headerShown: true,
            title: 'Meu Pet',
          }}
        />
        <Stack.Screen 
          name="Sobre" 
          component={Sobre} 
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            },
            headerShown: true,
            title: 'Sobre o APP',
          }}
        />
        
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

