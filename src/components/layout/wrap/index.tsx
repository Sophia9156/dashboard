import styled from "styled-components";
import colors from "@/constants/colors";

export const Wrap = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 1440px) {
    display: block;
  }
`;

export const LeftWrap = styled.div`
  margin-right: 40px;
  width: 65%;
`;

export const RightWrap = styled.div`
  width: 35%;
  height: calc(80vh + 40px);
`;

export const UpperWrap = styled.div`
  width: 100%;
  height: 45vh;
  margin-bottom: 40px;

  @media screen and (max-width: 1440px) {
    height: 600px;
  }
`;

export const MiddleWrap = styled.div`
  @media screen and (max-width: 1440px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

export const LowerWrap = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media screen and (max-width: 1440px) {
    margin-bottom: 40px;
  }
`;

export const MapWrap = styled.div`
  height: 100%;
  overflow: hidden;
  .map-wrap {
    width: 75%;
    margin: 0 auto;
    transform: translateY(-100px);
  }

  @media screen and (min-width: 1441px) and (max-width: 2280px) {
    .map-wrap {
      width: 70%;
      transform: translateY(0px);
    }
  }

  @media screen and (max-width: 1440px) {
    .map-wrap {
      width: 75%;
      transform: translateY(0px);
    }
  }
`;

export const TabWrap = styled.div`
  margin-bottom: 60px;
  .tab {
    margin-right: 24px;
    font-weight: 700;
    font-size: 32px;
    line-height: 30px;
    letter-spacing: -0.6px;
    color: ${colors.basic700};
    cursor: pointer;
    &.active {
      color: ${colors.basic100};
    }
  }

  @media screen and (min-width: 1441px) and (max-width: 2280px) {
    margin-bottom: 48px;
    .tab {
      font-size: 24px;
      line-height: 28px;
    }
  }

  @media screen and (max-width: 1440px) {
    margin-bottom: 60px;
    .tab {
      font-size: 28px;
      line-height: 30px;
    }
  }
`;

export const CountryTitleWrap = styled.div`
  position: absolute;
  top: 32px;
  left: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .go-back {
    margin-right: 8px;
    padding: 10px 16px;
    border-radius: 8px;
    background-color: ${colors.primary100};
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.6px;
    color: ${colors.white};
    border: 1px solid ${colors.primary100};
    cursor: pointer;
    .icon {
      vertical-align: middle;
    }
    .city-title {
      margin-left: 8px;
      font-weight: 400;
      font-size: 20px;
      line-height: 36px;
      color: ${colors.cityTitle};
      vertical-align: top;
    }
    &.white {
      background-color: ${colors.bgBasic};
      color: ${colors.primary100};
      .city-title {
        color: ${colors.primary100};
      }
      &:hover {
        background-color: ${colors.white};
        border: 1px solid ${colors.primaryHover};
      }
    }
  }

  @media screen and (min-width: 1441px) and (max-width: 2280px) {
    .go-back {
      padding: 8px 16px;
      font-size: 20px;
      line-height: 28px;
      .city-title {
        font-size: 18px;
        line-height: 32px;
      }
    }
  }

  @media screen and (max-width: 1440px) {
    .go-back {
      .city-title {
        font-size: 16px;
        line-height: 36px;
      }
    }
  }
`;

export const ChartWrap = styled.div`
  margin-bottom: 40px;
  h5 {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.6px;
    color: ${colors.basic300};
  }

  @media screen and (min-width: 1441px) and (max-width: 2280px) {
    h5 {
      margin-bottom: 32px;
      font-size: 20px;
      line-height: 28px;
    }
  }

  @media screen and (max-width: 1440px) {
    flex: 1;
    h5 {
      margin-bottom: 40px;
      font-size: 20px;
      line-height: 24px;
    }
  }
`;

export const DoughnutWrap = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const BarWrap = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const ChartContainer = styled.div`
  @media screen and (max-width: 1440px) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;
