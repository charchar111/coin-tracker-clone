import { createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./Root";
import Home from "./screens/Home";
import CoinInfo from "./screens/coinInfo";
import Chart from "./screens/chart";
import Price from "./screens/price";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <QueryClientProvider client={queryClient}>
          <Root />
          <ReactQueryDevtools />
        </QueryClientProvider>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/coin-info/:id",
          element: <CoinInfo />,
          children: [
            {
              path: "chart",
              element: <Chart />,
            },
            {
              path: "price",
              element: <Price />,
            },
          ],
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);
export default router;
