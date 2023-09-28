import { Link, Outlet } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import reset from "styled-reset";
import { Flex } from "./component";
import { useState } from "react";

const GlobalStyle = createGlobalStyle`
${reset}
body {
    background-color: ${(props) => props.theme.bgColor.main};
    color:${(props) => props.theme.textColor.main};
    font-family: 'Source Sans 3', sans-serif;
    transition: all 0.3s ease-in-out;
    line-height: 1.2;
}
body * {
box-sizing: border-box;
}

a,button {
    all: unset;
    cursor: pointer;

}

footer {
margin-top: 30px;
}

.App {
margin: 0 auto;
max-width: 370px;
padding: 30px 0;
}

.btn-theme {
    width: 16px;
    text-align: center;
background-color: ${(props) => props.theme.bgColor.main};
    padding: 10px;
    border: 2px solid ${(props) => props.theme.textColor.main};
    border-radius: 50%;
    margin-right: 10px;
}
.themeBtn-box:hover .p-theme {
    opacity: 1;
    padding-left: 35px;
    }
.p-theme {
    opacity: 0;
    padding: 10.2px;

    position: absolute;
    left: 15px;
    z-index: -1;
    border: 1.5px solid ${(props) => props.theme.textColor.main};
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
}


.position-relative {
    position: relative;
}

main {
  margin-bottom: 30px;
}
`;

export default function Root() {
  const [themeState, setThemeState] = useState("light");
  return (
    <ThemeProvider theme={themeState === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className="App">
        <main>
          <Outlet />
        </main>
        <Flex as="footer" $width="100%">
          <Flex
            className="position-relative themeBtn-box"
            $justifyContent="flex-start"
            $width="50%"
          >
            <button
              className="btn-theme"
              onClick={() =>
                setThemeState((currentTheme) =>
                  currentTheme === "dark" ? "light" : "dark"
                )
              }
            >
              {themeState === "dark" ? (
                <i className="fa-regular fa-sun"></i>
              ) : (
                <i className="fa-solid fa-moon"></i>
              )}
            </button>
            <p className="p-theme">
              {themeState === "dark" ? "라이트모드 변경" : "다크모드 변경"}
            </p>
          </Flex>

          <div style={{ textAlign: "center", marginLeft: "10px" }}>
            <p>Navigate</p>
            <p>
              <Link to="/">Home</Link>
            </p>
          </div>
        </Flex>
      </div>
    </ThemeProvider>
  );
}
