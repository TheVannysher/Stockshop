import React, { useState } from 'react'
import { View } from '../Themed'
import style from './styles';
import { useColorScheme } from '../useColorScheme';
import { TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export interface SearchProps {
  initialValue?: string,
  onChange?: (input: string) => void;
  onSubmit?: (input: string) => void;
  displaySubmitbutton?: boolean;
}

export default function Search(props: SearchProps) {
  const {
    initialValue = '',
    onChange = () => { },
    onSubmit = () => { },
    displaySubmitbutton = true,
  } = props;

  const [input, setInput] = useState(initialValue);
  const theme = useColorScheme() ?? 'light';
  const styles = style(theme);

  return (
    <View style={styles.container}>
      <TextInput value={input} onChange={(event) => {
        onChange(event.nativeEvent.text);
        setInput(event.nativeEvent.text);
      }} style={styles.input} placeholder='Search symbol...'></TextInput>
      {displaySubmitbutton && (
        <TouchableOpacity onPress={() => onSubmit(input)}>
          <FontAwesome name="search" size={20} color="black" style={styles.submit} />
        </TouchableOpacity>
      )}
    </View>
  )
}