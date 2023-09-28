const BASE_URL = "https://api.coinpaprika.com/v1/";

export const fetchCoins = function () {
  return fetch(`${BASE_URL}tickers?limit=10`).then((resolve) => resolve.json());
};

export const fetchCoinInfo = function (paramId: string | undefined) {
  return fetch(`${BASE_URL}coins/${paramId}`).then((resolve) => resolve.json());
};

export const fetchCoinInfoPrice = function (paramId: string | undefined) {
  return fetch(`${BASE_URL}tickers/${paramId}`).then((resolve) =>
    resolve.json()
  );
};

export const fetchCoinOHLC = function (paramId: string | undefined) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${paramId}`
  ).then((resolve) => resolve.json());
};
