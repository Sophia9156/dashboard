import { ageLabel, genderLabel, data, data2 } from "@/constants/data";
import HorizontalBarChart from "@/components/bar-chart/HorizontalBarChart";
import useHooks from "./index.hooks";
import WorldMap from "@/components/map/WorldMap";
import DoughnutChart from "@/components/doughnut-chart/DoughnutChart";
import VerticalBarChart from "@/components/bar-chart/VerticalBarChart";
import CountrySelect from "@/components/select";
import {
  Board,
  LowerBoard,
  Wrap,
  LeftWrap,
  RightWrap,
  UpperWrap,
  MiddleWrap,
  LowerWrap,
  MapWrap,
  TabWrap,
  CountryTitleWrap,
  ChartWrap,
  DoughnutWrap,
  BarWrap,
  ChartContainer,
} from "@/components/layout";

const Dashboard: React.FC = () => {
  const {
    country,
    city,
    ramenBarData,
    genderRatio,
    ageRatio,
    genderRamenBarData,
    ageRamenBarData,
    countryCityData,
    popularRamen,
    countryParam,
    cityParam,
    searchParams,
    setSearchParams,
    tabSelected,
    setTabSelected,
    handleChange,
  } = useHooks();

  return (
    <Wrap>
      {matchMedia("screen and (max-width: 1440px)").matches ? (
        <>
          <UpperWrap>
            <Board>
              <MapWrap onClick={() => setSearchParams({ country: "ALL" })}>
                <div className="map-wrap">
                  <WorldMap popularRamen={popularRamen} />
                </div>
              </MapWrap>

              <CountrySelect
                minWidth="126px"
                country={country}
                onChange={handleChange}
              />

              <CountryTitleWrap>
                {countryParam !== "ALL" && !searchParams.has("city") && (
                  <span
                    className="go-back white"
                    onClick={() => setSearchParams({ country: "ALL" })}
                  >
                    <span className="material-symbols-outlined icon">
                      keyboard_backspace
                    </span>
                    World
                  </span>
                )}
                {searchParams.has("city") && (
                  <span
                    className="go-back white"
                    onClick={() =>
                      countryParam && setSearchParams({ country: countryParam })
                    }
                  >
                    <span className="material-symbols-outlined icon">
                      keyboard_backspace
                    </span>
                    {country} <span className="city-title">(All)</span>
                  </span>
                )}
                <h5 className="go-back">
                  {country}
                  {countryParam !== "ALL" ? (
                    searchParams.has("city") ? (
                      <span className="city-title">{`(${cityParam})`}</span>
                    ) : (
                      <span className="city-title">(All)</span>
                    )
                  ) : null}
                </h5>
              </CountryTitleWrap>
            </Board>
          </UpperWrap>
          <MiddleWrap>
            <Board>
              <TabWrap>
                <span
                  className={`tab ${tabSelected === "gender" ? "active" : ""}`}
                  onClick={() => setTabSelected("gender")}
                >
                  성별 스캔 수
                </span>
                <span
                  className={`tab ${tabSelected === "age" ? "active" : ""}`}
                  onClick={() => setTabSelected("age")}
                >
                  연령별 스캔 수
                </span>
              </TabWrap>
              {tabSelected === "gender" ? (
                <ChartContainer>
                  <ChartWrap>
                    <h5>성별 총 스캔 수</h5>
                    <DoughnutWrap>
                      <DoughnutChart labels={genderLabel} ratio={genderRatio} />
                    </DoughnutWrap>
                  </ChartWrap>
                  <ChartWrap>
                    <h5>인기라면 4종 성별 스캔 수</h5>
                    <BarWrap>
                      <VerticalBarChart
                        className="gender"
                        barData={
                          genderRamenBarData !== null
                            ? genderRamenBarData
                            : data
                        }
                      />
                    </BarWrap>
                  </ChartWrap>
                </ChartContainer>
              ) : (
                <ChartContainer>
                  <ChartWrap>
                    <h5>연령별 총 스캔 수</h5>
                    <DoughnutWrap>
                      <DoughnutChart labels={ageLabel} ratio={ageRatio} />
                    </DoughnutWrap>
                  </ChartWrap>
                  <ChartWrap>
                    <h5>인기라면 4종 연령별 스캔 수</h5>
                    <BarWrap>
                      <VerticalBarChart
                        className="age"
                        barData={
                          ageRamenBarData !== null ? ageRamenBarData : data
                        }
                      />
                    </BarWrap>
                  </ChartWrap>
                </ChartContainer>
              )}
            </Board>
          </MiddleWrap>
          <LowerWrap>
            <LowerBoard>
              <h5>
                {countryParam === "ALL"
                  ? "전체 국가 인기라면 4종 총 스캔 수"
                  : searchParams.has("city")
                  ? `${city} 인기라면 4종 총 스캔 수`
                  : `${country} 인기라면 4종 총 스캔 수`}
              </h5>
              <BarWrap>
                <HorizontalBarChart
                  barData={ramenBarData !== null ? ramenBarData : data2}
                />
              </BarWrap>
            </LowerBoard>
            <LowerBoard>
              <h5>
                {countryParam === "ALL" ? "국가별 스캔 수" : "지역별 스캔 수"}
              </h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>지역</th>
                    <th>스캔수</th>
                  </tr>
                </thead>
                <tbody>
                  {countryCityData.map(({ city, total }, key) => (
                    <tr key={key}>
                      <td>{city}</td>
                      <td>{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </LowerBoard>
          </LowerWrap>
        </>
      ) : (
        <>
          <LeftWrap>
            <UpperWrap>
              <Board>
                <MapWrap onClick={() => setSearchParams({ country: "ALL" })}>
                  <div className="map-wrap">
                    <WorldMap popularRamen={popularRamen} />
                  </div>
                </MapWrap>

                <CountrySelect
                  minWidth="156px"
                  country={country}
                  onChange={handleChange}
                />

                <CountryTitleWrap>
                  {countryParam !== "ALL" && !searchParams.has("city") && (
                    <span
                      className="go-back white"
                      onClick={() => setSearchParams({ country: "ALL" })}
                    >
                      <span className="material-symbols-outlined icon">
                        keyboard_backspace
                      </span>
                      World
                    </span>
                  )}
                  {searchParams.has("city") && (
                    <span
                      className="go-back white"
                      onClick={() =>
                        countryParam &&
                        setSearchParams({ country: countryParam })
                      }
                    >
                      <span className="material-symbols-outlined icon">
                        keyboard_backspace
                      </span>
                      {country} <span className="city-title">(All)</span>
                    </span>
                  )}
                  <h5 className="go-back">
                    {country}
                    {countryParam !== "ALL" ? (
                      searchParams.has("city") ? (
                        <span className="city-title">{`(${cityParam})`}</span>
                      ) : (
                        <span className="city-title">(All)</span>
                      )
                    ) : null}
                  </h5>
                </CountryTitleWrap>
              </Board>
            </UpperWrap>
            <LowerWrap>
              <LowerBoard>
                <h5>
                  {countryParam === "ALL"
                    ? "전체 국가 인기라면 4종 총 스캔 수"
                    : searchParams.has("city")
                    ? `${city} 인기라면 4종 총 스캔 수`
                    : `${country} 인기라면 4종 총 스캔 수`}
                </h5>
                <BarWrap>
                  <HorizontalBarChart
                    barData={ramenBarData !== null ? ramenBarData : data2}
                  />
                </BarWrap>
              </LowerBoard>
              <LowerBoard>
                <h5>
                  {countryParam === "ALL" ? "국가별 스캔 수" : "지역별 스캔 수"}
                </h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>지역</th>
                      <th>스캔수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryCityData.map(({ city, total }, key) => (
                      <tr key={key}>
                        <td>{city}</td>
                        <td>{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </LowerBoard>
            </LowerWrap>
          </LeftWrap>
          <RightWrap>
            <Board>
              <TabWrap>
                <span
                  className={`tab ${tabSelected === "gender" ? "active" : ""}`}
                  onClick={() => setTabSelected("gender")}
                >
                  성별 스캔 수
                </span>
                <span
                  className={`tab ${tabSelected === "age" ? "active" : ""}`}
                  onClick={() => setTabSelected("age")}
                >
                  연령별 스캔 수
                </span>
              </TabWrap>
              {tabSelected === "gender" ? (
                <>
                  <ChartWrap>
                    <h5>성별 총 스캔 수</h5>
                    <DoughnutWrap>
                      <DoughnutChart labels={genderLabel} ratio={genderRatio} />
                    </DoughnutWrap>
                  </ChartWrap>
                  <ChartWrap>
                    <h5>인기라면 4종 성별 스캔 수</h5>
                    <BarWrap>
                      <VerticalBarChart
                        className="gender"
                        barData={
                          genderRamenBarData !== null
                            ? genderRamenBarData
                            : data
                        }
                      />
                    </BarWrap>
                  </ChartWrap>
                </>
              ) : (
                <>
                  <ChartWrap>
                    <h5>연령별 총 스캔 수</h5>
                    <DoughnutWrap>
                      <DoughnutChart labels={ageLabel} ratio={ageRatio} />
                    </DoughnutWrap>
                  </ChartWrap>
                  <ChartWrap>
                    <h5>인기라면 4종 연령별 스캔 수</h5>
                    <BarWrap>
                      <VerticalBarChart
                        className="age"
                        barData={
                          ageRamenBarData !== null ? ageRamenBarData : data
                        }
                      />
                    </BarWrap>
                  </ChartWrap>
                </>
              )}
            </Board>
          </RightWrap>
        </>
      )}
    </Wrap>
  );
};

export default Dashboard;
