import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../Themed';
import Badge from '../badge';
import Card from '../card';
import { SocialMediaCount } from '@/lib/types/stock';

export interface StockCardProps {
  symbol: string;
  sellPrice: number;
  buyPrice: number;
  recommandation: string;
  date: Date;
  socials?: SocialMediaCount[],
}

export default function StockCard(props: StockCardProps) {
  const {
    symbol,
    sellPrice,
    buyPrice,
    recommandation,
    date,
    socials,
  } = props;

  const price = useMemo(() => {
    return `${parseFloat(((buyPrice + sellPrice) / 2).toString()).toFixed(2)}$`;
  }, [buyPrice, sellPrice]);

  return (
    <Card
      title={symbol}
      badge={
        <View style={styles.entry}>
          <Text style={styles.socialTitle}>current price: </Text>
          <Badge title={price} />
        </View>
      }
    >
      <View style={{ marginBottom: 10 }}>
        <View style={styles.entry}>
          <Text>ask:</Text>
          <Text>{parseFloat(buyPrice.toString()).toFixed(2)}$</Text>
        </View>
        <View style={styles.entry}>
          <Text>bid:</Text>
          <Text>{parseFloat(sellPrice.toString()).toFixed(2)}$</Text>
        </View>
        {socials && (
          <Text style={styles.socialTitle}>Mentions:</Text>
        )}
        {socials && socials.map((social) => (
          <View key={social.type} style={styles.entry}>
            <Text>{social.type}</Text>
            <Text>{parseInt(social.count.toString())}</Text>
          </View>
        ))}
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
      }}>
        <View style={styles.buttonContainer}>
          <Text>Recommandation:</Text>
          {recommandation === 'buy' && <Badge title="buy" color="#3EC300" />}
          {recommandation === 'sell' && <Badge title="sell" color="#E13700" />}
          {recommandation === 'hold' && <Badge title="hold" />}
        </View>
        <View style={styles.entry}>
          <Text>on: </Text>
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 5,
    gap: 10,
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialTitle: { padding: 5, fontWeight: 'bold' },
});