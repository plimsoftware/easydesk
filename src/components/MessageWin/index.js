import React from 'react';

import { MainContainer, Container } from './styled';


export default function MessageWin({ message , msgType, msgClose }) {

    return (
      <>
        <MainContainer>
        </MainContainer>
        <Container style={msgType === 'info' ? { backgroundColor: "#668cff"} : { backgroundColor: "#ff3333"}}>
        <p>{message}</p>
        <button type="button" onClick={() => msgClose()}>Ok</button>
        </Container>
      </>
    );
}
