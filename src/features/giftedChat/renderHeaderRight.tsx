import { View, Text } from 'native-base'
import { useEffect, useState } from 'react'

const AnimatedDots = () => {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return '.'
        } else {
          return prevDots + '.'
        }
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text>{dots}</Text>
    </View>
  )
}

export const renderHeaderRight = (isUserTyping: boolean, isOnline = false) => (
  <>
    {isUserTyping ? (
      <Text>
        Пише
        <AnimatedDots />
      </Text>
    ) : (
      <Text style={{ color: isOnline ? 'green' : 'grey' }}>{`${
        isOnline ? 'Online' : 'Offline'
      }`}</Text>
    )}
  </>
)
