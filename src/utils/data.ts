import json from "../data.json";
import { ramenLabel, genderLabel, ageLabel } from "constants/data";

export const getRamenTotal: (
  countryParam: CountryUnion,
  cityParam: CityUnion | null
) => BarChartData = (countryParam, cityParam) => {
  const obj: { labels?: string[]; datasets?: ChartData[] } = {};
  const arr: number[] = [];
  if (countryParam === "ALL") {
    ramenLabel.forEach((ramenLabel) => {
      let total = 0;
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === ramenLabel)
            ?.gender.forEach((gender) =>
              gender.age.forEach((age) => (total += age.total))
            )
        )
      );
      arr.push(total);
    });
    obj.labels = ramenLabel;
    obj.datasets = [
      {
        label: "스캔 수",
        data: arr,
      },
    ];
  } else {
    if (!cityParam) {
      ramenLabel.forEach((ramenLabel) => {
        let total = 0;
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === ramenLabel)
              ?.gender.forEach((gender) =>
                gender.age.forEach((age) => (total += age.total))
              )
          );
        arr.push(total);
      });
      obj.labels = ramenLabel;
      obj.datasets = [
        {
          label: "스캔 수",
          data: arr,
        },
      ];
    } else {
      ramenLabel.forEach((ramenLabel) => {
        let total = 0;
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === ramenLabel)
          ?.gender.forEach((gender) =>
            gender.age.forEach((age) => (total += age.total))
          );
        arr.push(total);
      });
      obj.labels = ramenLabel;
      obj.datasets = [
        {
          label: "스캔 수",
          data: arr,
        },
      ];
    }
  }

  return obj as BarChartData;
};

export const getGenderTotal: (
  countryParam: CountryUnion,
  cityParam: CityUnion | null
) => number[] = (countryParam, cityParam) => {
  const arr: number[] = [];
  if (countryParam === "ALL") {
    genderLabel.forEach((genderLabel) => {
      let total = 0;
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen.forEach((ramen) =>
            ramen.gender
              .find((data) => data.genderName === genderLabel)
              ?.age.forEach((age) => (total += age.total))
          )
        )
      );
      arr.push(total);
    });
  } else {
    if (!cityParam) {
      genderLabel.forEach((genderLabel) => {
        let total = 0;
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen.forEach((ramen) =>
              ramen.gender
                .find((gender) => gender.genderName === genderLabel)
                ?.age.forEach((age) => (total += age.total))
            )
          );
        arr.push(total);
      });
    } else {
      genderLabel.forEach((genderLabel) => {
        let total = 0;
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.forEach((ramen) =>
            ramen.gender
              .find((gender) => gender.genderName === genderLabel)
              ?.age.forEach((age) => (total += age.total))
          );
        arr.push(total);
      });
    }
  }

  return arr;
};

export const getAgeTotal: (
  countryParam: CountryUnion,
  cityParam: CityUnion | null
) => number[] = (countryParam, cityParam) => {
  const arr: number[] = [];
  if (countryParam === "ALL") {
    ageLabel.forEach((ageLabel) => {
      let total = 0;
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen.forEach((ramen) =>
            ramen.gender.forEach(
              (gender) =>
                (total += Number(
                  gender.age.find((data) => data.ageTitle === ageLabel)?.total
                ))
            )
          )
        )
      );
      arr.push(total);
    });
  } else {
    if (!cityParam) {
      ageLabel.forEach((ageLabel) => {
        let total = 0;
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen.forEach((ramen) =>
              ramen.gender.forEach(
                (gender) =>
                  (total += Number(
                    gender.age.find((age) => age.ageTitle === ageLabel)?.total
                  ))
              )
            )
          );
        arr.push(total);
      });
    } else {
      ageLabel.forEach((ageLabel) => {
        let total = 0;
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.forEach((ramen) =>
            ramen.gender.forEach(
              (gender) =>
                (total += Number(
                  gender.age.find((age) => age.ageTitle === ageLabel)?.total
                ))
            )
          );
        arr.push(total);
      });
    }
  }

  return arr;
};

