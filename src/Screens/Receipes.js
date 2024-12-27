import { View, Text,ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import Animated, {FadeIn, FadeInDown, FadeOut} from 'react-native-reanimated'
import Loading from '../components/Loading';
import { CachedImage } from '../helpers/image';
import {useNavigation} from '@react-navigation/native'

export default function Receipes({categories,meals}) {
  const navigation = useNavigation();
  return (
    <View style={{marginHorizontal:4, marginVertical: 20}}>
      <Text style={{fontStyle: 'normal', fontWeight: 'bold', fontSize: hp(3)}}>
        Recipes
      </Text>
      <View>
        {
          categories.length==0 || meals.length==0 ? (
            <Loading size="large" style={{marginTop: 100}}/>
          ): (
            <MasonryList
            data={meals}
            keyExtractor={(item)=>item.idMeals}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i})=><RecipeCard item={item} index={i} navigation={navigation}/>}
            // refreshing = {isLoadingNext}
            // onRefresh={()=> refetch({first:ITEM_CNT})}
            onEndReachedThreshold={0.1}
            // onEndReached={()=>loadNext(ITEM_CNT)}
          />
          )
        }
        
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation}) => {
  let isEven = index%2==0;
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
      <Pressable
        style={{width:'full', flex:1, justifyContent: 'center', marginBottom: 10, paddingLeft: isEven? 0:8, paddingRight: isEven? 8:0}}
        onPress={()=> navigation.navigate('ReceipesDetails', {...item})}
      >
        <Image
          source={{uri: item.strMealThumb}}
          style={{width:'full', height: index%3==0? hp(28):hp(35), backgroundColor: 'black', opacity: .8, borderRadius: 30}}/>
        
         {/* <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{width:'full', height: index%3==0? hp(28):hp(35), backgroundColor: 'black', opacity: .7, borderRadius: 30}}/>
   */}
        <Text style={{fontWeight:'semibold', marginLeft:2, fontSize: hp(1.5)}}>
          {
            item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
          }  
        </Text>
      </Pressable>
    </Animated.View>
  )
}