import { ScrollView, StyleSheet, useColorScheme } from 'react-native';

import { Text, View } from '@/components/Themed';
import Search from '@/components/search';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Stock } from '@/lib/types/stock';
import getStock from '@/lib/mock/getStock';
import getRecommended from '@/lib/helpers/getRecommended';
import StockCard from '@/components/StockCard';
import TimeWindow from '@/constants/timeWindow';
import SocialMediaContext from '@/lib/contexts/socialMedia';
import Colors from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';

export default function OverviewSrceen() {
  const [error, setError] = useState<string>('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [timeWindow, setTimeWindow] = useState<number>(TimeWindow.DAY_10.value);
  const [socialMedia, setSocialMedia] = useState<string>('instagram');
  const theme = useColorScheme() ?? 'light';

  const { socials } = useContext(SocialMediaContext);

  const onChange = useCallback((input: string) => {
    const result = getStock(input, new Date(Date.now() + timeWindow), socialMedia);
    if (result) {
      setStocks(result);
      setError('');
    } else {
      setStocks([])
      setError('Stock not found');
    }
  }, [socialMedia, timeWindow])

  const pickerColorStyle = useMemo(() => ({
    backgroundColor: Colors[theme].secondaryBackground,
    color: Colors[theme].text,
  }), [theme]);

  useEffect(() => {
    const result = getStock('', new Date(Date.now() - timeWindow), socialMedia);
    if (result) setStocks(result);
  }, [timeWindow, socialMedia]);


  return (
    <View style={styles.container}>
      <Search onChange={onChange} />
      <Picker
        style={pickerColorStyle}
        selectedValue={timeWindow}
        onValueChange={(itemValue) =>
          setTimeWindow(itemValue)
        }>
        {Object.values(TimeWindow).map(({ label, value }) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>
      <Picker
        style={pickerColorStyle}
        selectedValue={socialMedia}
        onValueChange={(itemValue) =>
          setSocialMedia(itemValue)
        }
      >
        {socials.map((social) => (
          <Picker.Item key={social} label={social} value={social} />
        ))}
      </Picker>
      {error && (
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      )}
      <>
        <ScrollView>
          <View style={styles.stats}>
            {stocks && stocks.map((stock, index) => (
              <View key={`${stock.symbol}_${index}`} style={styles.cardWrapper}>
                <StockCard
                  symbol={stock.symbol}
                  buyPrice={stock.buyPrice}
                  sellPrice={stock.sellPrice}
                  recommandation={getRecommended(stock)}
                  date={stock.date}
                  socials={stock.socialMedia}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 5,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stats: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
});