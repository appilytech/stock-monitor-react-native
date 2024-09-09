import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import FindStock from "@/components/FindStock";
import { StockProps } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

import StockList from "@/components/StockList";
import { useStockQuotes } from "@/hooks/useStockQuote";

import { add } from "@/store/stock";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<StockProps | null>(null);
  const stocks = useSelector((state: RootState) => state.stocks);

  const { data: quotes } = useStockQuotes(stocks.map((stock) => stock.symbol));
  console.log(quotes);

  const addSymbolHandler = (stock: StockProps) => {
    dispatch(add(stock));
  };

  return (
    <View style={styles.container}>
      <FindStock value={selected} onAdd={addSymbolHandler} />
      <StockList stocks={quotes || stocks || []} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
