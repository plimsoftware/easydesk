import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Container} from './styled';
import Menu from '../../components/Menu';
import ListCases from '../../components/ListCases';
import AdminCompanies from '../../components/AdminCompanies';
import AdminTeams from '../../components/AdminTeams';
import AdminUsers from '../../components/AdminUsers';
import AdminClients from '../../components/AdminClients';
import AdminProfiles from '../../components/AdminProfiles';
import MessageWin from '../../components/MessageWin';

export default function Main() {

  const [currentPage, setCurrentPage] = useState('Home');
  const [waitMessage, setWaitMessage] = useState('');
  const { msgEnabled, msg, msgType, wheremsg } = useSelector((state) => state.auth.messageWinState);

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
                {currentPage === 'AdminTeams'? <AdminTeams /> : <></>}
                {currentPage === 'AdminUsers'? <AdminUsers /> : <></>}
                {currentPage === 'AdminClients'? <AdminClients /> : <></>}
                {currentPage === 'AdminProfiles'? <AdminProfiles /> : <></>}
            </div>
        <MessageWin
          msgEnabled={msgEnabled}
          message={msg}
          msgType={msgType}
          wheremsg={wheremsg}
          setWaitMessage={(status) => setWaitMessage(status)}/>
        </Container>

    );
}
