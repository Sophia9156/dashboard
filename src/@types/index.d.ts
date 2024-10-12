type RamenUnion = "신라면" | "짜파게티" | "육개장" | "너구리";
type GenderUnion = "남" | "여";
type AgeKorUnion = "10대" | "20대" | "30대" | "40대" | "50대" | "60대";
type CountryUnion = "ALL" | "Korea" | "US" | "Japan" | "China";
type KoreaCityUnion = "Seoul" | "Busan" | "Daegu";
type USCityUnion = "New York" | "Los Angeles" | "Chicago";
type JapanCityUnion = "Tokyo" | "Osaka" | "Sapporo";
type ChinaCityUnion = "Beijing" | "Shanghai" | "Guangzhou";
type CityUnion = KoreaCityUnion | USCityUnion | JapanCityUnion | ChinaCityUnion;

type ChartData = { label: string; data: number[] };

interface BarChartData {
  labels: string[];
  datasets: ChartData[];
}

interface ICountryCityTotal {
  city: string;
  total: number;
}
