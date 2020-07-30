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
        font-size: 13px;
        border: 1px solid #ddd;
        padding: 0 10px;
        border-radius: 5px;
        background-color: #bfbfbf;
      }
    }

    input {
      margin-right: 10px;
    }

    fieldset {
      height: 100px;
    }

    .spanmember {
      padding: 20px;
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
      width: 45%;
    }

    .tdlst {
      width: 20%;
    }

    .tdstatus {
      width: 10%;
    }

    .thid {
      width: 5%;
    }

    .thname {
      width: 58%;
    }

    .thlst {
      width: 25%;
    }

    .thstatus {
      width: 15%;
    }
`;

export const SelectStyle = styled.select`

  width: 100px;
  position: relative;
  font-size: 12px;
  margin: 5px;
  padding: 3px;
`;
