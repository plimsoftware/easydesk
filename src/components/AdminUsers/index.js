import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUndo, FaTrashAlt } from 'react-icons/fa';

import {
  Container,
  ContainerData,
  MainContainer,
  SelectStyle,
  SelectStyleProf
} from './styled';
import * as actions from '../../store/modules/auth/actions';
import formatData from '../../modules/FormatData'


import axios from '../../services/axios';

export default function AdminUsers() {
  const [userList, setUserList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [actualUser, setActualUser] = useState(0);
  const [name, setName] = useState ('');
  const [username, setUsername] = useState ('');
  const [userProfiles, setUserProfiles] = useState ('');
  const [profile, setProfile] = useState ('Administrator');
  const [active, setActive] = useState ('');
  const [initialPassword, setInitialPassword] = useState ('');
  const [createdat, setCreatedat] = useState ('');
  const [updatedat, setUpdatedat] = useState ('');
  const [createdby, setCreatedby] = useState ('');
  const [updatedby, setUpdatedby] = useState ('');
  const [runOnce, setRunOnce] = useState (true);
  const [editing, setEditing] = useState (false);
  const [deleteAsk, setDeleteAsk] = useState (false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const responseTeam = await axios.get('/users/?full=true');
        setUserList(responseTeam.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const { data } = await axios.get('/profile/');

        setProfileList(data);
      } catch (err) {
        console.log(err);
      }

      if (actualUser > 0) {
        try {
          const { data } = await axios.get(`/users/?userid=${actualUser}`);
          setName(data.name);
          setUsername(data.username);
          setActive(data.active);
          setInitialPassword(data.initialpassword);
          setCreatedby(data.createdby);
          setUpdatedby(data.updatedby);
          setCreatedat(data.created_at);
          setUpdatedat(data.updated_at);
          setUserProfiles(data.UserProfs);

        } catch (err) {
          console.log(err);
        }
      }
      setRunOnce(false);
    }

    if (runOnce) getData();
  }, [runOnce, actualUser]);

  const handleCreate = () => {
    clearData();
    setActualUser(-1);
    dispatch(actions.isEditing({ isEditing: true }));
  }

  function clearData() {
    setName('');
    setUsername('');
    setActive('');
    setProfile('Administrator');
    setInitialPassword('');
    setUserProfiles('');
  }

  const handleCancelCreate = () => {
    setActualUser(0);
    setEditing(false);
    clearData();
    dispatch(actions.isEditing({ isEditing: false }));
  };

  const handleCancelEdit = () => {
    setEditing(false);
    dispatch(actions.isEditing({ isEditing: false }));
  };

  const handleEdit = () => {
    setEditing(true);
    dispatch(actions.isEditing({ isEditing: true }));
  };

  const handleDeleteAsk = (e) => {
    const confirm = e.currentTarget.nextSibling;
    confirm.setAttribute('style', 'display: inline');
    e.currentTarget.setAttribute('style', 'display: none');
    setDeleteAsk(true);
  };

  const handleDeleteAskProf = (e) => {
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'inline');
    e.currentTarget.remove();
  };

  const handleBackDelete = (e) => {
    const delBottom = e.currentTarget.nextSibling;
    const delAsk = e.currentTarget.nextSibling.nextSibling;

    delBottom.setAttribute('style', 'display: inline');
    delAsk.setAttribute('style', 'display: none');

    setDeleteAsk(false);
  };

  async function handleDelete() {
    try {
      await axios.delete(`/users/${actualUser}`);

      setActualUser(0);
      setRunOnce(true);
      setDeleteAsk(false);
      setEditing(false);
      clearData();
      dispatch(actions.isEditing({ isEditing: false }));

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `User ${name} deleted`,
        msgType: 'info'
      }));

    } catch (err) {
      console.log(err);
    }
  };

  async function handleDeleteProf(profile) {
    try {
      await axios.delete(`/userprof/${profile.id}`);

      setRunOnce(true);

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Profile ${profile.profile} removed`,
        msgType: 'info'
      }));

      handleCancelEdit();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddProf() {
    if (userProfiles.filter( UserProf => UserProf.profile === profile).length > 0) {

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Profile already associated`,
        msgType: 'error'
      }));

      handleCancelEdit();
      return;
    }

    try {
      await axios.post('/userprof/', {
        username,
        profile,
        userid: actualUser
      });

      setRunOnce(true);

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Profile ${profile} added`,
        msgType: 'info'
      }));

      handleCancelEdit();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleResetPassword() {
    try {
      await axios.put(`/users/${actualUser}`, {
        password: '123456',
        initialpassword: true,
      });

      setRunOnce(true);

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Password reseted',
        msgType: 'info'
      }));

      handleCancelEdit();

    } catch (err) {
      console.log(err);
    }
  };

  const handleTrClick = (userId) => {
    if (actualUser === -1 || editing || deleteAsk) return;
    setActualUser(userId);
    setRunOnce(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.length < 3 || name.length > 255) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Name must have between 3 and 255 characters',
        msgType: 'error'
      }));
      return;
    }

    if (username.length < 3 || username.length > 100) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Username must have between 3 and 100 characters',
        msgType: 'error'
      }));
      return;
    }

    if (!editing) {
        try {
          const findUser = await axios.get(`/users/${username}`);
          if (findUser.data) {
            dispatch(actions.setMessage({
              msgEnabled: true,
              msg: 'Username already exists',
              msgType: 'error'
            }));
            return;
          }
        } catch (err) {
          console.log(err);
        }

      try {
        const newUser = await axios.post('/users/', {
          name,
          username,
          password: '123456',
          active: true,
          initialpassword: true,
          profile
        });

        setActualUser(newUser.data.id);
        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `User ${name} created`,
          msgType: 'info'
        }));

        dispatch(actions.isEditing({ isEditing: true }));

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(`/users/${actualUser}`, {
          name,
          username,
          active,
        });

        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `User ${name} updated`,
          msgType: 'info'
        }));

        handleCancelEdit();

      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
      <MainContainer>
        <fieldset>
         <legend><strong>Users List</strong></legend>
          <section>
              <div className="thid">Id</div>
              <div className="thlst">Username</div>
              <div className="thname">Name</div>
              <div className="thstatus">Status</div>
            </section>
          <Container>
            <table>
              <tbody>
                {userList.length !== 0 ? (
                  userList.map((user) => (
                    <tr key={user.id} onClick={() => handleTrClick(user.id)}>
                      <td className="tdid">{user.id}</td>
                      <td className="tdlst">{user.username}</td>
                      <td className="tdname">{user.name}</td>
                      <td className="tdstatus">{user.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>There are no Users</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
        </fieldset>
        <div>
          {actualUser === -1 && <button type="button" onClick={handleCancelCreate}>Cancel Creation</button>}
          {actualUser === 0 && <button type="button" onClick={handleCreate}>Create User</button>}
          {actualUser > 0 && (editing || deleteAsk) && <button type="button" disabled>Create User</button>}
          {actualUser > 0 && (!editing && !deleteAsk) && <button type="button" onClick={handleCreate}>Create User</button>}
          {actualUser < 1 || deleteAsk ?
            <button type="button" disabled>Edit User</button> :
            <button type="button" onClick={handleEdit}>Edit User</button>
            }
          {deleteAsk && <FaUndo
            cursor="pointer"
            title="Cancel deletion"
            size="18" color="red"
            style={{
              marginRight: '5px',
              paddingTop: '5px'
            }}
            onClick={(e) => handleBackDelete(e)}/>}
          {actualUser < 1 ?
            <button type="button" disabled>Delete User</button> :
            <><button type="button" onClick={(e) => handleDeleteAsk(e)}>Delete User</button>
            <button
              className="deleteB"
              type="button"
              style={{display: 'none'}}
              onClick={handleDelete}
            >Are you sure?</button></>
          }
        </div>
        {actualUser === 0 ? <></> :
          <fieldset>
            {actualUser === -1 ? <legend><strong>User creation</strong></legend> : <legend><strong>Detail of {username}</strong></legend>}
            <ContainerData>
            {actualUser === -1 || editing ?
              <><form onSubmit={handleSubmit}>
                <label htmlFor="username">
                  Username:
                  <input
                    type="text"
                    className="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Insert Username"
                  />
                </label>
                <label htmlFor="name">
                  Name:
                  <input
                    type="text"
                    className="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Insert Name"
                  />
                </label>
                {actualUser === -1 ?
                  <label htmlFor="profile">
                    Profile:
                    <SelectStyleProf
                      id="profile"
                      name="profile"
                      value={profile}
                      onChange={(e) => setProfile(e.currentTarget.value)}
                    >
                    {profileList.map((prof) => (
                        <option value={prof.name} key={prof.name}>
                          {prof.name}
                        </option>
                      ))}
                    </SelectStyleProf>
                  </label>
                  :
                  <></>
                }
                { editing ?
                  <label htmlFor="status">
                    Status:
                    <SelectStyle
                      id="status"
                      name="status"
                      value={active ? 'Active' : 'Disabled'}
                      onChange={(e) => {
                        if (e.currentTarget.value === 'Active') {
                          setActive(true);
                        } else {
                          setActive(false);
                        }
                      }}
                    >
                      <option value="Active" key="s1">
                        Active
                      </option>
                      <option value="Disabled" key="s2">
                        Disabled
                      </option>
                    </SelectStyle>
                  </label>
                  : <></>
                }
                <span>
                  {editing ?
                    <>
                      <button type="button" onClick={handleResetPassword}>Reset Password</button>
                      <button type="submit">Update User</button>
                      <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  :
                    <><button type="submit">Create User</button>
                    <button type="button" onClick={() => clearData()}>Clear data</button></>
                  }
                </span>
              </form>
              {editing &&
                  <>
                  <fieldset>
                    <legend><strong>User profiles</strong></legend>
                    {userProfiles.length !== 0 ? (
                        userProfiles.map((profile) => (
                          <span key={profile.profile}>
                            <span className="spanprofile">
                              {profile.profile}
                            </span>
                            <span>
                            <FaTrashAlt
                              title="Remove Profile"
                              onClick={handleDeleteAskProf}
                              cursor="pointer"
                              size="13"
                            />
                            <FaTrashAlt
                              color="red"
                              title="Confirm remove"
                              display="none"
                              cursor="pointer"
                              onClick={() => handleDeleteProf(profile)}
                              size="13"
                            />
                            </span>
                          </span>
                        ))
                        ) : (
                        <span className="spanprofile">
                          User dont have profiles associated
                        </span>
                        )}
                  </fieldset>
                  <label htmlFor="profile">
                    Profile:
                    <SelectStyleProf
                      id="profile"
                      name="profile"
                      value={profile}
                      onChange={(e) => setProfile(e.currentTarget.value)}
                    >
                    {profileList.map((prof) => (
                        <option value={prof.name} key={prof.name}>
                          {prof.name}
                        </option>
                      ))}
                    </SelectStyleProf>
                  </label>
                  <button type="button" onClick={handleAddProf}>Add Profile</button>
                  </>
                }
              </>
            :
              <>
                <form>
                  <label htmlFor="username">
                    Username:
                    <input
                      type="text"
                      className="username"
                      value={username}
                      readOnly
                    />
                  </label>
                  <label htmlFor="name">
                    Name:
                    <input
                      type="text"
                      className="name"
                      value={name}
                      readOnly
                    />
                  </label>
                  <label htmlFor="status">
                    Status:
                    <input
                      type="text"
                      className="status"
                      value={active ? 'Active' : 'Disabled'}
                      readOnly
                    />
                  </label>
                  <label htmlFor="initialpassword">
                    Initial password:
                    <input
                      type="text"
                      className="initialpassword"
                      value={initialPassword ? 'Yes' : 'No'}
                      readOnly
                    />
                  </label>
                  <label htmlFor="createdby">
                    Created by:
                    <input
                      type="text"
                      className="createdby"
                      value={createdby}
                      readOnly
                    />
                  </label>
                  <label htmlFor="createdat">
                    Created at:
                    <input
                      type="text"
                      className="createdat"
                      value={formatData(createdat, 'dt')}
                      readOnly
                    />
                  </label>
                  <label htmlFor="updatedby">
                    Updated by:
                    <input
                      type="text"
                      className="updatedby"
                      value={updatedby}
                      readOnly
                    />
                  </label>
                  <label htmlFor="updatedat">
                    Updated at:
                    <input
                      type="text"
                      className="updatedat"
                      value={formatData(updatedat, 'dt')}
                      readOnly
                    />
                  </label>
                </form>
                <fieldset>
                  <legend><strong>User profiles</strong></legend>
                  {userProfiles.length !== 0 ? (
                      userProfiles.map((profile) => (
                        <span className="spanprofile" key={profile.profile}>
                          {profile.profile}
                        </span>
                      ))
                      ) : (
                      <span className="spanprofile">
                        User dont have profiles associated
                      </span>
                      )}
                </fieldset>
              </>
            }
            </ContainerData>
          </fieldset>
        }
      </MainContainer>
    );
}
