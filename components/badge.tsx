import Colors from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export interface BadgeProps {
  title: string;
  color?: string;
}

export default function Badge(props: BadgeProps) {
  const {
    color,
    title,
  } = props;
  return (
    <View style={[styles.badge, { backgroundColor: color || Colors.light.tint, }]}>
      <Text style={styles.badgeText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 100,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});