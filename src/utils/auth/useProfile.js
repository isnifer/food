import { useState, useEffect } from 'react'
import { getProfileInfo } from './manageProfileInfo'

export default function useProfile() {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    getProfileInfo().then(setProfile)
  }, [])

  return profile
}
