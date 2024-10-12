import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {
  ageLabel,
  genderLabel,
  data,
  data2,
  randomRamenData,
  randomGenderRatioData,
  randomAgeRatioData,
  randomGenderRamenData2,
  randomAgeRamenData2,
} from "constants/data";
import {
  getAgeRamenTotal,
  getAgeTotal,
  getCountryCityTotal,
  getGenderRamenTotal,
  getGenderTotal,
  getRamenTotal,
} from "utils/data";
import WorldMap from "components/map/WorldMap";
import DoughnutChart from "components/doughnut-chart/DoughnutChart";
import VerticalBarChart from "components/bar-chart/VerticalBarChart";
import HorizontalBarChart from "components/bar-chart/HorizontalBarChart";

const baseURI = process.env.REACT_APP_BASIC_URI;

const Dashboard: React.FC = () => {
  const [country, setCountry] = useState<CountryUnion>("ALL");
  const [city, setCity] = useState<CityUnion | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const countryParam = searchParams.get("country");
  const cityParam = searchParams.get("city");
  const [tabSelected, setTabSelected] = useState<"gender" | "age">("gender");

  const [ramenBarData, setRamenBarData] = useState<BarChartData | null>(null);
  const [genderRatio, setGenderRatio] = useState<number[]>([]);
  const [ageRatio, setAgeRatio] = useState<number[]>([]);
  const [genderRamenBarData, setGenderRamenBarData] =
    useState<BarChartData | null>(null);
  const [ageRamenBarData, setAgeRamenBarData] = useState<BarChartData | null>(
    null
  );
  const [countryCityData, setCountryCityData] = useState<ICountryCityTotal[]>(
    []
  );
  const [scanCount, setScanCount] = useState<number>(0);
  const [popularRamen, setPopularRamen] = useState<RamenUnion[]>([
    "신라면",
    "너구리",
    "짜파게티",
    "육개장",
  ]);

  useEffect(() => {
    let cnt = 0;
    const getMovingData = () => {
      if (countryParam === "Korea") {
        const countryCity = getCountryCityTotal(country);
        countryCity[0].total += scanCount;
        setCountryCityData(countryCity);

        if (
          cityParam === "Seoul" ||
          cityParam === null ||
          cityParam === undefined
        ) {
          const ramen = getRamenTotal(country, city);
          ramen.datasets[0].data[0] += scanCount;
          setRamenBarData(ramen);
          const gender = getGenderTotal(country, city);
          gender[0] += scanCount;
          setGenderRatio(gender);
          const age = getAgeTotal(country, city);
          age[3] += scanCount;
          setAgeRatio(age);
          const genderRamen = getGenderRamenTotal(country, city);
          genderRamen.datasets[0].data[0] += scanCount;
          setGenderRamenBarData(genderRamen);
          const ageRamen = getAgeRamenTotal(country, city);
          ageRamen.datasets[3].data[0] += scanCount;
          setAgeRamenBarData(ageRamen);
        } else {
          const ramen = getRamenTotal(country, city);
          setRamenBarData(ramen);
          const gender = getGenderTotal(country, city);
          setGenderRatio(gender);
          const age = getAgeTotal(country, city);
          setAgeRatio(age);
          const genderRamen = getGenderRamenTotal(country, city);
          setGenderRamenBarData(genderRamen);
          const ageRamen = getAgeRamenTotal(country, city);
          setAgeRamenBarData(ageRamen);
        }
      } else {
        const ramen = getRamenTotal(country, city);
        ramen.datasets[0].data[0] += randomRamenData[0][cnt % 6];
        ramen.datasets[0].data[1] += randomRamenData[1][cnt % 6];
        ramen.datasets[0].data[2] += randomRamenData[2][cnt % 6];
        ramen.datasets[0].data[3] += randomRamenData[3][cnt % 6];
        setRamenBarData(ramen);

        if (country === "ALL") {
          const krRamen = getRamenTotal("Korea", null);
          const usRamen = getRamenTotal("US", null);
          const jpRamen = getRamenTotal("Japan", null);
          const cnRamen = getRamenTotal("China", null);
          krRamen.datasets[0].data[0] += randomRamenData[0][cnt % 6];
          krRamen.datasets[0].data[1] += randomRamenData[1][cnt % 6];
          krRamen.datasets[0].data[2] += randomRamenData[2][cnt % 6];
          krRamen.datasets[0].data[3] += randomRamenData[3][cnt % 6];
          usRamen.datasets[0].data[0] += randomRamenData[1][cnt % 6];
          usRamen.datasets[0].data[1] += randomRamenData[2][cnt % 6];
          usRamen.datasets[0].data[2] += randomRamenData[3][cnt % 6];
          usRamen.datasets[0].data[3] += randomRamenData[0][cnt % 6];
          jpRamen.datasets[0].data[0] += randomRamenData[2][cnt % 6];
          jpRamen.datasets[0].data[1] += randomRamenData[3][cnt % 6];
          jpRamen.datasets[0].data[2] += randomRamenData[0][cnt % 6];
          jpRamen.datasets[0].data[3] += randomRamenData[1][cnt % 6];
          cnRamen.datasets[0].data[0] += randomRamenData[3][cnt % 6];
          cnRamen.datasets[0].data[1] += randomRamenData[2][cnt % 6];
          cnRamen.datasets[0].data[2] += randomRamenData[1][cnt % 6];
          cnRamen.datasets[0].data[3] += randomRamenData[0][cnt % 6];
          const krMax = Math.max.apply(null, krRamen.datasets[0].data);
          const usMax = Math.max.apply(null, usRamen.datasets[0].data);
          const jpMax = Math.max.apply(null, jpRamen.datasets[0].data);
          const cnMax = Math.max.apply(null, cnRamen.datasets[0].data);
          const krMaxIndex = krRamen.datasets[0].data.indexOf(krMax);
          const usMaxIndex = usRamen.datasets[0].data.indexOf(usMax);
          const jpMaxIndex = jpRamen.datasets[0].data.indexOf(jpMax);
          const cnMaxIndex = cnRamen.datasets[0].data.indexOf(cnMax);
          const krPopularRamen = krRamen.labels[krMaxIndex] as RamenUnion;
          const usPopularRamen = usRamen.labels[usMaxIndex] as RamenUnion;
          const jpPopularRamen = jpRamen.labels[jpMaxIndex] as RamenUnion;
          const cnPopularRamen = cnRamen.labels[cnMaxIndex] as RamenUnion;
          setPopularRamen([
            krPopularRamen,
            usPopularRamen,
            jpPopularRamen,
            cnPopularRamen,
          ]);
        } else {
          let city1Ramen, city2Ramen, city3Ramen;
          if (country === "US") {
            city1Ramen = getRamenTotal("US", "New York");
            city2Ramen = getRamenTotal("US", "Los Angeles");
            city3Ramen = getRamenTotal("US", "Chicago");
          } else if (country === "Japan") {
            city1Ramen = getRamenTotal("Japan", "Tokyo");
            city2Ramen = getRamenTotal("Japan", "Osaka");
            city3Ramen = getRamenTotal("Japan", "Sapporo");
          } else if (country === "China") {
            city1Ramen = getRamenTotal("China", "Beijing");
            city2Ramen = getRamenTotal("China", "Shanghai");
            city3Ramen = getRamenTotal("China", "Guangzhou");
          }

          if (city1Ramen && city2Ramen && city3Ramen) {
            city1Ramen.datasets[0].data[0] += randomRamenData[0][cnt % 6];
            city1Ramen.datasets[0].data[1] += randomRamenData[1][cnt % 6];
            city1Ramen.datasets[0].data[2] += randomRamenData[2][cnt % 6];
            city1Ramen.datasets[0].data[3] += randomRamenData[3][cnt % 6];
            city2Ramen.datasets[0].data[0] += randomRamenData[1][cnt % 6];
            city2Ramen.datasets[0].data[1] += randomRamenData[2][cnt % 6];
            city2Ramen.datasets[0].data[2] += randomRamenData[3][cnt % 6];
            city2Ramen.datasets[0].data[3] += randomRamenData[0][cnt % 6];
            city3Ramen.datasets[0].data[0] += randomRamenData[2][cnt % 6];
            city3Ramen.datasets[0].data[1] += randomRamenData[3][cnt % 6];
            city3Ramen.datasets[0].data[2] += randomRamenData[1][cnt % 6];
            city3Ramen.datasets[0].data[3] += randomRamenData[0][cnt % 6];
            const city1Max = Math.max.apply(null, city1Ramen.datasets[0].data);
            const city2Max = Math.max.apply(null, city2Ramen.datasets[0].data);
            const city3Max = Math.max.apply(null, city3Ramen.datasets[0].data);
            const city1MaxIndex = city1Ramen.datasets[0].data.indexOf(city1Max);
            const city2MaxIndex = city2Ramen.datasets[0].data.indexOf(city2Max);
            const city3MaxIndex = city3Ramen.datasets[0].data.indexOf(city3Max);
            const city1PopularRamen = city1Ramen.labels[
              city1MaxIndex
            ] as RamenUnion;
            const city2PopularRamen = city2Ramen.labels[
              city2MaxIndex
            ] as RamenUnion;
            const city3PopularRamen = city3Ramen.labels[
              city3MaxIndex
            ] as RamenUnion;
            setPopularRamen([
              city1PopularRamen,
              city2PopularRamen,
              city3PopularRamen,
              "신라면",
            ]);
          }
        }

        const gender = getGenderTotal(country, city);
        gender[0] *= randomGenderRatioData[cnt % 6];
        gender[0] = Math.floor(gender[0]);
        setGenderRatio(gender);

        cnt++;

        const age = getAgeTotal(country, city);
        age[2] *= randomAgeRatioData[cnt % 6];
        age[2] = Math.floor(age[2]);
        setAgeRatio(age);

        const genderRamen = getGenderRamenTotal(country, city);
        genderRamen.datasets[0].data[0] += randomGenderRamenData2[1][cnt % 6];
        genderRamen.datasets[0].data[1] += randomGenderRamenData2[2][cnt % 6];
        genderRamen.datasets[0].data[2] += randomGenderRamenData2[3][cnt % 6];
        genderRamen.datasets[0].data[3] += randomGenderRamenData2[4][cnt % 6];
        setGenderRamenBarData(genderRamen);

        const ageRamen = getAgeRamenTotal(country, city);
        ageRamen.datasets[0].data[0] += randomAgeRamenData2[0][cnt % 6];
        ageRamen.datasets[0].data[1] += randomAgeRamenData2[1][cnt % 6];
        ageRamen.datasets[0].data[2] += randomAgeRamenData2[2][cnt % 6];
        ageRamen.datasets[0].data[3] += randomAgeRamenData2[3][cnt % 6];
        ageRamen.datasets[0].data[4] += randomAgeRamenData2[4][cnt % 6];
        ageRamen.datasets[0].data[5] += randomAgeRamenData2[5][cnt % 6];
        setAgeRamenBarData(ageRamen);

        const countryCity = getCountryCityTotal(country);
        countryCity[0].total += randomRamenData[0][cnt % 6];
        countryCity[1].total += randomRamenData[1][cnt % 6];
        countryCity[2].total += randomRamenData[2][cnt % 6];
        setCountryCityData(countryCity);
      }
    };

    const interval = setInterval(getMovingData, 1000);
    return () => clearInterval(interval);
  }, [city, cityParam, country, countryParam, scanCount, searchParams]);

  const handleChange = (event: SelectChangeEvent<CountryUnion>) => {
    setCountry(event.target.value as CountryUnion);
    setSearchParams({ country: event.target.value });
  };

  useEffect(() => {
    if (countryParam) setCountry(countryParam as CountryUnion);
    if (cityParam) setCity(cityParam as CityUnion);
    else setCity(null);
  }, [cityParam, countryParam, searchParams]);

  const getScanData = useCallback(async () => {
    try {
      const data = await axios.get(
        `${baseURI}/adm/v1/products/nongshimScanList`
      );
      setScanCount(data.data.data * 100);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getScanData(), 2000);
    return () => clearInterval(interval);
  }, [getScanData]);

  return (
    <main className="dashboard-container">
      {matchMedia("screen and (max-width: 1440px)").matches ? (
        <>
          <div className="upper-side">
            <div className="board map">
              <div
                className="map-container"
                onClick={() => setSearchParams({ country: "ALL" })}
              >
                <div className="map-wrap">
                  <WorldMap popularRamen={popularRamen} />
                </div>
              </div>
              <div className="select-container">
                <Box sx={{ minWidth: "126px" }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="country"
                      id="country"
                      value={country}
                      onChange={handleChange}
                    >
                      <MenuItem value="ALL">ALL</MenuItem>
                      <MenuItem value="Korea">Korea</MenuItem>
                      <MenuItem value="US">US</MenuItem>
                      <MenuItem value="China">China</MenuItem>
                      <MenuItem value="Japan">Japan</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className="country-title">
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
              </div>
            </div>
          </div>
          <div className="middle-side">
            <div className="board">
              <div className="tab-container">
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
              </div>
              {tabSelected === "gender" ? (
                <div className="chart-wrap">
                  <div className="chart-container">
                    <h5>성별 총 스캔 수</h5>
                    <div className="doughnut-container">
                      <DoughnutChart labels={genderLabel} ratio={genderRatio} />
                    </div>
                  </div>
                  <div className="chart-container">
                    <h5>인기라면 4종 성별 스캔 수</h5>
                    <div className="barChart-container">
                      <VerticalBarChart
                        className="gender"
                        barData={
                          genderRamenBarData !== null
                            ? genderRamenBarData
                            : data
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chart-wrap">
                  <div className="chart-container">
                    <h5>연령별 총 스캔 수</h5>
                    <div className="doughnut-container">
                      <DoughnutChart labels={ageLabel} ratio={ageRatio} />
                    </div>
                  </div>
                  <div className="chart-container">
                    <h5>인기라면 4종 연령별 스캔 수</h5>
                    <div className="barChart-container">
                      <VerticalBarChart
                        className="age"
                        barData={
                          ageRamenBarData !== null ? ageRamenBarData : data
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lower-side">
            <div className="board">
              <h5>
                {countryParam === "ALL"
                  ? "전체 국가 인기라면 4종 총 스캔 수"
                  : searchParams.has("city")
                  ? `${city} 인기라면 4종 총 스캔 수`
                  : `${country} 인기라면 4종 총 스캔 수`}
              </h5>
              <div className="barChart-container">
                <HorizontalBarChart
                  barData={ramenBarData !== null ? ramenBarData : data2}
                />
              </div>
            </div>
            <div className="board">
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
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="left-side">
            <div className="upper-side">
              <div className="board map">
                <div
                  className="map-container"
                  onClick={() => setSearchParams({ country: "ALL" })}
                >
                  <div className="map-wrap">
                    <WorldMap popularRamen={popularRamen} />
                  </div>
                </div>
                <div className="select-container">
                  <Box sx={{ minWidth: "156px" }}>
                    <FormControl fullWidth>
                      <Select
                        labelId="country"
                        id="country"
                        value={country}
                        onChange={handleChange}
                      >
                        <MenuItem value="ALL">ALL</MenuItem>
                        <MenuItem value="Korea">Korea</MenuItem>
                        <MenuItem value="US">US</MenuItem>
                        <MenuItem value="China">China</MenuItem>
                        <MenuItem value="Japan">Japan</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className="country-title">
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
                </div>
              </div>
            </div>
            <div className="lower-side">
              <div className="board">
                <h5>
                  {countryParam === "ALL"
                    ? "전체 국가 인기라면 4종 총 스캔 수"
                    : searchParams.has("city")
                    ? `${city} 인기라면 4종 총 스캔 수`
                    : `${country} 인기라면 4종 총 스캔 수`}
                </h5>
                <div className="barChart-container">
                  <HorizontalBarChart
                    barData={ramenBarData !== null ? ramenBarData : data2}
                  />
                </div>
              </div>
              <div className="board">
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
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="board">
              <div className="tab-container">
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
              </div>
              {tabSelected === "gender" ? (
                <>
                  <div className="chart-container">
                    <h5>성별 총 스캔 수</h5>
                    <div className="doughnut-container">
                      <DoughnutChart labels={genderLabel} ratio={genderRatio} />
                    </div>
                  </div>
                  <div className="chart-container">
                    <h5>인기라면 4종 성별 스캔 수</h5>
                    <div className="barChart-container">
                      <VerticalBarChart
                        className="gender"
                        barData={
                          genderRamenBarData !== null
                            ? genderRamenBarData
                            : data
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="chart-container">
                    <h5>연령별 총 스캔 수</h5>
                    <div className="doughnut-container">
                      <DoughnutChart labels={ageLabel} ratio={ageRatio} />
                    </div>
                  </div>
                  <div className="chart-container">
                    <h5>인기라면 4종 연령별 스캔 수</h5>
                    <div className="barChart-container">
                      <VerticalBarChart
                        className="age"
                        barData={
                          ageRamenBarData !== null ? ageRamenBarData : data
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