export const getGenderRamenTotal: (
  countryParam: CountryUnion,
  cityParam: CityUnion | null
) => BarChartData = (countryParam, cityParam) => {
  const obj: { labels?: string[]; datasets?: ChartData[] } = {};
  const arr: ChartData[] = [];
  if (countryParam === "ALL") {
    genderLabel.forEach((genderLabel) => {
      let shinSum = 0;
      let jjaSum = 0;
      let yukSum = 0;
      let neoSum = 0;

      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "신라면")
            ?.gender.find((gender) => gender.genderName === genderLabel)
            ?.age.forEach((age) => (shinSum += age.total))
        )
      );
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "짜파게티")
            ?.gender.find((gender) => gender.genderName === genderLabel)
            ?.age.forEach((age) => (jjaSum += age.total))
        )
      );
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "육개장")
            ?.gender.find((gender) => gender.genderName === genderLabel)
            ?.age.forEach((age) => (yukSum += age.total))
        )
      );
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "너구리")
            ?.gender.find((gender) => gender.genderName === genderLabel)
            ?.age.forEach((age) => (neoSum += age.total))
        )
      );

      arr.push({
        label: genderLabel,
        data: [shinSum, jjaSum, yukSum, neoSum],
      });
    });
  } else {
    if (!cityParam) {
      genderLabel.forEach((genderLabel) => {
        let shinSum = 0;
        let jjaSum = 0;
        let yukSum = 0;
        let neoSum = 0;

        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "신라면")
              ?.gender.find((gender) => gender.genderName === genderLabel)
              ?.age.forEach((age) => (shinSum += age.total))
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "짜파게티")
              ?.gender.find((gender) => gender.genderName === genderLabel)
              ?.age.forEach((age) => (jjaSum += age.total))
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "육개장")
              ?.gender.find((gender) => gender.genderName === genderLabel)
              ?.age.forEach((age) => (yukSum += age.total))
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "너구리")
              ?.gender.find((gender) => gender.genderName === genderLabel)
              ?.age.forEach((age) => (neoSum += age.total))
          );

        arr.push({
          label: genderLabel,
          data: [shinSum, jjaSum, yukSum, neoSum],
        });
      });
    } else {
      genderLabel.forEach((genderLabel) => {
        let shinSum = 0;
        let jjaSum = 0;
        let yukSum = 0;
        let neoSum = 0;

        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "신라면")
          ?.gender.find((gender) => gender.genderName === genderLabel)
          ?.age.forEach((age) => (shinSum += age.total));
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "짜파게티")
          ?.gender.find((gender) => gender.genderName === genderLabel)
          ?.age.forEach((age) => (jjaSum += age.total));
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "육개장")
          ?.gender.find((gender) => gender.genderName === genderLabel)
          ?.age.forEach((age) => (yukSum += age.total));
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "너구리")
          ?.gender.find((gender) => gender.genderName === genderLabel)
          ?.age.forEach((age) => (neoSum += age.total));

        arr.push({
          label: genderLabel,
          data: [shinSum, jjaSum, yukSum, neoSum],
        });
      });
    }
  }
  obj.labels = ramenLabel;
  obj.datasets = arr;

  return obj as BarChartData;
};

