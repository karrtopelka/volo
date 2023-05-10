import { Attachment, Attachments } from '@/types'
import { AspectRatio, Image, Pressable, VStack } from 'native-base'
import { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'
import { Text } from '@ui-kitten/components'
import ImageView from 'react-native-image-viewing'
import { Dimensions } from 'react-native'

export type RequestAttachmentsProps = {
  attachments: Attachments
}

export const RequestAttachments = ({
  attachments,
}: RequestAttachmentsProps): JSX.Element => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [visible, setIsVisible] = useState(false)

  const renderPhoto = ({ item }: { item: Attachment }) => (
    <Pressable onPress={() => setIsVisible(true)}>
      <AspectRatio ratio={16 / 9}>
        <Image source={{ uri: item.fileUrl }} alt="image" />
      </AspectRatio>
    </Pressable>
  )

  const renderCurrentCount = () => (
    <Text>
      {activePhotoIndex + 1} / {attachments.length}
    </Text>
  )

  return (
    <VStack alignItems="center" space={3}>
      <Carousel
        loop={true}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height / 4}
        scrollAnimationDuration={1000}
        data={attachments}
        renderItem={({ item }) => renderPhoto({ item })}
        onSnapToItem={(index) => setActivePhotoIndex(index)}
        pagingEnabled={true}
        snapEnabled={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 70,
        }}
      />
      {renderCurrentCount()}
      <ImageView
        images={attachments?.map(({ fileUrl }) => ({ uri: fileUrl })) ?? []}
        imageIndex={activePhotoIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        onLongPress={() => undefined}
      />
    </VStack>
  )
}
