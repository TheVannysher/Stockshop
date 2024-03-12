import React from 'react'
import { Text } from '../Themed';
import { View } from 'react-native';
import style from './styles';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

export interface CardProps {
  title: string,
  subtitle?: string,
  children?: React.ReactNode | React.ReactNode[],
  accentColor?: string,
  badge?: React.ReactNode,
}

export default function index(props: CardProps) {
  const {
    title,
    subtitle,
    children,
    accentColor,
    badge,
  } = props;
  const theme = useColorScheme() ?? 'light';
  const styles = style(theme);
  return (
    <View style={[styles.container, { borderTopColor: accentColor || Colors[theme].tint, }]}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection: 'row', gap: 2 }}>
            {badge}
          </View>
        </View>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  )
}