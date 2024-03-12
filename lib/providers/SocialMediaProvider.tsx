import React from 'react'
import SocialMediaContext from '../contexts/socialMedia'
import { defaultSocials } from '@/constants/defaultSocials'


function SocialMediaProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {

  const [socials, setSocials] = React.useState<string[]>(defaultSocials);

  const addSocialMedia = (social: string) => {
    setSocials([...socials, social])
  }

  return (
    <SocialMediaContext.Provider value={{ socials, addSocialMedia, }}>
      {children}
    </SocialMediaContext.Provider>
  )
}

export default SocialMediaProvider