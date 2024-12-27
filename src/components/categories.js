import { View, Text,ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { categoryData } from '../constants'
//import { TouchableOpacity } from 'react-native-web';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fontScale } from 'nativewind';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated'

export default function Categories({categories ,activeCategory, handleChangeCategory}) {
  return (
    <Animated.View enterring = {FadeInDown.duration(200).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorzontal:15, marginLeft:4, marginRight:4}}> 
    {
        categories.map((cat, index)=>{
            let isActive = cat.strCategory==activeCategory;
            const activeVerification = isActive ? console.log('ButtonActif ' + cat.strCategory) :  console.log(' NaN ');
            let activeButtonClass = isActive? backgroundColor="red": "black";
            return (
                <TouchableOpacity
                    key={index}
                    onPress={()=> {handleChangeCategory(cat.strCategory)
                    }}
                    className="flex items-center space-y-1"
                    style={{flex:1, alignItems:'center', marginLeft:5, marginTop:10, marginRight:20,}}>
                      <View style={{backgroundColor: 'rgb(255,191,0)', borderRadius: 30, padding:5, activeButtonClass}}>
                        <View className={"rounded-full p-[6px]"+activeButtonClass} style={{padding:0, borderRadius:40 ,activeVerification, activeButtonClass, backgroundColor: 'white' }}>
                            <Image 
                                //source={{uri:cat.image}}
                                source={{uri:cat.strCategoryThumb}}
                                style={{width: hp(5), height: hp(5), borderRadius:50}}
                                className="rounded-full"/>
                        </View>
                      </View>
                        <Text className=" text-neutral-600" style={{fontSize: hp(1.6), color:'#718096', textAlign: 'center', fontWeight:700}}>
                            {cat.strCategory}
                        </Text>

                    </TouchableOpacity>
            );

        })
    }    
    </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  roundedFull: {
    borderRadius: 9999,
    padding: 6,
  },
  activeButton: {
   backgroundColor:'pink'
  },
  desactiveButton:{
    backgroundColor:'rgba(0,0,0,0.05)'
  }
});

// Déterminez la classe active en fonction d'une condition

{/* * *
// Dans votre composant React Native
<View style={[styles.roundedFull, styles.activeButton]}>
   Contenu de votre élément 
</View>
*/}