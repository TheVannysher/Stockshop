import { Button, StyleSheet, TextInput, useColorScheme } from 'react-native';

import { View } from '@/components/Themed';
import { useCallback, useContext, useEffect, useState } from 'react';
import SocialMediaContext from '@/lib/contexts/socialMedia';
import Colors from '@/constants/Colors';

export default function SettingScreen() {

  const theme = useColorScheme() ?? 'light';
  const { socials, addSocialMedia } = useContext(SocialMediaContext);

  const [socialMedia, setSocialMedia] = useState<string>('');
  const [invalid, setInvalid] = useState<boolean>(false);

  const onSubmit = useCallback(() => {
    addSocialMedia(socialMedia);
    setSocialMedia('');
  }, [socialMedia]);

  const onChange = useCallback((input: string) => {
    setSocialMedia(input);
    if (socials.includes(input) || input === '' || !input.match(/[^a-zA-Z0-9]/)) {
      setInvalid(true);
    }
  }, [socialMedia, socials]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: Colors[theme].text }]}
        placeholderTextColor={Colors[theme].tabIconDefault}
        placeholder="Enter social media"
        onChangeText={(text) => onChange(text)}
        value={socialMedia}
      />
      <Button disabled={invalid} title="Add social media" onPress={() => onSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    padding: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
