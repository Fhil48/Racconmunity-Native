import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'

const App = () => {
  return (
    <SafeAreaView className="bg-primary  h-full"> 
      <ScrollView contentContainerStyle={{ height:'100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo_home}
            className="w-[400px] h-[100px]"
            resizeMode='contain'
          />
          <Image
            source={images.cards_dos}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Sientete seguro con{' '}
              <Text className="text-secondary-200">Raccoonmunity</Text>
            </Text>
            <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode='contain'
            />
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 px-2">
              Donde la individualidad se encuentra con la conexión
            </Text>
            <CustomButton
              title="Ingresar"
              handlePress={() => router.push('/sign-in')}
              containerStyles="w-full mt-7"
            />
        </View>
        <StatusBar 
          backgroundColor='#161622'
          style='dark'
        />
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default App