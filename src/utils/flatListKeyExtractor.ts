export const flatListKeyExtractor = <T extends object>(
  item: T,
  index: number
) => {
  if ('id' in item) {
    return Number(item.id).toString()
  }

  return index.toString()
}
