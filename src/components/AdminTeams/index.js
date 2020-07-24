import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUndo, FaTrashAlt } from 'react-icons/fa';

import { Container, ContainerData, MainContainer, SelectStyle } from './styled';
import * as actions from '../../store/modules/auth/actions';
import formatData from '../../modules/FormatData'


import axios from '../../services/axios';

export default function AdminTeams() {
  const [teamList, setTeamList] = useState([]);
  const [actualTeam, setActualTeam] = useState(0);
  const [name, setName] = useState ('');
  const [username, setUsername] = useState ('');
  const [active, setActive] = useState ('');
  const [localSupport, setLocalSupport] = useState (false);
  const [teamMembers, setTeamMembers] = useState ('');
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
        const responseTeam = await axios.get('/teams/');
        setTeamList(responseTeam.data);
      } catch (err) {
        console.log(err);
      }

      if (actualTeam > 0) {
        try {
          const { data } = await axios.get(`/teams/${actualTeam}`);
          setName(data.name);
          setActive(data.active);
          setLocalSupport(data.localsupportteam);
          setCreatedby(data.createdby);
          setUpdatedby(data.updatedby);
          setCreatedat(data.created_at);
          setUpdatedat(data.updated_at);
          setTeamMembers(data.Teammembers);

        } catch (err) {
          console.log(err);
        }
      }
      setRunOnce(false);
    }

    if (runOnce) getData();
  }, [runOnce, actualTeam]);

  const handleCreate = () => {
    clearData();
    setActualTeam(-1);
    dispatch(actions.isEditing({ isEditing: true }));
  }

  function clearData() {
    setName('');
    setActive('');
    setUsername('');
    setLocalSupport(false);
  }

  const handleCancelCreate = () => {
    setActualTeam(0);
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

  const handleBackDelete = (e) => {
    const delBottom = e.currentTarget.nextSibling;
    const delAsk = e.currentTarget.nextSibling.nextSibling;

    delBottom.setAttribute('style', 'display: inline');
    delAsk.setAttribute('style', 'display: none');

    setDeleteAsk(false);
  };

  const handleDeleteAskMember = (e) => {
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'inline');
    e.currentTarget.remove();
  };

  async function handleDelete() {
    try {
      await axios.delete(`/teams/${actualTeam}`);

      setActualTeam(0);
      setRunOnce(true);
      setDeleteAsk(false);
      setEditing(false);
      clearData();
      dispatch(actions.isEditing({ isEditing: false }));

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Team ${name} deleted`,
        msgType: 'info'
      }));

    } catch (err) {
      console.log(err);
    }
  };

  async function handleDeleteMember(member) {
    try {
      await axios.delete(`/teammembers/${member.id}`);

      setRunOnce(true);

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Member ${member.name} removed`,
        msgType: 'info'
      }));

      handleCancelEdit();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddMember() {
    if (teamMembers.filter( member => member.User.username === username).length > 0) {

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Username already associated`,
        msgType: 'error'
      }));

      handleCancelEdit();
      return;
    }

    await axios.get(`/users/${username}`)
    .then( response => {
      try {
        axios.post('/teammembers/', {
          userid: response.data.id,
          teamid: actualTeam,
          active: true
        });

        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Username ${username} added`,
          msgType: 'info'
        }));

        handleCancelEdit();
      } catch (err) {
        console.log(err);
      }
    })
    .catch(() => {
        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Username does not exists`,
          msgType: 'error'
        }));

        handleCancelEdit();
        return;
      } );
  }

  const handleTrClick = (teamId) => {
    if (actualTeam === -1 || editing || deleteAsk) return;
    setActualTeam(teamId);
    setRunOnce(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.length < 5 || name.length > 100) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Team name must have between 5 and 100 characters',
        msgType: 'error'
      }));
      return;
    }

    if (!editing) {
      const searchTeam = name.split(' ').join('%20');

      const findTeam = await axios.get(`/teams/?teamname=${searchTeam}`);

      if (findTeam.data) {
        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: 'Team name already exists',
          msgType: 'error'
        }));
        return;
      }

      try {
        const newTeam = await axios.post('/teams/', {
          name,
          active: true,
          localsupportteam: localSupport
        });

        setActualTeam(newTeam.data.id);
        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Team ${name} created`,
          msgType: 'info'
        }));

        dispatch(actions.isEditing({ isEditing: true }));

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(`/teams/${actualTeam}`, {
          name,
          active,
          localsupportteam: localSupport
        });

        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Team ${name} updated`,
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
         <legend><strong>Teams List</strong></legend>
          <section>
              <div className="thid">Id</div>
              <div className="thname">Team name</div>
              <div className="thlst">Local Support Team</div>
              <div className="thstatus">Status</div>
            </section>
          <Container>
            <table>
              <tbody>
                {teamList.length !== 0 ? (
                  teamList.map((team) => (
                    <tr key={team.id} onClick={() => handleTrClick(team.id)}>
                      <td className="tdid">{team.id}</td>
                      <td className="tdname">{team.name}</td>
                      <td className="tdlst">{team.localsupportteam ? 'Yes' : 'No' }</td>
                      <td className="tdstatus">{team.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>There are no Teams</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
        </fieldset>
        <div>
          {actualTeam === -1 && <button type="button" onClick={handleCancelCreate}>Cancel Creation</button>}
          {actualTeam === 0 && <button type="button" onClick={handleCreate}>Create Team</button>}
          {actualTeam > 0 && (editing || deleteAsk) && <button type="button" disabled>Create Team</button>}
          {actualTeam > 0 && (!editing && !deleteAsk) && <button type="button" onClick={handleCreate}>Create Team</button>}
          {actualTeam < 1 || deleteAsk ?
            <button type="button" disabled>Edit Team</button> :
            <button type="button" onClick={handleEdit}>Edit Team</button>
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
          {actualTeam < 1 ?
            <button type="button" disabled>Delete Team</button> :
            <><button type="button" onClick={(e) => handleDeleteAsk(e)}>Delete Team</button>
            <button
              className="deleteB"
              type="button"
              style={{display: 'none'}}
              onClick={handleDelete}
            >Are you sure?</button></>
          }
        </div>
        {actualTeam === 0 ? <></> :
          <fieldset>
            {actualTeam === -1 ? <legend><strong>Team creation</strong></legend> : <legend><strong>Detail of {name}</strong></legend>}
            <ContainerData>
            {actualTeam === -1 || editing ?
              <><form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  Team name:
                  <input
                    type="text"
                    className="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Insert Team name"
                  />
                </label>
                <label htmlFor="lst">
                    Local Support Team:
                    <SelectStyle
                      id="lst"
                      name="lst"
                      value={localSupport ? 'Yes' : 'No'}
                      onChange={(e) => {
                        if (e.currentTarget.value === 'Yes') {
                          setLocalSupport(true);
                        } else {
                          setLocalSupport(false);
                        }
                      }}
                    >
                      <option value="Yes" key="d1">
                        Yes
                      </option>
                      <option value="No" key="d2">
                        No
                      </option>
                    </SelectStyle>
                  </label>
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
                    <><button type="submit">Update Team</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button></>
                  :
                    <><button type="submit">Create Team</button>
                    <button type="button" onClick={() => clearData()}>Clear data</button></>
                  }
                </span>
              </form>
              {editing &&
              <>
              <fieldset>
                <legend><strong>Team members</strong></legend>
                {teamMembers.length !== 0 ? (
                    teamMembers.map((member) => (
                      <span key={member.id} >
                        <span className="spanmember">
                        {member.User.name} ({member.User.username})
                        </span>
                        <span>
                        <FaTrashAlt
                          title="Remove Member"
                          onClick={handleDeleteAskMember}
                          cursor="pointer"
                          size="13"
                        />
                        <FaTrashAlt
                          color="red"
                          title="Confirm remove"
                          display="none"
                          cursor="pointer"
                          onClick={() => handleDeleteMember(member)}
                          size="13"
                        />
                        </span>
                      </span>
                    ))
                    ) : (
                    <span className="spanmember">
                      There are no Members
                    </span>
                    )}
              </fieldset>
              <input
                type="text"
                className="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Insert Username"
              />
              <button type="button" onClick={handleAddMember}>Add Member</button>
              </>
            }
          </>
            :
              <>
                <form>
                  <label htmlFor="name">
                    Team name:
                    <input
                      type="text"
                      className="name"
                      value={name}
                      readOnly
                    />
                  </label>
                  <label htmlFor="lst">
                    Local Support Team:
                    <input
                      type="text"
                      className="lst"
                      value={localSupport ? 'Yes' : 'No'}
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
                  <legend><strong>Team members</strong></legend>
                      {teamMembers.length !== 0 ? (
                      teamMembers.map((member) => (
                        <span className="spanmember" key={member.id}>
                          {member.User.name} ({member.User.username})
                        </span>
                      ))
                      ) : (
                      <span className="spanmember">
                        There are no Members
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
