import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';

interface TokenItemProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  onPress: () => void;
}

const TokenItem: React.FC<TokenItemProps> = ({ name, symbol, price, change24h, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: change24h >= 0 ? 'green' : 'red' }]}>
          {change24h.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: Colors.back_ground_color,
    borderRadius: 10,
  },
  name: { color: Colors.heading, fontWeight: 'bold', fontSize: 16 },
  symbol: { color: Colors.sub_heading, fontSize: 14 },
  price: { color: Colors.heading, fontSize: 16 },
  change: { fontSize: 14, marginTop: 2 },
});

export default TokenItem;
