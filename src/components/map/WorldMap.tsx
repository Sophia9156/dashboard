import { useEffect, useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import * as d3Dsv from "d3-dsv";
import sortBy from "lodash/sortBy";
import { useSearchParams } from "react-router-dom";

interface Props {
  popularRamen: RamenUnion[];
}

const WorldMap: React.FC<Props> = ({ popularRamen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const countryParam = searchParams.get("country");
  const cityParam = searchParams.get("city");
  const [data, setData] = useState<d3Dsv.DSVRowString<string>[]>([]);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    let fileName: string = "";

    if (countryParam === "ALL") {
      fileName = "/worldData.csv";
    } else if (countryParam === "Korea") {
      fileName = "/koreaData.csv";
    } else if (countryParam === "US") {
      fileName = "/usData.csv";
    } else if (countryParam === "Japan") {
      fileName = "/japanData.csv";
    } else if (countryParam === "China") {
      fileName = "/chinaData.csv";
    }

    csv(fileName).then((cities) => {
      const sortedCities = sortBy(cities, (o) => -o.scan);
      setMaxValue(Number(sortedCities[0].scan));
      setData(sortedCities);
    });
  }, [countryParam]);

  const popScale = useMemo(
    () => scaleLinear().domain([0, maxValue]).range([0, 5]),
    [maxValue]
  );

  const handleClick = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    if (
      name === "ALL" ||
      name === "Korea" ||
      name === "US" ||
      name === "China" ||
      name === "Japan"
    ) {
      setSearchParams({ country: name });
    } else if (countryParam) {
      setSearchParams({ country: countryParam, city: name });
    }
  };

  return (
    <ComposableMap
      projectionConfig={
        countryParam === "Korea"
          ? { rotate: [-7, 8, 6], scale: 2400, center: [127, 37] }
          : countryParam === "US"
          ? { rotate: [0, 0, 0], scale: 800, center: [-92, 34] }
          : countryParam === "China"
          ? { rotate: [0, 0, 0], scale: 600, center: [98, 29] }
          : countryParam === "Japan"
          ? { rotate: [-18, 20, 15], scale: 1800, center: [135, 36] }
          : { rotate: [-10, 0, 0] }
      }
    >
      <Geographies geography="/worldmap50m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#E6E8EB"
              stroke="#fff"
              strokeWidth="1px"
              style={{
                default: { outline: "none" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>
      {data.map(({ name, lng, lat, scan, hover }, key) => {
        return (
          <Marker
            key={name}
            coordinates={[Number(lng), Number(lat)]}
            onClick={(e) => handleClick(e, name)}
          >
            <circle
              className={hover === "able" ? "able" : ""}
              fill={
                countryParam === name || cityParam === name
                  ? "#3157FF"
                  : "#999999"
              }
              stroke={
                countryParam === name || cityParam === name
                  ? "#4C7BFF4D"
                  : "#9999994D"
              }
              strokeWidth="16px"
              r={popScale(Number(scan))}
            />
            <text
              x={-3}
              y={-70}
              style={{
                fill:
                  countryParam === name || cityParam === name
                    ? "#4C7BFF"
                    : "#444",
                font:
                  countryParam === name || cityParam === name
                    ? "bold 14px sans-serif"
                    : "14px sans-serif",
              }}
            >
              {name}
            </text>
            <image
              href={`/images/${
                countryParam === "Korea"
                  ? countryParam === name || cityParam === name
                    ? "신라면-selected"
                    : "신라면"
                  : countryParam === name || cityParam === name
                  ? `${popularRamen[key]}-selected`
                  : popularRamen[key]
              }.svg`}
              x={-30}
              y={-70}
              width="60"
              height="70"
            />
          </Marker>
        );
      })}
    </ComposableMap>
  );
};

export default WorldMap;
