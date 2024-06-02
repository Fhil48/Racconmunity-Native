import { Text, View } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="text-3xl font-pmedium color-white">Racconmunity</Text>
      <StatusBar status="auto"/>
      <Link href="/home" className='color-gray-100'>Home</Link>
    </View>
  )
}

export default App