import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUndo } from 'react-icons/fa';

import { Container, ContainerData, MainContainer, SelectStyle } from './styled';
import * as actions from '../../store/modules/auth/actions';
import formatData from '../../modules/FormatData'
import axios from '../../services/axios';


export default function AdminProfiles() {
  const [profileList, setProfileList] = useState([]);
  const [actualProfile, setActualProfile] = useState(0);
  const [name, setName] = useState ('');
  const [active, setActive] = useState ('');
  const [incmngt, setIncmngt] = useState (false);
  const [reqmngt, setReqmngt] = useState (false);
  const [chgmngt, setChgmngt] = useState (false);
  const [admin, setAdmin] = useState (false);
  const [clientchg, setClientChg] = useState (false);
  const [clientfull, setClientFull] = useState (false);
  const [companychg, setCompanyChg] = useState (false);
  const [companyfull, setCompanyFull] = useState (false);
  const [inccreate, setInccreate] = useState (false);
  const [inccomplete, setInccomplete] = useState (false);
  const [incclose, setIncclose] = useState (false);
  const [inccancel, setInccancel] = useState (false);
  const [reqcreate, setReqcreate] = useState (false);
  const [reqcomplete, setReqcomplete] = useState (false);
  const [reqclose, setReqclose] = useState (false);
  const [reqcancel, setReqcancel] = useState (false);
  const [chgcreate, setChgcreate] = useState (false);
  const [chgcomplete, setChgcomplete] = useState (false);
  const [chgclose, setChgclose] = useState (false);
  const [chgcancel, setChgcancel] = useState (false);
  const [catchg, setCatChg] = useState (false);
  const [catfull, setCatFull] = useState (false);
  const [userchg, setUserChg] = useState (false);
  const [userfull, setUserFull] = useState (false);
  const [createdat, setCreatedat] = useState ('');
  const [updatedat, setUpdatedat] = useState ('');
  const [createdby, setCreatedby] = useState ('');
  const [updatedby, setUpdatedby] = useState ('');
  const [runOnce, setRunOnce] = useState (true);
  const [editing, setEditing] = useState (false);
  const [inputStatus, setInputStatus] = useState (false);
  const [statusChange, setStatusChange] = useState ('');
  const [deleteAsk, setDeleteAsk] = useState (false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      try {
        const responseProfile = await axios.get('/profile/?full=true');
        setProfileList(responseProfile.data);
      } catch (err) {
        console.log(err);
      }

      if (actualProfile > 0) {
        try {
          const { data } = await axios.get(`/profile/${actualProfile}`);
          setName(data.name);
          setActive(data.active);
          setIncmngt(data.incmngt);
          setReqmngt(data.reqmngt);
          setChgmngt(data.chgmngt);
          setAdmin(data.admin);
          setClientChg(data.clientchg);
          setClientFull(data.clientfull);
          setCompanyChg(data.companychg);
          setCompanyFull(data.companyfull);
          setCatChg(data.catchg);
          setCatFull(data.catfull);
          setUserChg(data.userchg);
          setUserFull(data.userfull);
          setInccreate(data.inccreate);
          setInccomplete(data.inccomplete);
          setIncclose(data.incclose);
          setInccancel(data.inccancel);
          setReqcreate(data.reqcreate);
          setReqcomplete(data.reqcomplete);
          setReqclose(data.reqclose);
          setReqcancel(data.reqcancel);
          setChgcreate(data.chgcreate);
          setChgcomplete(data.chgcomplete);
          setChgclose(data.chgclose);
          setChgcancel(data.chgcancel);
          setCreatedby(data.createdby);
          setUpdatedby(data.updatedby);
          setCreatedat(data.created_at);
          setUpdatedat(data.updated_at);

        } catch (err) {
          console.log(err);
        }
      }
      setRunOnce(false);
    }

    function changeStatus() {

      if (statusChange === 'admin') {
        setIncmngt(true);
        setReqmngt(true);
        setChgmngt(true);
        setClientChg(true);
        setClientFull(true);
        setCompanyChg(true);
        setCompanyFull(true);
        setCatChg(true);
        setCatFull(true);
        setUserChg(true);
        setUserFull(true);
        setInccreate(true);
        setInccomplete(true);
        setIncclose(true);
        setInccancel(true);
        setReqcreate(true);
        setReqcomplete(true);
        setReqclose(true);
        setReqcancel(true);
        setChgcreate(true);
        setChgcomplete(true);
        setChgclose(true);
        setChgcancel(true);
      }

      if (statusChange === 'inc') {
        setInccreate(true);
        setInccomplete(true);
        setIncclose(true);
        setInccancel(true);
      }

      if (statusChange === 'req') {
        setReqcreate(true);
        setReqcomplete(true);
        setReqclose(true);
        setReqcancel(true);
      }

      if (statusChange === 'chg') {
        setChgcreate(true);
        setChgcomplete(true);
        setChgclose(true);
        setChgcancel(true);
      }

      setStatusChange('');
    }

    if (runOnce) getData();
    if (statusChange !== '') changeStatus();

  }, [runOnce, actualProfile, admin, incmngt, statusChange]);

  const handleCreate = () => {
    clearData();
    setActualProfile(-1);
    setInputStatus(true);
    dispatch(actions.isEditing({ isEditing: true }));
  }

  function clearData() {
    setName('');
    setActive('');
    setStatusChange('');
    setIncmngt(false);
    setReqmngt(false);
    setChgmngt(false);
    setAdmin(false);
    setClientChg(false);
    setClientFull(false);
    setCompanyChg(false);
    setCompanyFull(false);
    setCatChg(false);
    setCatFull(false);
    setUserChg(false);
    setUserFull(false);
    setInccreate(false);
    setInccomplete(false);
    setIncclose(false);
    setInccancel(false);
    setReqcreate(false);
    setReqcomplete(false);
    setReqclose(false);
    setReqcancel(false);
    setChgcreate(false);
    setChgcomplete(false);
    setChgclose(false);
    setChgcancel(false);
  }

  const handleCancelCreate = () => {
    setActualProfile(0);
    setEditing(false);
    setInputStatus(false);
    setStatusChange('');
    clearData();
    dispatch(actions.isEditing({ isEditing: false }));
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setInputStatus(false);
    setStatusChange('');
    dispatch(actions.isEditing({ isEditing: false }));
  };

  const handleEdit = () => {
    setEditing(true);
    setInputStatus(true);
    setStatusChange('');
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

  async function handleDelete() {
    try {
      await axios.delete(`/profile/${actualProfile}`);

      setActualProfile(0);
      setRunOnce(true);
      setDeleteAsk(false);
      setEditing(false);
      setInputStatus(false);
      setStatusChange('');
      clearData();
      dispatch(actions.isEditing({ isEditing: false }));

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Profile ${name} deleted`,
        msgType: 'info'
      }));

    } catch (err) {
      console.log(err);
    }
  };

  const handleTrClick = (profileId) => {
    if (actualProfile === -1 || editing || deleteAsk) return;
    setActualProfile(profileId);
    setRunOnce(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.length < 3 || name.length > 100) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Profile name must have between 3 and 100 characters',
        msgType: 'error'
      }));
      return;
    }

    if (!editing) {
      try {
        const newProfile = await axios.post('/profile/', {
          name,
          incmngt,
          reqmngt,
          chgmngt,
          admin,
          clientchg,
          clientfull,
          companychg,
          companyfull,
          catchg,
          catfull,
          userchg,
          userfull,
          inccreate,
          inccomplete,
          incclose,
          inccancel,
          reqcreate,
          reqcomplete,
          reqclose,
          reqcancel,
          chgcreate,
          chgcomplete,
          chgclose,
          chgcancel,
          active: true
        });

        setInputStatus(false);
        setStatusChange('');
        setActualProfile(newProfile.data.id);
        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Profile ${name} created`,
          msgType: 'info'
        }));

        dispatch(actions.isEditing({ isEditing: true }));

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(`/profile/${actualProfile}`, {
          name,
          incmngt,
          reqmngt,
          chgmngt,
          admin,
          clientchg,
          clientfull,
          companychg,
          companyfull,
          catchg,
          catfull,
          userchg,
          userfull,
          inccreate,
          inccomplete,
          incclose,
          inccancel,
          reqcreate,
          reqcomplete,
          reqclose,
          reqcancel,
          chgcreate,
          chgcomplete,
          chgclose,
          chgcancel,
          active
        });

        setInputStatus(false);
        setStatusChange('');
        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Profile ${name} updated`,
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
         <legend><strong>Profiles List</strong></legend>
          <section>
              <div className="thid">Id</div>
              <div className="thname">Profile name</div>
              <div className="thstatus">Status</div>
            </section>
          <Container>
            <table>
              <tbody>
                {profileList.length !== 0 ? (
                  profileList.map((profile) => (
                    <tr key={profile.id} onClick={() => handleTrClick(profile.id)}>
                      <td className="tdid">{profile.id}</td>
                      <td className="tdname">{profile.name}</td>
                      <td className="tdstatus">{profile.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>There are no Profiles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
        </fieldset>
        <div>
          {actualProfile === -1 && <button type="button" onClick={handleCancelCreate}>Cancel Creation</button>}
          {actualProfile === 0 && <button type="button" onClick={handleCreate}>Create Profile</button>}
          {actualProfile > 0 && (editing || deleteAsk) && <button type="button" disabled>Create Profile</button>}
          {actualProfile > 0 && (!editing && !deleteAsk) && <button type="button" onClick={handleCreate}>Create Profile</button>}
          {actualProfile < 1 || deleteAsk ?
            <button type="button" disabled>Edit Profile</button> :
            <button type="button" onClick={handleEdit}>Edit Profile</button>
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
          {actualProfile < 1 ?
            <button type="button" disabled>Delete Profile</button> :
            <><button type="button" onClick={(e) => handleDeleteAsk(e)}>Delete Profile</button>
            <button
              className="deleteB"
              type="button"
              style={{display: 'none'}}
              onClick={handleDelete}
            >Are you sure?</button></>
          }
        </div>
        {actualProfile === 0 ? <></> :
          <fieldset>
            {actualProfile === -1 ? <legend><strong>Profile creation</strong></legend> : <legend><strong>Detail of {name}</strong></legend>}
            <ContainerData>
            {actualProfile === -1 || editing ?
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  Profile name:
                  <input
                    type="text"
                    className="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Insert Profile name"
                  />
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
                    <><button type="submit">Update Profile</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button></>
                  :
                    <><button type="submit">Create Profile</button>
                    <button type="button" onClick={() => clearData()}>Clear data</button></>
                  }
                </span>
              </form>
            :
              <form>
                <label htmlFor="name">
                  Profile name:
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
            }
            <fieldset>
                  <legend><strong>Profile permissions</strong></legend>
                  <fieldset>
                  <legend><strong>Administration</strong></legend>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={admin}
                            value={admin}
                            onChange={() => {
                              setAdmin(!admin);
                              setStatusChange('admin');
                            }}
                            />
                            <label className="labelper" htmlFor="inputper"> Administration</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={clientchg}
                            onChange={() => setClientChg(!clientchg)}/>
                            <label className="labelper" htmlFor="clientchg"> Client Create / Update</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={clientfull}
                            onChange={() => setClientFull(!clientfull)}/>
                            <label className="labelper" htmlFor="clientfull"> Client Full</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={companychg}
                            onChange={() => setCompanyChg(!companychg)}/>
                            <label className="labelper" htmlFor="companychg"> Company Create / Update</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={companyfull}
                            onChange={() => setCompanyFull(!companyfull)}/>
                            <label className="labelper" htmlFor="companyfull"> Company Full</label>
                          </td>
                          </tr>
                          <tr>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={catchg}
                            onChange={() => setCatChg(!catchg)}/>
                            <label className="labelper" htmlFor="catchg"> Category Create / Update</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={catfull}
                            onChange={() => setCatFull(!catfull)}/>
                            <label className="labelper" htmlFor="catfull"> Category Full</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={userchg}
                            onChange={() => setUserChg(!userchg)}/>
                            <label className="labelper" htmlFor="userchg"> User Create / Update</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={userfull}
                            onChange={() => setUserFull(!userfull)}/>
                            <label className="labelper" htmlFor="userfull"> User Full</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                  <fieldset>
                  <legend><strong>Incident Management</strong></legend>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={incmngt}
                            onChange={() => {
                              setIncmngt(!incmngt);
                              setStatusChange('inc');
                              }}/>
                            <label className="labelper" htmlFor="incmngt"> Incident Management</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={inccreate}
                            onChange={() => setInccreate(!inccreate)}/>
                            <label className="labelper" htmlFor="createinc"> Create Incident </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={inccomplete}
                            onChange={() => setInccomplete(!inccomplete)}/>
                            <label className="labelper" htmlFor="completeinc"> Complete Incident </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={incclose}
                            onChange={() => setIncclose(!incclose)}/>
                            <label className="labelper" htmlFor="closeinc"> Close Incident </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={inccancel}
                            onChange={() => setInccancel(!inccancel)}/>
                            <label className="labelper" htmlFor="cancelinc"> Cancel Incident </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                  <fieldset>
                  <legend><strong>Request Management</strong></legend>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={reqmngt}
                            onChange={() => {
                              setReqmngt(!reqmngt);
                              setStatusChange('req');
                              }}/>
                            <label className="labelper" htmlFor="reqmngt"> Request Management</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={reqcreate}
                            onChange={() => setReqcreate(!reqcreate)}/>
                            <label className="labelper" htmlFor="createreq"> Create Request </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={reqcomplete}
                            onChange={() => setReqcomplete(!reqcomplete)}/>
                            <label className="labelper" htmlFor="completereq"> Complete Request </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={reqclose}
                            onChange={() => setReqclose(!reqclose)}/>
                            <label className="labelper" htmlFor="closereq"> Close Request </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={reqcancel}
                            onChange={() => setReqcancel(!reqcancel)}/>
                            <label className="labelper" htmlFor="cancelreq"> Cancel Request </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                  <fieldset>
                  <legend><strong>Change Management</strong></legend>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={chgmngt}
                            onChange={() => {
                              setChgmngt(!chgmngt);
                              setStatusChange('chg');
                              }}/>
                            <label className="labelper" htmlFor="chgmngt"> Change Management</label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={chgcreate}
                            onChange={() => setChgcreate(!chgcreate)}/>
                            <label className="labelper" htmlFor="createchg"> Create Change </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={chgcomplete}
                            onChange={() => setChgcomplete(!chgcomplete)}/>
                            <label className="labelper" htmlFor="completechg"> Complete Change </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={chgclose}
                            onChange={() => setChgclose(!chgclose)}/>
                            <label className="labelper" htmlFor="closechg"> Close Change </label>
                          </td>
                          <td>
                            <input
                            disabled={!inputStatus}
                            className="inputper"
                            type="checkbox"
                            checked={chgcancel}
                            onChange={() => setChgcancel(!chgcancel)}/>
                            <label className="labelper" htmlFor="cancelchg"> Cancel Change </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </fieldset>
            </ContainerData>
          </fieldset>
        }
      </MainContainer>
    );
}
