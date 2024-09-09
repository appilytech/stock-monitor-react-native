import { createTheme } from "@rneui/themed";

const theme = createTheme({
  components: {
    SearchBar: {
      lightTheme: true,
      round: true,
      containerStyle: {
        backgroundColor: "none",
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flex: 1
      },
      inputContainerStyle: {
        backgroundColor: "none",
        borderColor: "grey",
        borderWidth: 1,
        borderBottomWidth: 1,
      }
    },
  },
});

export default theme;
