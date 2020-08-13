import React, { useState, useEffect } from 'react';

import { Container } from './styled';
import axios from '../../services/axios';

export default function ClientList() {
  const [clientList, setClientList] = useState ([]);
  const [runOnce, setRunOnce] = useState (true);

  const {remote} = window.require("electron")
  const currentWindow = remote.getCurrentWindow();
  const { clientid } = currentWindow.custom;


  useEffect(() => {
    async function getData() {
      try {
        const responseClient = await axios.get(`/clients/?companyid=${clientid}`);
        setClientList(responseClient.data);

      } catch (err) {
        console.log(err);
      }

      setRunOnce(false);
    }

    if (runOnce) getData();
  }, [runOnce, clientid, clientList]);

 return (
      <Container>
        <table>
              <tbody>
                <tr>
                  <td className="tdid">ID</td>
                  <td className="tdname">NAME</td>
                  <td className="tdstatus">STATUS</td>
                </tr>
                {clientList.length !== 0 ? (
                  clientList.map((client) => (
                    <tr key={client.id}>
                      <td className="tdid">{client.id}</td>
                      <td className="tdname">{client.name}</td>
                      <td className="tdstatus">{client.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="tdid"></td>
                    <td className="tdname">There are no Clients</td>
                    <td className="tdstatus"></td>
                  </tr>
                )}
              </tbody>
            </table>

      </Container>
    );
}
