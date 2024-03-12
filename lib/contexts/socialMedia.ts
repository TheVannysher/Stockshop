import React from "react";

export interface SocialMediaContextType {
  socials: string[];
  addSocialMedia: (social: string) => void;
}

export const SocialMediaContextDefaultValue: SocialMediaContextType =
{
  socials: [],
  addSocialMedia: (social: string) => { },
}

const SocialMediaContext = React.createContext(SocialMediaContextDefaultValue);

export default SocialMediaContext;