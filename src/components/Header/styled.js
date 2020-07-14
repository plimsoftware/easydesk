import styled from 'styled-components';

export const Nav = styled.nav`
    background: green;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    position: fixed;
    padding-top: 5px;
    padding-bottom: 5px:
    z-index: 99;
    top: 0;
    width: 100%;
    height: 50px;
`;

export const NavHeader = styled.div`
    display: flex;
    width: 100%;
    align-itens: center;
`;

export const NavLeft = styled.div`
    width: 33%;
    text-align: left;
`;

export const NavRight = styled.div`
    width: 66%;
    text-align: right;
    justify-items: flex-end;
    font-size: 15px;
    color: white;
    align-content: center;
`;
