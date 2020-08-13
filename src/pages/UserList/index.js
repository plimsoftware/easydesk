import React, { useState, useEffect } from 'react';

import { Container } from './styled';
import axios from '../../services/axios';

export default function UserList() {
  const [userList, setUserList] = useState ([]);
  const [runOnce, setRunOnce] = useState (true);

  useEffect(() => {
    async function getData() {
      try {
        const responseUser = await axios.get('/users/?full=true');
        setUserList(responseUser.data);

      } catch (err) {
        console.log(err);
      }

      setRunOnce(false);
    }

    if (runOnce) getData();
  }, [runOnce, userList]);

 return (
      <Container>
        <table>
              <tbody>
                <tr>
                  <td className="tdid">USERNAME</td>
                  <td className="tdname">NAME</td>
                  <td className="tdstatus">STATUS</td>
                </tr>
                {userList.length !== 0 ? (
                  userList.map((user) => (
                    <tr key={user.id}>
                      <td className="tdid">{user.username}</td>
                      <td className="tdname">{user.name}</td>
                      <td className="tdstatus">{user.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="tdid"></td>
                    <td className="tdname">There are no Users</td>
                    <td className="tdstatus"></td>
                  </tr>
                )}
              </tbody>
            </table>

      </Container>
    );
}
