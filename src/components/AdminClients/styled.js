import styled from 'styled-components';

export const Container = styled.div`
    margin-left: 20px;
    overflow-y: scroll;
    height: 150px;

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
`;

export const ContainerData = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    overflow-y: scroll;
    height: 375px;
    font-size: 12px;

    form {
      display: flex;
      flex-direction: column;

      label {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }

      input {
        height: 20px;
        width: 95%;
        font-size: 12px;
        border: 1px solid #ddd;
        padding: 0 10px;
        border-radius: 5px;
        background-color: #bfbfbf;
      }
    }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-components: center;

    fieldset {
      width: 95%;
      margin: 10px;

      legend {
        padding: 5px;
        margin-left: 10px;
      }
    }

    div {
      margin-left: 15px;
    }

    section {
      margin-left: 5px;
      display: flex;
      flex-direction: row;
      font-weight: bold;
    }

    button {
      width: 120px;
      height: 30px;
      font-size: 12px;
      margin-right: 5px;
      border-radius: 5px;
      background-color: #809fff;
      margin-bottom: 5px;
    }

    .deleteB {
      background-color: #009900;
    }

    .tdid {
      width: 5%;
    }

    .tdname {
      width: 35%;
    }

    .tdlocation {
      width: 20%;
    }

    .tdsp {
      width: 20%;
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

    .thlocation {
      width: 21%;
    }

    .thsp {
      width: 21%;
    }

    .thstatus {
      width: 10%;
    }
`;

export const SelectStyle = styled.select`

  width: 100px;
  position: relative;
  margin: 5px;
  font-size: 12px;
  padding: 3px;
`;

export const SelectStyleLS = styled.select`

  width: 200px;
  position: relative;
  margin: 5px;
  font-size: 12px;
  padding: 3px;
`;
