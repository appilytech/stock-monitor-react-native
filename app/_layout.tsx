import { Stack } from "expo-router";
import Providers from "@/components/Providers";

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Stock Monitor" }} />
        <Stack.Screen
          name="[stock]"
          options={{ title: "Stock Details" }}
        />
      </Stack>
    </Providers>
  );
}
