import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmail } from 'validator';
import { FaUndo } from 'react-icons/fa';

import { Container, ContainerData, MainContainer, SelectStyle } from './styled';
import * as actions from '../../store/modules/auth/actions';
import formatData from '../../modules/FormatData'


import axios from '../../services/axios';

export default function AdminCompanies() {
  const [companyList, setCompanyList] = useState([]);
  const [actualCompany, setActualCompany] = useState(0);
  const [name, setName] = useState ('');
  const [address, setAddress] = useState ('');
  const [locationcp, setLocationcp] = useState ('');
  const [location, setLocation] = useState ('');
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
        const responseCompany = await axios.get('/company/');
        setCompanyList(responseCompany.data);
      } catch (err) {
        console.log(err);
      }

      if (actualCompany > 0) {
        try {
          const { data } = await axios.get(`/company/${actualCompany}`);
          setName(data.name);
          setAddress(data.address);
          setLocationcp(data.locationcp);
          setLocation(data.location);
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
  }, [runOnce, actualCompany]);

  const handleCreate = () => {
    clearData();
    setActualCompany(-1);
    dispatch(actions.isEditing({ isEditing: true }));
  }

  function clearData() {
    setName('');
    setAddress('');
    setLocationcp('');
    setLocation('');
    setPhone('');
    setEmail('');
    setActive('');
  }

  const handleCancelCreate = () => {
    setActualCompany(0);
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
      await axios.delete(`/company/${actualCompany}`);

      setActualCompany(0);
      setRunOnce(true);
      setDeleteAsk(false);
      setEditing(false);
      clearData();
      dispatch(actions.isEditing({ isEditing: false }));

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Company ${name} deleted`,
        msgType: 'info'
      }));

    } catch (err) {
      console.log(err);
    }
  };

  const handleTrClick = (companyId) => {
    if (actualCompany === -1 || editing || deleteAsk) return;
    setActualCompany(companyId);
    setRunOnce(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.length < 5 || name.length > 100) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Company name must have between 5 and 100 characters',
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
        const newCompany = await axios.post('/company/', {
          name,
          address,
          locationcp,
          location,
          defaultlocalsupport: 'temp',
          phone,
          email,
          active: true
        });

        setActualCompany(newCompany.data.id);
        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Company ${name} created`,
          msgType: 'info'
        }));

        dispatch(actions.isEditing({ isEditing: true }));

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(`/company/${actualCompany}`, {
          name,
          address,
          locationcp,
          location,
          phone,
          email,
          active
        });

        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Company ${name} updated`,
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
         <legend><strong>Companies List</strong></legend>
          <section>
              <div className="thid">Id</div>
              <div className="thname">Company name</div>
              <div className="thlocation">Location</div>
              <div className="thsp">Default Local Support</div>
              <div className="thstatus">Status</div>
            </section>
          <Container>
            <table>
              <tbody>
                {companyList.length !== 0 ? (
                  companyList.map((company) => (
                    <tr key={company.id} onClick={() => handleTrClick(company.id)}>
                      <td className="tdid">{company.id}</td>
                      <td className="tdname">{company.name}</td>
                      <td className="tdlocation">{company.location}</td>
                      <td className="tdsp">{company.defaultlocalsupport}</td>
                      <td className="tdstatus">{company.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>There are no Companies</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
        </fieldset>
        <div>
          {actualCompany === -1 && <button type="button" onClick={handleCancelCreate}>Cancel Creation</button>}
          {actualCompany === 0 && <button type="button" onClick={handleCreate}>Create Company</button>}
          {actualCompany > 0 && (editing || deleteAsk) && <button type="button" disabled>Create Company</button>}
          {actualCompany > 0 && (!editing && !deleteAsk) && <button type="button" onClick={handleCreate}>Create Company</button>}
          {actualCompany < 1 || deleteAsk ?
            <button type="button" disabled>Edit Company</button> :
            <button type="button" onClick={handleEdit}>Edit Company</button>
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
          {actualCompany < 1 ?
            <button type="button" disabled>Delete Company</button> :
            <><button type="button" onClick={(e) => handleDeleteAsk(e)}>Delete Company</button>
            <button
              className="deleteB"
              type="button"
              style={{display: 'none'}}
              onClick={handleDelete}
            >Are you sure?</button></>
          }
        </div>
        {actualCompany === 0 ? <></> :
          <fieldset>
            {actualCompany === -1 ? <legend><strong>Company creation</strong></legend> : <legend><strong>Detail of {name}</strong></legend>}
            <ContainerData>
            {actualCompany === -1 || editing ?
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  Company name:
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
                    <><button type="submit">Update Company</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button></>
                  :
                    <><button type="submit">Create Company</button>
                    <button type="button" onClick={() => clearData()}>Clear data</button></>
                  }
                </span>
              </form>
            :
              <form>
                <label htmlFor="name">
                  Company name:
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
