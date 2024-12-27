import { View, Text,ScrollView,Image, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import StatusBar from 'expo-status-bar'
import { CachedImage } from '../helpers/image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native'
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon, ClockIcon, UsersIcon, FireIcon, Square3Stack3DIcon} from 'react-native-heroicons/solid';
import axios from 'axios'
import { useEffect } from 'react';
import Loading from '../components/Loading';
import {YoutubePlayer, YoutubeIframe} from 'react-native-youtube-iframe'
import { useCallback } from 'react';

export default function ReceipesDetails(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite]=useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(false);
    //console.log(item);

    useEffect(()=>{
        getMealData(item.idMeal);
    }, [])

    const getMealData = async (id)=>{
        try{
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          //console.log('got recipes: ', response.data);
          if (response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
          }
        }catch(err){
          console.log('error', err.message);
        }
      } 

      const ingredientsIndexes=(meal)=>{
        if(!meal) return[];
        let indexes = [];
        for (let i=1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        return indexes;
      }

      const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]){
            return match[1];
        }
        return null;
      }

      const onStateChange = useCallback((state)=>{
        if (state === 'ended'){
            setPlaying(false);
            Alert.alert("video has finished playing");
        }
      }, []);

      const togglePlaying = useCallback((state)=>{
        setPlaying((prev)=>!prev)
      }, []);

  return (
    <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{paddingBottom: 30}}>
        <View>
        <Image
            source={{uri: item.strMealThumb}}
            style={{width:wp(98), height:hp(50), borderRadius: 50, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4, margin:3}}
        />
        </View>
        {/* back button */}
        <View style={{width:'full', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingTop: 10, }}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:2, backgroundColor:'white', borderRadius: 50, marginLeft: 20}}>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#fbbf24' />
            </TouchableOpacity>
            <Text style={{fontSize: hp(3), fontWeight: 'bold'}}>
                {
                item.strMeal.length>15? item.strMeal.slice(0,15)+'...': item.strMeal
                } 
            </Text>
            <TouchableOpacity onPress={()=> setIsFavourite(!isFavourite)} style={{padding:4, backgroundColor:'white', borderRadius: 50, marginRight: 20}}>
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red": "gray"} />
            </TouchableOpacity>
        </View>
        {/* meal description */}
        {
            loading?(
                <Loading size='large'/>
            ) : (
                <View style={{paddingVertical: 4, justifyContent: 'space-between', paddingTop:8, paddingHorizontal: 4, marginTop: 10}}>
                    <View style={{paddingHorizontal: 2}}>
                        <Text style={{fontSize: hp(2), fontWeight: 'semibold'}}>
                            {meal?.strMeal}
                        </Text>
                        <Text style={{fontSize: hp(1.8), fontWeight: 200, fontStyle: 'italic'}}>
                            {meal?.strArea}
                        </Text>
                    </View>
                    <View style={{ flexDirection:'row', justifyContent:'space-around', marginTop: 15}}>
                        <View style={{backgroundColor: 'rgb(255, 191, 0)', padding: 4, borderRadius:50}}>
                            <View style={{height: hp(6.5), width: hp(6.5), backgroundColor: 'white', alignItems:'center', justifyContent:'center', flex:1, borderRadius:50}}>
                                <ClockIcon size={hp(5)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View style={{flex:1, alignItems:'center',}}>
                                <Text style={{fontSize: hp(1.8), fontWeight:'bold'}}>
                                    35 
                                </Text>
                                <Text style={{fontSize: hp(1.3), fontWeight:'semibold'}}>
                                    Mins 
                                </Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'rgb(255, 191, 0)', padding: 4, borderRadius:50}}>
                            <View style={{height: hp(6.5), width: hp(6.5), backgroundColor: 'white', alignItems:'center', justifyContent:'center', flex:1, borderRadius:50}}>
                                <UsersIcon size={hp(5)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View style={{flex:1, alignItems:'center',}}>
                                <Text style={{fontSize: hp(1.8), fontWeight:'bold'}}>
                                    03 
                                </Text>
                                <Text style={{fontSize: hp(1.3), fontWeight:'semibold'}}>
                                    Serving 
                                </Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'rgb(255, 191, 0)', padding: 4, borderRadius:50}}>
                            <View style={{height: hp(6.5), width: hp(6.5), backgroundColor: 'white', alignItems:'center', justifyContent:'center', flex:1, borderRadius:50}}>
                                <FireIcon size={hp(5)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View style={{flex:1, alignItems:'center',}}>
                                <Text style={{fontSize: hp(1.8), fontWeight:'bold'}}>
                                    103 
                                </Text>
                                <Text style={{fontSize: hp(1.3), fontWeight:'semibold'}}>
                                    Calories 
                                </Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: 'rgb(255, 191, 0)', padding: 4, borderRadius:50}}>
                            <View style={{height: hp(6.5), width: hp(6.5), backgroundColor: 'white', alignItems:'center', justifyContent:'center', flex:1, borderRadius:50}}>
                                <Square3Stack3DIcon size={hp(5)} strokeWidth={2.5} color="#525252"/>
                            </View>
                            <View style={{flex:1, alignItems:'center',}}>
                                <Text style={{fontSize: hp(1.8), fontWeight:'bold'}}>
                            
                                </Text>
                                <Text style={{fontSize: hp(1.3), fontWeight:'semibold'}}>
                                    Easy 
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* ingredients */}
                    <View style={{marginVertical: 10}}>
                        <Text style={{fontSize: hp(2.5), fontWeight:'bold'}}>
                            Ingredients
                        </Text>
                        <View style={{marginLeft:3, paddingVertical: 2}}> 
                            {
                                ingredientsIndexes(meal).map(i=>{
                                    return(
                                        <View key={i} style={{flexDirection:'row', marginHorizontal: 5, marginVertical:4}}>
                                            <View style={{height:hp(1.5), width: hp(1.5), backgroundColor: 'rgb(255,191,0)', borderRadius: 50}}/>
                                                <View style={{flexDirection:'row', paddingHorizontal: 15, alignItems:'center'}}>
                                                    <Text style={{ fontWeight:'bold', fontSize: hp(1.8)}}>{meal['strMeasure'+i]}</Text>
                                                    <Text style={{ marginLeft: 3, fontSize: hp(1.8)}}>{meal['strIngredient'+i]}</Text>
                                            </View> 
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {/* Information */} 

                    <View style={{marginVertical: 10}}>
                        <Text style={{fontSize: hp(2.5), fontWeight:'bold'}}>
                            Instruction
                        </Text>
                        <Text style={{fontSize:hp(1.6)}}>
                            {
                                meal?.strInstructions
                            }
                        </Text>
                    </View>
                    {
                        meal.strYoutube && (
                            <View style={{marginVertical: 4}}>
                                <Text style={{fontSize:hp(2.5), fontWeight:'bold'}}>
                                    Recipe Video
                                </Text>
                                <View>
                                    {/* <YoutubePlayer
                                    //videoId={getYoutubeVideoId(meal.strYoutube)}
                                    height={hp(30)}
                                    play={playing}
                                    videoId={meal.strYoutube}
                                    onChangeState={onStateChange} />
                                    <Button title = {playing?"pause" : "play"} onPress={togglePlaying}/> */}
                                    {/* <YoutubeIframe
                                    videoId={getYoutubeVideoId(meal.strYoutube)}
                                    height={hp(30)}
                                    /> */}
                                </View>
                            </View>
                        )
                    }
                </View>        
            )
        }
    </ScrollView>
  )
}