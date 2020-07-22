import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Container} from './styled';
import Menu from '../../components/Menu';
import ListCases from '../../components/ListCases';
import AdminCompanies from '../../components/AdminCompanies';
import MessageWin from '../../components/MessageWin';

export default function Main() {

  const [currentPage, setCurrentPage] = useState('Home');
  const [waitMessage, setWaitMessage] = useState(false);
  const { msgEnabled, msg, msgType } = useSelector((state) => state.auth.messageWinState);

    return (
        <Container>
            <div className="split left">
                <div className="centered">
                    <Menu setPage={(page) => setCurrentPage(page)}
                    waitMessage={waitMessage}
                    setWaitMessage={(status) => setWaitMessage(status)} />
                </div>
            </div>
            <div className="split right">
                {currentPage === 'Home'? <ListCases /> : <></>}
                {currentPage === 'AdminCompanies'? <AdminCompanies /> : <></>}
            </div>
        <MessageWin msgEnabled={msgEnabled} message={msg} msgType={msgType} setWaitMessage={(status) => setWaitMessage(status)}/>
        </Container>

    );
}
