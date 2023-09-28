import styled from "styled-components";
import { lightTheme } from "./theme";

interface IFlex {
  $justifyContent?: string;
  $alignItem?: string;
  $margin?: string;
  $width?: string;
}

export const Flex = styled.div<IFlex>`
  display: flex;

  justify-content: ${(props) => props.$justifyContent ?? "center"};
  align-items: ${(props) => props.$alignItem ?? "center"};
  margin: ${(props) => props.$margin ?? "0"};
  width: ${(props) => props.$width ?? "initial"};
`;

export const Title = styled.h1`
  margin: 20px 0;
  font-size: 25px;
  font-weight: 300;
`;

export const ErrorModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  .modal-message {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 270px;
    width: 40%;
    height: 30%;
    background-color: whitesmoke;
    border-radius: 10px;
    padding: 10px;
    white-space: pre-wrap;
    line-height: 2;
    text-align: center;
    color: ${lightTheme.textColor.main};
    p {
      margin-top: 10px;
    }
    ${Flex} {
      margin-top: 20px;
      button {
        margin: 0 20px;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 3px 15px ${(props) => props.theme.boxShadowColor.point};
        transition: all 0.2s ease-in-out;
        &:hover {
          color: ${(props) => props.theme.accentColor};
        }
      }
    }
  }
  .modal-message-cancel-btn {
    position: absolute;

    top: 0;
    right: 0;
    color: white;
    background-color: ${(props) => props.theme.bgColor.point};
    padding: 0 10px;
  }
`;

export const CoinUl = styled.ul`
  position: relative;
  box-shadow: ${(props) =>
    props.theme.mode === "lightTheme"
      ? `0px 10px 20px ${props.theme.boxShadowColor.point} `
      : "none"};

  border-radius: 10px;
  padding: 5px 10px;
`;

export const CoinLi = styled.li`
  margin: 10px 0;
  border-radius: ${(props) =>
    props.theme.mode === "lightTheme" ? "0" : "10px"};

  background-color: ${lightTheme.bgColor.main};
  color: ${lightTheme.textColor.main};
  transition: all 0.3s ease-in-out;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
    img {
      width: 35px;
      margin-right: 20px;
    }
  }

  &:nth-of-type(2n) {
    background-color: ${(props) =>
      props.theme.mode === "lightTheme" ? lightTheme.bgColor.secondary : null};
  }
`;

export const CoinRow = styled.section`
  border-radius: 10px;
  padding: 30px 20px 10px;
  min-height: 160px;
  background-color: ${(props) =>
    props.theme.mode === "lightTheme"
      ? lightTheme.bgColor.main
      : props.theme.componentColor};

  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  word-break: keep-all;
  overflow-wrap: anywhere;

  box-shadow: ${(props) =>
    props.theme.mode === "lightTheme"
      ? `0px 10px 20px ${props.theme.boxShadowColor.point} `
      : "none"};
  div {
    width: 27%;
    text-align: center;
    p {
      &:first-of-type {
        margin-bottom: 10px;
        height: 40%;
      }
    }
  }
  img {
    width: 100%;
  }
`;

export const Description = styled.div`
  padding: 0 10px;
`;

interface ITab {
  $isActive?: boolean;
}

export const Tab = styled.div<ITab>`
  color: ${(props) => (props.$isActive ? props.theme.accentColor : "inherit")};
`;

export const Tabs = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: ${(props) =>
    props.theme.mode === "lightTheme"
      ? lightTheme.bgColor.main
      : props.theme.textColor.main};

  box-shadow: ${(props) =>
    props.theme.mode === "lightTheme"
      ? `0px 10px 20px ${props.theme.boxShadowColor.point} `
      : "none"};
  /* color: ${(props) => props.theme.bgColor.main}; */
  color: ${lightTheme.textColor.main};
  text-align: center;
  margin-bottom: 30px;
  ${Tab} {
    width: 50%;
    a {
      display: block;
      padding: 10px 0;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;

export const Space = styled.div`
  width: 2px;
  background-color: ${(props) =>
    props.theme.mode === "lightTheme"
      ? props.theme.boxShadowColor.point
      : props.theme.bgColor.main};
`;

export const TableBox = styled.div`
  width: 100vw;
  overflow-x: auto;
  max-width: 370px;
  box-shadow: ${(props) =>
    props.theme.mode === "lightTheme"
      ? `0px 10px 20px ${props.theme.boxShadowColor.point} `
      : "none"};
`;

export const Table = styled.table`
  width: 100%;

  text-align: center;

  .table-header-row {
    background-color: ${(props) => props.theme.bgColor.secondary};
    th {
      padding: 20px 10px;
    }
  }
  td {
    padding: 10px;
  }

  tr {
    &:nth-of-type(2n + 1) {
      background-color: ${(props) => props.theme.bgColor.secondary};
    }
  }
`;
