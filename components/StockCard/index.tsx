import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../Themed';
import Badge from '../badge';
import Card from '../card';
import { SocialMediaCount, Stock } from '@/lib/types/stock';
import getRecommended from '@/lib/helpers/getRecommended';

export interface StockCardProps {
  stock: Stock,
  socialMediaSelected: string,
}

export default function StockCard(props: StockCardProps) {
  const {
    stock,
    socialMediaSelected,
  } = props;
  const {
    symbol,
    buyPrice,
    sellPrice,
    socialMedia: socials,
    date,
  } = stock;

  const price = useMemo(() => {
    return `${parseFloat(((buyPrice + sellPrice) / 2).toString()).toFixed(2)}$`;
  }, [buyPrice, sellPrice]);

  const socialMedia = useMemo(() => {
    return socials?.find((social) => social.type === socialMediaSelected);
  }, [stock, socialMediaSelected]);

  return (
    <Card
      title={symbol}
      badge={
        <View style={styles.entry}>
          <Text style={styles.socialTitle}>price: </Text>
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
        {socialMedia && (
          <Text style={styles.socialTitle}>Mentions:</Text>
        )}
        {socialMedia && (
          <View key={socialMedia.type} style={styles.entry}>
            <Text>{socialMedia.type}</Text>
            <Text>{parseInt(socialMedia.count.toString())}</Text>
          </View>
        )}
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
      }}>
        <View style={styles.entry}>
          <Text>date: </Text>
          <Text>{date.toLocaleDateString()}</Text>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    gap: 10,
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialTitle: { paddingVertical: 5, fontWeight: 'bold' },
});