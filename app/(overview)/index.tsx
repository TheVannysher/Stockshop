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
import Chart from '@/components/chart';
import Badge from '@/components/badge';

export default function OverviewSrceen() {
  const [error, setError] = useState<string>('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [timeWindow, setTimeWindow] = useState<number>(TimeWindow.DAY_10.value);
  const [socialMedia, setSocialMedia] = useState<string>('instagram');
  const theme = useColorScheme() ?? 'light';

  const { socials } = useContext(SocialMediaContext);

  const onChange = useCallback((input: string) => {
    const result = getStock(input, timeWindow, socials);
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

  const recommandation = useMemo(() => {
    if (stocks.length > 0) {
      return getRecommended(stocks[0]);
    }
    return null;
  }, [stocks]);

  useEffect(() => {
    const result = getStock('AAPL', TimeWindow.DAY_10.value, socials)
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
        {stocks.length > 0 && (
          <>
            {recommandation && (
              <View style={styles.recommendation}>
                <View style={styles.recommendation}>
                  <Text>Recommandation (today):</Text>
                  {recommandation === 'buy' && <Badge title="buy" color="#3EC300" />}
                  {recommandation === 'sell' && <Badge title="sell" color="#E13700" />}
                  {recommandation === 'hold' && <Badge title="hold" />}
                </View>
              </View>
            )}
            <Chart data={stocks} />
            <ScrollView>
              <View style={styles.stats}>
                {stocks && stocks.map((stock, index) => (
                  <View key={`${stock.symbol}_${index}`} style={styles.cardWrapper}>
                    <StockCard
                      stock={stock}
                      socialMediaSelected={socialMedia}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </>
        )}
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
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 5,
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
});
