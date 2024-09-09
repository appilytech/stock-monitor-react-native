import React, { useState, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Icon, Text } from "@rneui/themed";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
  IAutocompleteDropdownRef,
} from "react-native-autocomplete-dropdown";

import { useStockSearch } from "@/hooks/useStockSearch";
import { StockProps } from "@/app/utils";

const FindStock = ({
  onAdd,
  value,
}: {
  value: StockProps | null;
  onAdd?: (stock: StockProps) => void;
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<StockProps | null>(null);
  const { data, isFetching, error } = useStockSearch(query);
  const dropdownController = useRef<IAutocompleteDropdownRef | null>(null);

  const selectHandler = (item: AutocompleteDropdownItem | null) => {
    const stock = data?.find((i) => i.symbol === item?.id) || null;
    setSelected(stock);
  };

  const clearHandler = () => {
    setQuery("")
  }

  const addSymbolHandler = () => {
    if (selected) {
      onAdd?.(selected);
    }
    setQuery("")
    dropdownController?.current?.clear()
  };

  return (
    <View style={styles.searchContainer}>
      <AutocompleteDropdown
        controller={(controller) => {
          dropdownController.current = controller;
        }}
        direction={Platform.select({ ios: "down" })}
        dataSet={
          data?.map((stock) => ({
            id: stock.symbol,
            title: `(${stock.symbol}) ${stock.name}`,
          })) || []
        }
        onChangeText={setQuery}
        debounce={600}
        loading={isFetching}
        useFilter={false}
        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
        showChevron={false}
        closeOnBlur={false}
        onSelectItem={selectHandler}
        onClear={clearHandler}
        emptyResultText={query ? "No Stock Symbol Found" : "Start typing to search stock symbol"}
        textInputProps={{
          placeholder: "Start typing to search stock symbol"
        }}
      />
      {error && <Text>{error.message}</Text>}
      <Icon name="add-to-list" type="entypo" onPress={addSymbolHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});

export default FindStock;
