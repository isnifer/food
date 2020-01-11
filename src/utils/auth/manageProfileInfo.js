import AsyncStorage from '@react-native-community/async-storage'

export async function getProfileInfo() {
  return JSON.parse(await AsyncStorage.getItem('@FOOD_APP:PROFILE_INFO'))
}

export function setProfileInfo(profileInfo) {
  return AsyncStorage.setItem('@FOOD_APP:PROFILE_INFO', JSON.stringify(profileInfo))
}
