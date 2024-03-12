import Colors from "@/constants/Colors"
import { StyleSheet } from "react-native"

export default function style(theme: 'light' | 'dark') {
  return StyleSheet.create({
    container: {
      borderTopWidth: 4,
      borderTopColor: Colors[theme].tint,
      padding: 10,
      borderRadius: 8,
      backgroundColor: Colors[theme].cardBackground,
      shadowColor: Colors[theme].text,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    subtitle: {
      fontSize: 16,
      fontStyle: 'italic',
      fontWeight: '400',
      opacity: 0.8,
    },
    contentContainer: {
      overflow: 'hidden',
    },
  })
}