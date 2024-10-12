import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  randomRamenData,
  randomGenderRatioData,
  randomAgeRatioData,
  randomGenderRamenData2,
  randomAgeRamenData2,
} from "@/constants/data";
import {
  getAgeRamenTotal,
  getAgeTotal,
  getCountryCityTotal,
  getGenderRamenTotal,
  getGenderTotal,
  getRamenTotal,
} from "@/utils/data";

const useHooks = () => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scanCount, setScanCount] = useState<number>(0);
  const [popularRamen, setPopularRamen] = useState<RamenUnion[]>([
    "신라면",
    "너구리",
    "짜파게티",
    "육개장",
  ]);

  useEffect(() => {
    if (!countryParam) setSearchParams({ country: "ALL" });
  }, [countryParam, setSearchParams]);

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

  return {
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
  };
};

export default useHooks;
