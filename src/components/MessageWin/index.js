import React from 'react';
import { useDispatch } from 'react-redux';

import { MainContainer, Container } from './styled';
import * as actions from '../../store/modules/auth/actions';


export default function MessageWin({ msgEnabled, message , msgType, wheremsg, setWaitMessage }) {
  const dispatch = useDispatch();

  if (!msgEnabled) return <></>;
    return (
      <>
        <MainContainer>
        </MainContainer>
        <Container style={msgType === 'info' ? { backgroundColor: "#668cff"} : { backgroundColor: "#ff3333"}}>
        <p>{message}</p>
        {msgType === 'question' ?
        <>
          <button type="button" onClick={() => {
            dispatch(actions.cleanMessage());
            dispatch(actions.isEditing({ isEditing: false, response: 'ok' }));
            setWaitMessage(wheremsg);
            }}>Ok</button>
          <button type="button" onClick={() => {
            dispatch(actions.cleanMessage());
            dispatch(actions.isEditing({ isEditing: true, response: '' }));
            }}>Cancel</button>
        </>
        :
          <button type="button" onClick={() => dispatch(actions.cleanMessage())}>Ok</button>
        }
        </Container>
      </>
    );
}
