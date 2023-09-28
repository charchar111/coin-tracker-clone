import { useEffect, useState } from "react";
import { ICoinData, ICoinDataPrice } from "../interface";
import { CoinLi, CoinUl, Flex, Title } from "../component";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

export default function Home() {
  const {
    isLoading,
    error,
    data: coinsData,
  } = useQuery<ICoinData[]>({
    queryKey: ["home", "getCoinsAll"],
    queryFn: fetchCoins,
  });

  return (
    <>
      <Helmet>
        <title>코인 트래커</title>
      </Helmet>
      <Flex $margin="0 0 20px">
        <Title>
          <Link to="/">코인 트래커</Link>
        </Title>
      </Flex>
      <CoinUl>
        {isLoading ? (
          <p>데이터 로딩중 ...</p>
        ) : error ? (
          <p>데이터 로딩중 오류가 발생했습니다. 다시 접속해주세요.</p>
        ) : (
          coinsData?.map((element, index) => (
            <CoinLi key={index}>
              <Link
                to={`coin-info/${element.id}`}
                state={{ coinInfo: element }}
              >
                <img
                  alt=""
                  src={`https://cryptocurrencyliveprices.com/img/${element.id}.png`}
                />
                <span>{element.name}</span>
              </Link>
            </CoinLi>
          ))
        )}
      </CoinUl>
    </>
  );
}
