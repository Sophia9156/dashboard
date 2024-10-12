import colors from "@/constants/colors";
import styled from "styled-components";

export const Board = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 28px 40px;
  background-color: ${colors.white};
  border-radius: 12px;
  box-shadow: 4px 4px 16px ${colors.boxShadow};
  &.map {
    padding: 0;
  }
`;

export const LowerBoard = styled.div`
  width: calc(50% - 20px);
  height: 100%;
  position: relative;
  padding: 28px 40px;
  background-color: ${colors.white};
  border-radius: 12px;
  box-shadow: 4px 4px 16px ${colors.boxShadow};
  h5 {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.6px;
    color: ${colors.basic300};
  }
  .table {
    width: 100%;
    text-align: left;
    margin-bottom: 30px;
    thead {
      tr {
        th {
          padding: 18px 0;
          border-bottom: 1px solid ${colors.basic850};
          font-size: 22px;
          &:first-child {
            width: 35%;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          padding: 18px 0;
          border-bottom: 1px solid ${colors.basic850};
          font-size: 22px;
          &:first-child {
            width: 35%;
          }
        }
        &:last-child {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1441px) and (max-width: 2280px) {
    width: calc(50% - 20px);
    h5 {
      margin-bottom: 28px;
      font-size: 20px;
      line-height: 28px;
    }
    .table {
      thead {
        tr {
          th {
            padding: 14px 0;
            font-size: 18px;
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 14px 0;
            font-size: 18px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1440px) {
    width: calc(50% - 20px);
    height: 400px;
    position: relative;
    padding: 28px 40px;
    background-color: ${colors.white};
    border-radius: 12px;
    box-shadow: 4px 4px 16px ${colors.boxShadow};
    h5 {
      margin-bottom: 40px;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.6px;
      color: ${colors.basic300};
    }
    .table {
      width: 100%;
      text-align: left;
      margin-bottom: 30px;
      thead {
        tr {
          th {
            padding: 18px 0;
            border-bottom: 1px solid ${colors.basic850};
            font-size: 18px;
            &:first-child {
              width: 35%;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 18px 0;
            border-bottom: 1px solid ${colors.basic850};
            font-size: 18px;
            &:first-child {
              width: 35%;
            }
          }
          &:last-child {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
`;
