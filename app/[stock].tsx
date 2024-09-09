import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text, ListItem } from "@rneui/themed";

import { useStockQuote } from "@/hooks/useStockQuote";
import { toPercent, toMillions, StockProps } from "@/app/utils";

type AttributeProps = {
  label: string;
  formatter?: (value: any) => string;
};

const attributes: {
  [key: string]: AttributeProps;
} = {
  name: {
    label: "Name",
  },
  price: {
    label: "Today's Price",
    formatter: (value) => value.toFixed(2),
  },
  changesPercentage: {
    label: "Change %",
    formatter: (value) => toPercent(value),
  },
  dayLow: { label: "Day Low", formatter: (value) => value.toFixed(2) },
  dayHigh: { label: "Day High", formatter: (value) => value.toFixed(2) },
  marketCap: { label: "Market Cap", formatter: (value) => toMillions(value) },
  eps: { label: "EPS" },
  pe: { label: "P/E Ratio" },
  sharesOutstanding: {
    label: "Shares Outstanding",
    formatter: (value) => toMillions(value),
  },
};

export default function StockDetails() {
  const { stock } = useLocalSearchParams<{ stock: string }>();

  const { data, isPending, error } = useStockQuote(stock);

  return (
    <View style={styles.container}>
      <Text style={styles.title} h4>
        {stock}
      </Text>
      {data &&
        Object.keys(attributes).map((key: string) => {
          const label = attributes[key].label;
          const formatter = attributes[key].formatter;
          const value = data[key as keyof StockProps];

          return (
            <ListItem key={key} bottomDivider>
              <ListItem.Content style={styles.content}>
                <ListItem.Title style={styles.label}>{label}</ListItem.Title>
                <ListItem.Subtitle>
                  {formatter ? formatter(value) : value}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    paddingVertical: 8,
  },
  label: {
    fontWeight: "bold"
  }
});
