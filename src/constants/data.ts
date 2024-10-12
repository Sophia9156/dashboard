export const ramenLabel: RamenUnion[] = [
  "신라면",
  "짜파게티",
  "육개장",
  "너구리",
];
export const genderLabel: GenderUnion[] = ["남", "여"];
export const ageLabel: AgeKorUnion[] = [
  "10대",
  "20대",
  "30대",
  "40대",
  "50대",
  "60대",
];

export const data: BarChartData = {
  labels: ramenLabel,
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 100, 35],
    },
    {
      label: "Dataset 2",
      data: [60, 70, 80],
    },
    {
      label: "Dataset 3",
      data: [70, 30, 85],
    },
  ],
};

export const data2: BarChartData = {
  labels: ramenLabel,
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 100, 35, 80],
    },
  ],
};

export const randomRamenData = [
  [500, 400, 300, 300, 100, -100],
  [100, 200, 1100, 200, 100, 100],
  [80, 150, 120, 1150, 1000, 100],
  [70, 160, 170, 100, 50, 1150],
];
export const randomGenderRatioData = [1.2, 1.5, 1.6, 1.4, 0.7, 1];
export const randomAgeRatioData = [1.4, 2, 1.3, 0.7, 0.6, 0.5, 1];
export const randomGenderRamenData2 = [
  [100, 200, 150, 150, 200, 100],
  [50, 150, 100, 200, 250, 70],
  [70, 150, 130, 140, 160, 60],
  [60, 120, 200, 100, 50, 50],
  [50, 90, 150, 250, 350, 80],
  [100, 200, 150, 100, 150, 50],
];
export const randomAgeRamenData2 = [
  [100, 200, 150, 150, 200, 100],
  [50, 150, 100, 200, 250, 70],
  [70, 150, 130, 140, 160, 60],
  [60, 120, 200, 100, 50, 50],
  [50, 90, 150, 250, 350, 80],
  [100, 200, 150, 100, 150, 50],
];
