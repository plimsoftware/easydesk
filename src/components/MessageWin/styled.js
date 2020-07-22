import styled from 'styled-components';

export const Container = styled.div`
    box-shadow: 0 0 5px rgba(0, 0, 0, 1);
    position: fixed;
    top: 45%;
    left: 33% ;
    width: 33%;
    height: 100px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-itens: center;

    p {
      font-size: 12px;
      width: 100%;
      margin-top: 25px;
      text-align: center;
    }

    button {
      width: 100px;
      height: 20px;
      border-radius: 5px;
      margin-top: 10px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
`;

export const MainContainer = styled.div`
    background: grey;
    position: fixed;
    top: 0;
    left: 50;
    width: 100%;
    height: 100%;
    opacity: 0.5;
`;

