import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font: 14px 'Lato', sans-serif;
        background: #ecf1f8;
        color: #333;
        -webkit-font-smoothing: antialiased !important;
    }

    ul {
        list-style: none;
    }
`;
