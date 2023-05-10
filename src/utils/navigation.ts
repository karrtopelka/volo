import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

// export const forceNavigate = (
//   name: keyof RootStackParamList,
//   params?: ReactNavigation.RootParamList[keyof RootStackParamList],
// ) => {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// };

export const forceBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack()
  }
}