export const getAgeRamenTotal: (
  countryParam: CountryUnion,
  cityParam: CityUnion | null
) => BarChartData = (countryParam, cityParam) => {
  const obj: { labels?: string[]; datasets?: ChartData[] } = {};
  const arr: ChartData[] = [];
  if (countryParam === "ALL") {
    ageLabel.forEach((ageLabel) => {
      let shinSum = 0;
      let jjaSum = 0;
      let yukSum = 0;
      let neoSum = 0;

      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "신라면")
            ?.gender.forEach(
              (gender) =>
                (shinSum += Number(
                  gender.age.find((age) => age.ageTitle === ageLabel)?.total
                ))
            )
        )
      );
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "짜파게티")
            ?.gender.forEach(
              (gender) =>
                (jjaSum += Number(
                  gender.age.find((age) => age.ageTitle === ageLabel)?.total
                ))
            )
        )
      );
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "육개장")
            ?.gender.forEach(
              (gender) =>
                (yukSum += Number(
                  gender.age.find((age) => age.ageTitle === ageLabel)?.total
                ))
            )
        )
      );
      json.country.forEach((country) =>
        country.city.forEach((city) =>
          city.ramen
            .find((ramen) => ramen.ramenName === "너구리")
            ?.gender.forEach(
              (gender) =>
                (neoSum += Number(
                  gender.age.find((age) => age.ageTitle === ageLabel)?.total
                ))
            )
        )
      );

      arr.push({
        label: ageLabel,
        data: [shinSum, jjaSum, yukSum, neoSum],
      });
    });
  } else {
    if (!cityParam) {
      ageLabel.forEach((ageLabel) => {
        let shinSum = 0;
        let jjaSum = 0;
        let yukSum = 0;
        let neoSum = 0;

        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "신라면")
              ?.gender.forEach(
                (gender) =>
                  (shinSum += Number(
                    gender.age.find((age) => age.ageTitle === ageLabel)?.total
                  ))
              )
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "짜파게티")
              ?.gender.forEach(
                (gender) =>
                  (jjaSum += Number(
                    gender.age.find((age) => age.ageTitle === ageLabel)?.total
                  ))
              )
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "육개장")
              ?.gender.forEach(
                (gender) =>
                  (yukSum += Number(
                    gender.age.find((age) => age.ageTitle === ageLabel)?.total
                  ))
              )
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.forEach((city) =>
            city.ramen
              .find((ramen) => ramen.ramenName === "너구리")
              ?.gender.forEach(
                (gender) =>
                  (neoSum += Number(
                    gender.age.find((age) => age.ageTitle === ageLabel)?.total
                  ))
              )
          );

        arr.push({
          label: ageLabel,
          data: [shinSum, jjaSum, yukSum, neoSum],
        });
      });
    } else {
      ageLabel.forEach((ageLabel) => {
        let shinSum = 0;
        let jjaSum = 0;
        let yukSum = 0;
        let neoSum = 0;

        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "신라면")
          ?.gender.forEach(
            (gender) =>
              (shinSum += Number(
                gender.age.find((age) => age.ageTitle === ageLabel)?.total
              ))
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "짜파게티")
          ?.gender.forEach(
            (gender) =>
              (jjaSum += Number(
                gender.age.find((age) => age.ageTitle === ageLabel)?.total
              ))
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "육개장")
          ?.gender.forEach(
            (gender) =>
              (yukSum += Number(
                gender.age.find((age) => age.ageTitle === ageLabel)?.total
              ))
          );
        json.country
          .find((country) => country.countryName === countryParam)
          ?.city.find((city) => city.cityName === cityParam)
          ?.ramen.find((ramen) => ramen.ramenName === "너구리")
          ?.gender.forEach(
            (gender) =>
              (neoSum += Number(
                gender.age.find((age) => age.ageTitle === ageLabel)?.total
              ))
          );

        arr.push({
          label: ageLabel,
          data: [shinSum, jjaSum, yukSum, neoSum],
        });
      });
    }
  }
  obj.labels = ramenLabel;
  obj.datasets = arr;

  return obj as BarChartData;
};

export const getCountryCityTotal: (
  countryParam: CountryUnion
) => ICountryCityTotal[] = (countryParam) => {
  const arr: { city: string; total: number }[] = [];
  if (countryParam === "ALL") {
    json.country.forEach((country) => {
      let total = 0;
      country.city.forEach((city) =>
        city.ramen.forEach((ramen) =>
          ramen.gender.forEach((gender) =>
            gender.age.forEach((age) => (total += age.total))
          )
        )
      );
      arr.push({ city: country.countryLabel, total });
    });

    return arr;
  } else {
    json.country
      .find((country) => country.countryName === countryParam)
      ?.city.forEach((city) => {
        let total = 0;
        city.ramen.forEach((ramen) =>
          ramen.gender.forEach((gender) =>
            gender.age.forEach((age) => (total += age.total))
          )
        );
        arr.push({ city: city.cityLabel, total });
      });

    return arr;
  }
};
