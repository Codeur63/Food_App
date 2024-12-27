import AsyncStrorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Animated } from 'react-native-reanimated'
import react from 'react'
import { Image } from 'react-native'

export const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri} = props;
    
    useEffect(() => {
        const getCachedImage = async() => {
            try {
                const cachedImageData = await AsyncStrorage.getItem(uri);
                if (cachedImageData){
                    setCachedSource({uri : cachedImageData});
                } else{
                    const response = await fetch(uri);
                    const imageBlod = await response.blob();
                    const base64Data = await new Promise((resolve) =>{
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlod);
                        reader.onloadend = () => resolve(reader.result);
                    })
                    await AsyncStrorage.setItem(uri, base64Data);
                    setCachedSource({uri : base64Data});
                }
            } catch (error) {
                console.log('Erro caching image',error);
                setCachedSource({uri});
            }
        };

        getCachedImage();
    }, []);

    return <Image source={cachedSource.image} {...props} />

}