import styled from 'styled-components';

export const Container = styled.section`
  position: fixed;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background-color: #ADACAC;
  text-align: center;
  text-color: black;
  display: flex;
  flex-direction: column;
  justify-components: center;

  table {
    width: 100%;
  }

  table tr:nth-child(odd) td{
    background-color: #9494b8;
  }
  table tr:nth-child(even) td{
    background-color: #b3b3cc;
  }

  td {
    padding: 5px;
  }

  tr {
    cursor: pointer;
  }

  .tdid {
    width: 5%;
  }

  .tdname {
    width: 35%;
  }

  .tdstatus {
    width: 10%;
  }

  .thid {
    width: 5%;
  }

  .thname {
    width: 37%;
  }

  .thstatus {
    width: 10%;
  }

  h1 {
    margin-top: 50px;
  }
`;
