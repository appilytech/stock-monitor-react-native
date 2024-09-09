import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { Icon, ListItem, Text } from "@rneui/themed";
import { StockProps } from "@/app/utils";
import { useDispatch } from "react-redux";
import { remove } from "@/store/stock";
import { Link } from "expo-router";

const StockList = ({ stocks }: { stocks: StockProps[] | null }) => {
  const dispatch = useDispatch();

  const removeSymbolHandler = (stock: StockProps) => {
    dispatch(remove(stock?.symbol));
  };

  const renderItem = ({ item: stock }: { item: StockProps }) => {
    return (
      <ListItem bottomDivider>
        <Link
          href={{
            pathname: "/[stock]",
            params: { stock: stock.symbol },
          }}
          asChild
          style={{ flex: 1 }}
        >
          <Pressable>
            <ListItem.Content style={styles.container}>
              <ListItem.Title style={styles.title}>{`${stock.symbol} (${stock.name})`}</ListItem.Title>
              {stock.price && (
                <View style={styles.price}>
                  <Text>${stock?.price}</Text>
                  <Text
                    style={{
                      color: stock?.changesPercentage < 0 ? "red" : "green",
                    }}
                  >
                    {stock?.changesPercentage.toFixed(2)}%
                  </Text>
                </View>
              )}
            </ListItem.Content>
          </Pressable>
        </Link>
        <Icon
          name="delete"
          type="material-community"
          onPress={() => removeSymbolHandler(stock)}
        />
      </ListItem>
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.symbol}
      data={stocks}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
  },
  price: {
    alignItems: "center",
  },
  title: {
    fontWeight: 'bold'
  }
});

export default StockList;
