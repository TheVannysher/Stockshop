import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Search from '@/components/search';
import React, { useCallback, useState } from 'react';
import { Stock } from '@/lib/types/stock';
import getStock from '@/lib/mock/getStock';
import getRecommended from '@/lib/helpers/getRecommended';
import StockCard from '@/components/StockCard';
import { Picker } from '@react-native-picker/picker';
import Colors from '@/constants/Colors';
import TimeWindow from '@/constants/timeWindow';

export default function OverviewSrceen() {
  const [error, setError] = useState<string>('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [timeWindow, setTimeWindow] = useState<number>(TimeWindow.DAY_10.value);
  const [socialMedia, setSocialMedia] = useState<string>('instagram');

  const onChange = useCallback((input: string) => {
    const result = getStock(input, new Date(Date.now() - timeWindow), socialMedia);
    if (result) {
      setStocks(result);
      setError('');
    } else {
      setStocks([])
      setError('Stock not found');
    }
  }, [])


  return (
    <View style={styles.container}>
      <Search onChange={onChange} />
      <Picker
        style={styles.picker}
        selectedValue={timeWindow}
        onValueChange={(itemValue) =>
          setTimeWindow(itemValue)
        }>
        {Object.values(TimeWindow).map(({ label, value }) => (
          <Picker.Item label={label} value={value} />
        ))}
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue={socialMedia}
        onValueChange={(itemValue) =>
          setSocialMedia(itemValue)
        }
      >
        <Picker.Item label="instagram" value="instagram" />
        <Picker.Item label="facebook" value="facebook" />
        <Picker.Item label="Twitter" value="twitter" />
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
  picker: {
    backgroundColor: Colors.dark.secondaryBackground,
    color: Colors.dark.text,
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