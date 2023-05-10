import { Box } from 'native-base'

export type TagProps = {
  name: string
}

export const Tag = ({ name }: TagProps): JSX.Element => (
  <Box
    _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'warmGray.50',
      letterSpacing: 'lg',
      alignSelf: 'center',
    }}
    bg={['gray.400']}
    style={{ borderRadius: 4 }}
    px={2}
    py={1}
  >
    {name}
  </Box>
)
