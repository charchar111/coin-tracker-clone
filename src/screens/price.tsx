import { Helmet } from "react-helmet";
import { useOutletContext } from "react-router-dom";
import { Table, TableBox } from "../component";
import { ICoinOHLC } from "../interface";
import { fetchCoinOHLC } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function Price() {
  const context = useOutletContext<{ paramId: string; coinName: string }>();
  console.log("context");
  console.log(context);

  const { isLoading, data, error } = useQuery<ICoinOHLC[] | { error: string }>({
    queryKey: ["getCoinOHLC", `${context.paramId}`],
    queryFn: () => fetchCoinOHLC(context?.paramId),
  });

  console.log(isLoading, data, error);

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

  return (
    <>
      <Helmet>
        <title>{`Price ${context.coinName}- 코인트래커`}</title>
      </Helmet>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>데이터 로딩에 문제가 생겼습니다. 다시시도해주세요.</p>
      ) : (
        <TableBox>
          <Table>
            <tr className="table-header-row">
              <th>날짜(09:00)</th>
              <th>시가</th>
              <th>고가</th>
              <th>저가</th>
              <th>종가</th>
            </tr>
            {data?.map((element) => (
              <tr>
                <td>
                  {new Date(element.time_open * 1000)
                    .toString()
                    .substring(4, 16)}
                </td>
                <td>{element.open}</td>
                <td>{element.high}</td>
                <td>{element.low}</td>
                <td>{element.close}</td>
              </tr>
            ))}
          </Table>
        </TableBox>
      )}
    </>
  );
}
