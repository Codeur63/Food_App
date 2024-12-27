import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import {StatusBar} from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native'
import { useEffect } from 'react';

export default function Welcome() {
  const ring1= useSharedValue(0);
  const ring2= useSharedValue(0);

  const navigation = useNavigation();
  
  useEffect(()=>{
    // Fonction à exécuter après chaque rendu
    ring1.value=0;
    ring2.value=0;
    setTimeout(()=> ring1.value=withSpring(ring1.value + hp(5)), 500);
    setTimeout(()=> ring2.value = withSpring(ring2.value + hp(5.5), 600));
    setTimeout(()=> navigation.navigate('Home', 1100))
  }, [])//Le tableau vide [] indique que l'effet ne dépend d'aucune dépendance

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-400" style={styles.Container} >
      <StatusBar style="light"/>

      {/* logo image with rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: hp(5.5) , backgroundColor:'rgba(255, 255, 255, 0.2)', borderRadius:999}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: hp(5), backgroundColor:'rgba(255, 255, 255, 0.2)r', borderRadius:999}}>
          <Image source ={require('../../assets/images/welcome-removebg-preview.png')} style={{width:hp(20), height:hp(20)}}/>
        </Animated.View>
      </Animated.View>

      {/**title and pucnhline */}
      <View className=" flex items-center space-y-2" style={styles.Container2}>
        <Text style={{fontSize: hp(7), textAlign: 'center', color:'white', letterSpacing: 4}} className="font-bold text-white tracking-widest">
          Foody
        </Text>
        <Text style={{fontSize: hp(2), textAlign: 'center', color:'white', letterSpacing: 4}}className="font-meduim text-white tracking-widest">
          Food is always right
        </Text>
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  Container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  Rounder:{
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 2
  },
  Container2:{
    //flex: 1,
    alignItems:'center',
    marginVertical: 2,
    margin:0
  },
  text:{
    font: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
