import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  CoinRow,
  Description,
  ErrorModal,
  Flex,
  Space,
  Tab,
  Tabs,
  Title,
} from "../component";
import { ICoinDataPrice, ICoinData } from "../interface";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinInfoPrice, fetchCoins } from "../api";
import { Helmet } from "react-helmet";

export default function CoinInfo() {
  const navigate = useNavigate();
  const matchChart = useMatch("/coin-info/:id/chart");
  const matchPrice = useMatch("/coin-info/:id/price");
  const { id: paramId } = useParams<{ id: string }>();
  const { state } = useLocation();
  const [errorModalCancel, setErrorModalCancel] = useState(false);

  //fetch data=> coinInfo
  const {
    isLoading: loadingCoinInfo,
    data: coinInfo,
    error: errorCoinInfo,
  } = useQuery<ICoinData | undefined>({
    queryKey: ["coinInfo", `${paramId}`],
    queryFn: () => fetchCoinInfo(paramId),
  });

  //

  //fetch data=> coinInfoPrice
  const {
    isLoading: loadingCoinInfoPrice,
    data: coinInfoPrice,
    error: errorCoinInfoPrice,
  } = useQuery<ICoinDataPrice | undefined>({
    queryKey: ["coinInfoPrice", `${paramId}`],
    queryFn: () => fetchCoinInfoPrice(paramId),
  });
  //

  return (
    <>
      <Helmet>
        <title>{`${coinInfo?.name}- 코인트래커`}</title>
      </Helmet>
      <Flex $margin="0 0 20px">
        <Title>
          <Link to="/">{coinInfo?.name}</Link>
        </Title>
        <Title>{loadingCoinInfo ? "데이터 로딩 중..." : null}</Title>
        {!errorCoinInfo || errorModalCancel ? null : (
          <ErrorModal>
            <div className="modal-message">
              <button
                className="modal-message-cancel-btn"
                onClick={() => setErrorModalCancel(true)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <p>{`데이터 로딩에 문제가 생겼습니다. \n 다시 시도해주세요`}</p>
              <Flex>
                <button onClick={() => navigate(-1)}>뒤로가기</button>
                <button onClick={() => navigate(0)}>새로고침</button>
              </Flex>
            </div>
          </ErrorModal>
        )}
      </Flex>
      <CoinRow>
        <div>
          <p>순위</p>
          <p>{coinInfo?.rank}</p>
        </div>
        <div>
          <img
            alt=""
            src={
              coinInfo
                ? `https://cryptocurrencyliveprices.com/img/${coinInfo?.id}.png`
                : undefined
            }
          />
        </div>
        <div>
          <p>현재 가격(USD)</p>
          <p>{coinInfoPrice?.quotes.USD.price}$</p>
        </div>
      </CoinRow>
      <Description>
        <p>{coinInfo?.description}</p>
      </Description>

      <CoinRow>
        <div>
          <p>총 공급량</p>
          <p>
            {coinInfoPrice?.total_supply
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <div>
          <p>시가총액</p>
          <p>
            {coinInfoPrice?.quotes.USD.market_cap
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <div>
          <p>1일 기준 변동률</p>
          <p>{coinInfoPrice?.quotes.USD.percent_change_24h}%</p>
        </div>
      </CoinRow>

      <Tabs>
        <Tab $isActive={matchChart ? true : false}>
          <Link
            to={
              matchChart
                ? `/coin-info/${coinInfo?.id}`
                : `/coin-info/${coinInfo?.id}/chart`
            }
          >
            Chart
          </Link>
        </Tab>
        <Space></Space>
        <Tab $isActive={matchPrice ? true : false}>
          <Link
            to={
              matchPrice
                ? `/coin-info/${coinInfo?.id}`
                : `/coin-info/${coinInfo?.id}/price`
            }
          >
            Price
          </Link>
        </Tab>
      </Tabs>
      <Outlet context={{ paramId, coinName: coinInfo?.name }} />
    </>
  );
}
