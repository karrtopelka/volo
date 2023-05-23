import { Box } from 'native-base'

export type TagProps = {
  name: string
}

export const Tag = ({ name }: TagProps): JSX.Element => (
  <Box
    _text={{
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'gray.500',
      alignSelf: 'center',
    }}
    bg={['gray.300']}
    style={{ borderRadius: 4 }}
    px={2}
    py={1}
  >
    {name}
  </Box>
)
