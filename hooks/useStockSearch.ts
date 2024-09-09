import { useQuery } from "@tanstack/react-query";
import { StockProps } from "@/app/utils";

const fetchStocks = async (symbol = ""): Promise<StockProps[]> => {
  const API_KEY = process.env.EXPO_PUBLIC_FMP_STOCK_API_KEY;

  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${symbol}&apikey=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(
      response?.status === 429
        ? "API Request Limit Reached"
        : response.statusText || "Error Fetching Stock Data"
    );
  }
  const data = await response.json();
  return data;
};

const useStockSearch = (symbol = "") => {
  return useQuery({
    queryKey: ["stocks", symbol],
    queryFn: () => fetchStocks(symbol),
    enabled: symbol?.length > 1,
  });
};

export { useStockSearch };
