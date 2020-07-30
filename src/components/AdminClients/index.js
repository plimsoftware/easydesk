import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmail } from 'validator';
import { FaUndo } from 'react-icons/fa';

import { Container, ContainerData, MainContainer, SelectStyle, SelectStyleLS } from './styled';
import * as actions from '../../store/modules/auth/actions';
import formatData from '../../modules/FormatData'


import axios from '../../services/axios';

export default function AdminCompanies() {
  const [clientsList, setClientsList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [actualClient, setActualClient] = useState(0);
  const [name, setName] = useState ('');
  const [address, setAddress] = useState ('');
  const [locationcp, setLocationcp] = useState ('');
  const [location, setLocation] = useState ('');
  const [companyName, setCompanyName] = useState ('');
  const [companyID, setCompanyID] = useState ('');
  const [companyFilter, setCompanyFilter] = useState ('');
  const [localSupport, setLocalSupport] = useState ('');
  const [phone, setPhone] = useState ('');
  const [email, setEmail] = useState ('');
  const [active, setActive] = useState ('');
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
        if (companyFilter === '') {
          const responseClient = await axios.get('/clients/?full=true');
          setClientsList(responseClient.data);
        } else {
          const responseClient = await axios.get(`/clients/?companyid=${companyFilter}`);
          setClientsList(responseClient.data);
        }
      } catch (err) {
        console.log(err);
      }

      try {
        const responseCompany = await axios.get('/company/');
        setCompanyList(responseCompany.data);
      } catch (err) {
        console.log(err);
      }

      if (actualClient > 0) {
        try {
          const { data } = await axios.get(`/clients/${actualClient}`);
          setName(data.name);
          setAddress(data.address);
          setLocationcp(data.locationcp);
          setLocation(data.location);
          setLocalSupport(data.Company.defaultlocalsupport);
          setCompanyName(data.Company.name);
          setCompanyID(data.companyid);
          setPhone(data.phone);
          setEmail(data.email);
          setActive(data.active);
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

    if (runOnce) getData();
  }, [runOnce, actualClient, companyFilter]);

  const handleCreate = () => {
    clearData();
    setActualClient(-1);
    dispatch(actions.isEditing({ isEditing: true }));
  }

  function clearData() {
    setName('');
    setAddress('');
    setLocationcp('');
    setLocation('');
    setLocalSupport('');
    setCompanyID('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setActive('');
  }

  const handleCancelCreate = () => {
    setActualClient(0);
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

  async function handleDelete() {
    try {
      await axios.delete(`/clients/${actualClient}`);

      setActualClient(0);
      setRunOnce(true);
      setDeleteAsk(false);
      setEditing(false);
      clearData();
      dispatch(actions.isEditing({ isEditing: false }));

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Client ${name} deleted`,
        msgType: 'info'
      }));

    } catch (err) {
      console.log(err);
    }
  };

  const handleTrClick = (clientId) => {
    if (actualClient === -1 || editing || deleteAsk) return;
    setActualClient(clientId);
    setRunOnce(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.length < 4 || name.length > 200) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Client name must have between 4 and 200 characters',
        msgType: 'error'
      }));
      return;
    }

    if (address.length < 5 || address.length > 255) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Address name must have between 5 and 255 characters',
        msgType: 'error'
      }));
      return;
    }

    if (companyID === '') {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Select a Company',
        msgType: 'error'
      }));
      return;
    }

    if (location.length < 3 || location.length > 35) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Location name must have between 3 and 35 characters',
        msgType: 'error'
      }));
      return;
    }

    if (locationcp.length < 4 || locationcp.length > 10) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Postal code name must have between 4 and 10 characters',
        msgType: 'error'
      }));
      return;
    }

    if (Number.isNaN(phone)) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Invalid Phone',
        msgType: 'error'
      }));
      return;
    }

    if (!isEmail(email)) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Invalid E-mail',
        msgType: 'error'
      }));
      return;
    }

    if (!editing) {
      try {
        const newClient = await axios.post('/clients/', {
          name,
          address,
          locationcp,
          location,
          companyid: companyID,
          phone,
          email,
          active: true
        });

        setActualClient(newClient.data.id);
        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Client ${name} created`,
          msgType: 'info'
        }));

        dispatch(actions.isEditing({ isEditing: true }));

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(`/clients/${actualClient}`, {
          name,
          address,
          locationcp,
          location,
          companyid: companyID,
          phone,
          email,
          active
        });

        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Client ${name} updated`,
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
         <legend><strong>Clients List</strong></legend>
          <section>
              <div className="thid">Id</div>
              <div className="thname">Client name</div>
              <div className="thlocation">Location</div>
              <div className="thsp">Company</div>
              <div className="thstatus">Status</div>
            </section>
          <Container>
            <table>
              <tbody>
                <tr>
                  <td className="tdid"></td>
                  <td className="tdname"></td>
                  <td className="tdlocation"></td>
                  <td className="tdsp">
                    <SelectStyleLS
                      id="company"
                      name="company"
                      value={companyFilter}
                      onChange={(e) => {
                        setCompanyFilter(e.currentTarget.value);
                        setRunOnce(true);
                      }}
                    >
                    {companyFilter === '' ? <option value="" hidden>Filter by ...</option> : <option value="">All</option>}
                    {companyList.map((company) => (
                        <option value={company.id} key={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </SelectStyleLS>
                  </td>
                  <td className="tdstatus"></td>
                </tr>
                {clientsList.length !== 0 ? (
                  clientsList.map((client) => (
                    <tr key={client.id} onClick={() => handleTrClick(client.id)}>
                      <td className="tdid">{client.id}</td>
                      <td className="tdname">{client.name}</td>
                      <td className="tdlocation">{client.location}</td>
                      <td className="tdsp">{client.Company.name}</td>
                      <td className="tdstatus">{client.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="tdid"></td>
                    <td className="tdname">There are no Clients</td>
                    <td className="tdlocation"></td>
                    <td className="tdsp"></td>
                    <td className="tdstatus"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
        </fieldset>
        <div>
          {actualClient === -1 && <button type="button" onClick={handleCancelCreate}>Cancel Creation</button>}
          {actualClient === 0 && <button type="button" onClick={handleCreate}>Create Client</button>}
          {actualClient > 0 && (editing || deleteAsk) && <button type="button" disabled>Create Client</button>}
          {actualClient > 0 && (!editing && !deleteAsk) && <button type="button" onClick={handleCreate}>Create Client</button>}
          {actualClient < 1 || deleteAsk ?
            <button type="button" disabled>Edit Client</button> :
            <button type="button" onClick={handleEdit}>Edit Client</button>
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
          {actualClient < 1 ?
            <button type="button" disabled>Delete Client</button> :
            <><button type="button" onClick={(e) => handleDeleteAsk(e)}>Delete Client</button>
            <button
              className="deleteB"
              type="button"
              style={{display: 'none'}}
              onClick={handleDelete}
            >Are you sure?</button></>
          }
        </div>
        {actualClient === 0 ? <></> :
          <fieldset>
            {actualClient === -1 ? <legend><strong>Client creation</strong></legend> : <legend><strong>Detail of {name}</strong></legend>}
            <ContainerData>
            {actualClient === -1 || editing ?
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  Client name:
                  <input
                    type="text"
                    className="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Insert Company name"
                  />
                </label>
                <label htmlFor="address">
                  Address:
                  <input
                    type="text"
                    className="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Insert Company address"
                  />
                </label>
                <label htmlFor="locationcp">
                  Postal Code:
                  <input
                    type="text"
                    className="locationcp"
                    value={locationcp}
                    onChange={(e) => setLocationcp(e.target.value)}
                    placeholder="Insert address postal code"
                  />
                </label>
                <label htmlFor="location">
                  Location:
                  <input
                    type="text"
                    className="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Insert address location"
                  />
                </label>
                <label htmlFor="phone">
                  Phone:
                  <input
                    type="number"
                    className="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Insert Company phone"
                  />
                </label>
                <label htmlFor="email">
                  E-mail:
                  <input
                    type="email"
                    className="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Insert Company e-mail"
                  />
                </label>
                <label htmlFor="company">
                    Company:
                    <SelectStyleLS
                      id="company"
                      name="company"
                      value={companyID}
                      onChange={(e) => setCompanyID(e.currentTarget.value)}
                    >
                    <option value="" disabled hidden>Choose here</option>
                    {companyList.map((company) => (
                        <option value={company.id} key={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </SelectStyleLS>
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
                    <><button type="submit">Update Client</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button></>
                  :
                    <><button type="submit">Create Client</button>
                    <button type="button" onClick={() => clearData()}>Clear data</button></>
                  }
                </span>
              </form>
            :
              <form>
                <label htmlFor="name">
                  Client name:
                  <input
                    type="text"
                    className="name"
                    value={name}
                    readOnly
                  />
                </label>
                <label htmlFor="address">
                  Address:
                  <input
                    type="text"
                    className="address"
                    value={address}
                    readOnly
                  />
                </label>
                <label htmlFor="locationcp">
                  Postal Code:
                  <input
                    type="text"
                    className="locationcp"
                    value={locationcp}
                    readOnly
                  />
                </label>
                <label htmlFor="location">
                  Location:
                  <input
                    type="text"
                    className="location"
                    value={location}
                    readOnly
                  />
                </label>
                <label htmlFor="phone">
                  Phone:
                  <input
                    type="number"
                    className="phone"
                    value={phone}
                    readOnly
                  />
                </label>
                <label htmlFor="email">
                  E-mail:
                  <input
                    type="email"
                    className="email"
                    value={email}
                    readOnly
                  />
                </label>
                <label htmlFor="company">
                  Company:
                  <input
                    type="text"
                    className="company"
                    value={companyName}
                    readOnly
                  />
                </label>
                <label htmlFor="dls">
                  Default Local Support Team:
                  <input
                    type="text"
                    className="dls"
                    value={localSupport}
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
            </ContainerData>
          </fieldset>
        }
      </MainContainer>
    );
}
