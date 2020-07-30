import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
    font-size: 12px;
    color: black;
    background-color: black;
}

`;
