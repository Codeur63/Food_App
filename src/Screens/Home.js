import { View, Text, TextInput, ScrollView, Image } from 'react-native'
import React, {useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import { useTailwind } from 'nativewind'
import {StatusBar} from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories'
import Receipes from './Receipes'
import axios from 'axios'
import { useEffect } from 'react'
//import { useEffect } from 'react/cjs/react.production.min'

export default function Home() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  }, []) 

  function handleChangeCategory(category){
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const navigate=useNavigation();
  
  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      //console.log('got categories: ', response.data);
      if (response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error', err.message);
    }
  }

  const getRecipes = async (category='Beef')=>{
    try{
      const response = await axios.get(`https:www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      //console.log('got recipes: ', response.data);
      if (response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error', err.message);
    }
  } 
  return (
    <View className=" flex-1  bg-white-400 " style={{flex:1, backgroundColor:'white'}}>
      <StatusBar style="black"/>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
        className="space-y-6 pt-14 " style={{paddingTop:20, paddingHorizontal:6}}>

          {/**avatar and bell icons */}
          <View className="flex-row justify-between items-center mb-2" style={{ flexDirection:'row', justifyContent: 'space-between', alignItems:'center', marginBottom: 3}}>
            <Image source={require('../../assets/images/jeune-bel-homme-isole-dans-poses-differentes-fond-blanc-illustration/822.jpg')} style={{height: hp(5), width: wp(5.5)}}/>
            <BellIcon size={hp(4)} color="gray"/>
          </View>

          {/* greetings and punchline*/}
          <View className=" mx-4 space-y-2 mb-2" style={{marginRight:2, marginLeft:2, marginBottom: 2, marginTop:4}}>
            <Text style={{fontSize: hp(1.7), color: '#718096'}} className="text-neutral-600">Hello, Mr Dims</Text>
            <View>
              <Text style={{fontSize: hp(3.8), color: '#718096', fontWeight:'bold'}} className="text-neutral-600">Make your own food</Text>
            </View>
            <Text style={{fontSize: hp(3.8), color: '#718096', fontWeight:'bold'}} className=" font-semiblod text-neutral-600">
              stay at <Text className="text-amber-400" style={{color:'pink'}}>home</Text>
            </Text>
          </View>

          {/**search bar */}
          <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]" style={{marginTop:20 ,marginRight:4, marginLeft:4, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderRadius: 99, backgroundColor:'rgba(0, 0, 0,.05)', padding:6}}>
            <TextInput 
              placeholder='Search any recipe'
              placeholderTextColor={'gray'}
              style={{fontSize: hp(1.7), flex:1, paddingLeft:12, marginBottom:1, fontSize:16, letterSpacing:0.04}}
              className="flex-1 text-base mb-1 pl-3 tracking-wider"/>
            <View className="bg-white rounded-full p-3" style={{backgroundColor:'white', borderRadius:9999, padding:12}}>
              <MagnifyingGlassIcon size={hp(2)} strokeWidth={3} color="gray"/>
            </View>
          </View>

          {/** categories */}
          <View>
           { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
          </View>

          {/* recipes */}
          <View>
            <Receipes meals={meals} categories={categories}/>
          </View>
        </ScrollView>
    </View>
  )
}