import styled from 'styled-components';

export const Nav = styled.nav`
    background: #3E2776;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    position: fixed;
    padding-top: 5px;
    padding-bottom: 5px:
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

    img {
      width: 150px;
      height: 30px;
      margin: 5px;
      margin-left: 10px;
    }
`;

export const NavRight = styled.div`
    width: 66%;
    text-align: right;
    justify-items: flex-end;
    font-size: 15px;
    color: white;
    align-content: center;
`;
