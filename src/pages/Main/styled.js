import styled from 'styled-components';

export const Container = styled.section`
    .split {
      position: fixed;
      overflow-x: hidden;
      margin-top: 54px;
      height: 100%;
    }

    .left {
      left: 0;
      width: 180px;
      background-color: #4D4D4D;
      border-right: 1px solid white;
    }

    .right {
      right: 0;
      left: 183px;
      width: 100%;
      border-left: 1px solid white;
      background-color: #806F6F;
    }

    .centered {
      position: absolute;
      top: 5%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
`;
