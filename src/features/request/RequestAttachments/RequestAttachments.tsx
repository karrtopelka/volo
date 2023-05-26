import { Attachment, Attachments } from '@/types'
import { AspectRatio, Image, Pressable, VStack, Text } from 'native-base'
import { Dispatch, SetStateAction, useState } from 'react'
import Carousel from 'react-native-reanimated-carousel'
import ImageView from 'react-native-image-viewing'
import { Dimensions } from 'react-native'

const renderPhoto = ({
  item,
  setIsVisible,
}: {
  item: Attachment
  setIsVisible: Dispatch<SetStateAction<boolean>>
}) => (
  <Pressable onPress={() => setIsVisible(true)}>
    <AspectRatio ratio={16 / 9}>
      <Image source={{ uri: item.fileUrl }} alt="image" />
    </AspectRatio>
  </Pressable>
)

const renderCurrentCount = (
  activePhotoIndex: number,
  attachmentsLength: number
) => (
  <Text>
    {activePhotoIndex + 1} / {attachmentsLength}
  </Text>
)

export type RequestAttachmentsProps = {
  attachments: Attachments
}

export const RequestAttachments = ({
  attachments,
}: RequestAttachmentsProps): JSX.Element => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [visible, setIsVisible] = useState(false)

  return (
    <VStack alignItems="center" space={3}>
      <Carousel
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height / 4}
        scrollAnimationDuration={1000}
        data={attachments}
        renderItem={({ item }) => renderPhoto({ item, setIsVisible })}
        onSnapToItem={(index) => setActivePhotoIndex(index)}
        snapEnabled={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 70,
        }}
      />
      {renderCurrentCount(activePhotoIndex, attachments.length)}
      <ImageView
        images={attachments?.map(({ fileUrl }) => ({ uri: fileUrl })) ?? []}
        imageIndex={activePhotoIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </VStack>
  )
}
