import AsyncStorage from '@react-native-community/async-storage'

export async function getProfileInfo() {
  const profileInfo = await AsyncStorage.getItem('@FOOD_APP:PROFILE_INFO')

  return JSON.parse(profileInfo)
}

export function setProfileInfo(profileInfo) {
  return AsyncStorage.setItem('@FOOD_APP:PROFILE_INFO', JSON.stringify(profileInfo))
}
