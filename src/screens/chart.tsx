import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinOHLC } from "../api";
import { Helmet } from "react-helmet";

import ApexChart from "react-apexcharts";
import { ICoinOHLC } from "../interface";
import { useTheme } from "styled-components";
import { useState } from "react";

export default function Chart() {
  const theme = useTheme();
  //darkTheme || lightTheme

  const context = useOutletContext<{ paramId: string; coinName: string }>();
  console.log(context);
  const { isLoading, data, error } = useQuery<ICoinOHLC[] | { error: string }>({
    queryKey: ["getCoinOHLC", `${context.paramId}`],
    queryFn: () => fetchCoinOHLC(context?.paramId),
  });

  // 용도: data의 타입 검사
  //목적
  // useQuery: getCoinOHLC의 에러 감지
  // getCoinOHLC는 에러 발생 시, 에러 data를 전송해서, 자체적인 error감지가 안됨
  // 해당 타입 검사로 에러 여부 감지
  if (!Array.isArray(data)) {
    return (
      <>
        <Helmet>
          <title>
            {isLoading
              ? `Loading ${context.coinName} Chart- 코인트래커`
              : `Error ${context.coinName} Chart- 코인트래커`}
          </title>
        </Helmet>
        <p>
          {isLoading
            ? "로딩 중"
            : "가격 데이터가 없어서 차트를 불러올 수 없습니다."}
        </p>
      </>
    );
  }
  //

  const dataTimeCloseMs = data?.map((element) =>
    new Date(element.time_close * 1000).toISOString()
  );

  const dataPriceOHLCForCandleStick = data?.map((element) => ({
    x: new Date(element.time_open * 1000),
    y: [
      parseFloat(element.open),
      parseFloat(element.high),
      parseFloat(element.low),
      parseFloat(element.close),
    ],
  }));

  return (
    <>
      <Helmet>
        <title>{`${context.coinName} Chart- 코인트래커`}</title>
      </Helmet>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>데이터 로딩에 문제가 생겼습니다. 다시시도해주세요.</p>
      ) : (
        <ApexChart
          type="candlestick"
          width="100%"
          series={[{ data: dataPriceOHLCForCandleStick! }]}
          options={{
            title: {
              text: `OHLC ${context?.coinName}`,
              style: {
                fontWeight: 300,
                color:
                  theme.mode == "darkTheme" ? theme.textColor.main : undefined,
              },
            },
            chart: {
              id: "coin OHLC",

              toolbar: { show: false },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                style: {
                  colors:
                    theme.mode == "darkTheme"
                      ? dataTimeCloseMs?.map((element) => theme.textColor.main)
                      : undefined,
                },
              },
            },
            xaxis: {
              type: "datetime",
              categories: dataTimeCloseMs,
              labels: {
                style: {
                  colors:
                    theme.mode == "darkTheme"
                      ? dataTimeCloseMs?.map((element) => theme.textColor.main)
                      : undefined,
                },
              },
            },

            colors: ["#6A82FB"],
          }}
        />
      )}
    </>
  );
}
