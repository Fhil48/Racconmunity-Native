// EN ESTA CARPETA VAN LAS VISTAS UNA VEZ PASADA LA AUTENTICACIÓN DEL LOGIN
import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-1'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs color-gray-100`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{ 
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 68
          },
          headerShown: false,
         }}
      >
        <Tabs.Screen
          name="home"
          options={{ 
            title: 'Inicio',
            tabBarIcon:({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Inicio"
                focused={focused}
              />
            )
           }}
        />
        <Tabs.Screen
          name="calendar"
          options={{ 
            title: 'Calendar',
            tabBarIcon:({ color, focused }) => (
              <TabIcon
                icon={icons.calendar}
                color={color}
                name="Calendario"
                focused={focused}
              />
            )
           }}
        />
        <Tabs.Screen
          name="profile"
          options={{ 
            title: 'Perfil',
            tabBarIcon:({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Perfil"
                focused={focused}
              />
            )
           }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout