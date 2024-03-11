import Colors from "@/constants/Colors"
import { Theme } from "@react-navigation/native"
import { StyleSheet } from "react-native"

export default function style(theme: 'light' | 'dark') {
  return StyleSheet.create({
    container: {
      padding: 2,
      flexDirection: 'row',
      borderRadius: 100,
      backgroundColor: Colors[theme].secondaryBackground,
    },
    input: {
      flex: 1,
      padding: 5,
      fontSize: 14,
    },
    submit: {
      color: Colors[theme].tint,
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })
}
