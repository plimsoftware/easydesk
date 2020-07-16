import styled from 'styled-components';

export const Container = styled.section`
  position: fixed;
  overflow-x: hidden;
  margin-top: 54px;
  width: 100%;
  height: 100%;
  background-color: #ADACAC;
  text-align: center;
  padding-top: 50px;
  display: block;


  h1 {
    margin-top: 50px;
  }
`;

export const Form = styled.form`
  display:flex;
  flex-direction: column;
  justify-content: center;
  alignt-text: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  width: 200px;

  input {
    margin-bottom: 5px;
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  background-color: #4D4D4D;
  color: white;
  border-radius: 10px;
`;
