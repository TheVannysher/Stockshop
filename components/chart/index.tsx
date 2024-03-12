import Colors from '@/constants/Colors'
import { Stock } from '@/lib/types/stock'
import React, { useMemo } from 'react'
import { Dimensions, useColorScheme } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

export interface ChartProps {
  data: Stock[]
}


export default function Chart({ data }: ChartProps) {
  const theme = useColorScheme() ?? 'light';
  const datasets = useMemo(() => {
    return [{ data: data.map((stock) => (stock.buyPrice + stock.sellPrice) / 2).splice(0, 5).reverse() }]
  }, [data]);
  const labels = useMemo(() => {
    return data.map((stock) => stock.date.toLocaleDateString()).splice(0, 5).reverse();
  }, [data]);
  if (data.length === 0 || datasets[0].data.length === 0) return null;
  return (
    <LineChart
      data={{
        labels,
        datasets,
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      yAxisLabel="$"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: Colors[theme].secondaryBackground,
        backgroundGradientFrom: Colors[theme].secondaryBackground,
        backgroundGradientTo: Colors[theme].secondaryBackground,
        decimalPlaces: 2,
        color: (opacity = 1) => Colors[theme].tint,
        labelColor: (opacity = 1) => Colors[theme].text,
        style: {
          borderRadius: 12
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: Colors[theme].text
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  )
}