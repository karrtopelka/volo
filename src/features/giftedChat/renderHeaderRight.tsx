import { View, Text } from 'native-base'
import LottieView from 'lottie-react-native'

export const renderHeaderRight = (isUserTyping: boolean, isOnline = false) => (
  <>
    {isUserTyping ? (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <LottieView
          source={require('@assets/lottie/typing.json')}
          autoPlay
          loop
          style={{ height: 50, width: 50 }}
        />
      </View>
    ) : (
      <Text style={{ color: isOnline ? 'green' : 'grey' }}>{`${
        isOnline ? 'Online' : 'Offline'
      }`}</Text>
    )}
  </>
)
