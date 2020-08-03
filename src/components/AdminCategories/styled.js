import styled from 'styled-components';

export const Container = styled.div`
    margin-left: 20px;
    overflow-y: scroll;
    height: 100px;

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
    height: 425px;

    span {
      display: flex;
      flex-direction: rown;

      label {
        margin-right: 20px;
      }
    }

    .divlevel {
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;

      span {
        margin-right: 10px;
      }
    }

    .btlv {
      margin-left: 10px;
      font-size: 10px;
      width: 100px;
      height: 25px;
    }

    .newdescription {
      margin-left: 10px;
      margin-right: 10px;
      padding-left: 5px;
      font-size: 10px;
      width: 200px;
      height: 25px;
    }

    form {
      display: flex;
      flex-direction: column;

      label {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        margin-bottom: 10px;
      }

      input {
        height: 20px;
        font-size: 12px;
        width: 95%;
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

    .tdtype {
      width: 5%;
    }

    .tdstatus {
      width: 5%;
    }

    .thid {
      width: 10%;
    }

    .thname {
      width: 65%;
    }

    .thtype {
      width: 9%;
    }

    .thstatus {
      width: 6%;
    }

    .lsteam {
      width: 300px;
    }

    .status {
      width: 100px;
    }
`;

export const SelectStyle = styled.select`

  width: 100px;
  position: relative;
  font-size: 12px;
  margin: 5px;
  padding: 3px;
`;

export const SelectStyleLS = styled.select`

  width: 200px;
  position: relative;
  font-size: 12px;
  margin: 5px;
  padding: 3px;
`;
