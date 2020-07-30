import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUndo } from 'react-icons/fa';

import { Container, ContainerData, MainContainer, SelectStyle, SelectStyleLS } from './styled';
import * as actions from '../../store/modules/auth/actions';
import formatData from '../../modules/FormatData'
import axios from '../../services/axios';

export default function AdminCategories() {
  const [categoryList, setCategoryList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [catlv2, setCatlv2] = useState([]);
  const [type, setType] = useState('');
  const [defaultteam, setDefaultteam] = useState('');
  const [actualCategory, setActualCategory] = useState(0);
  const [description, setDescription] = useState ('');
  const [parent, setParent] = useState (0);
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
        const responseCompany = await axios.get('/category/?full=true');
        setCategoryList(responseCompany.data);
      } catch (err) {
        console.log(err);
      }

      try {
        const responseTeam = await axios.get('/teams/');
        setTeamList(responseTeam.data);
      } catch (err) {
        console.log(err);
      }

      if (actualCategory > 0) {
        try {
          const { data } = await axios.get(`/category/${actualCategory}`);
          setDescription(data.description);
          setActive(data.active);
          setParent(data.parent);
          setDefaultteam(data.defaultteam);
          setCatlv2(data.Categories);
          setType(data.type);
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
  }, [runOnce, actualCategory]);

  const handleCreate = () => {
    clearData();
    setActualCategory(-1);
    dispatch(actions.isEditing({ isEditing: true }));
  }

  function clearData() {
    setDescription('');
    setParent(0);
    setType('');
    setDefaultteam('');
    setCatlv2([]);
    setActive('');
  }

  const handleCancelCreate = () => {
    setActualCategory(0);
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
      await axios.delete(`/category/${actualCategory}`);

      setActualCategory(0);
      setRunOnce(true);
      setDeleteAsk(false);
      setEditing(false);
      clearData();
      dispatch(actions.isEditing({ isEditing: false }));

      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: `Category ${description} deleted`,
        msgType: 'info'
      }));

    } catch (err) {
      console.log(err);
    }
  };

  const handleTrClick = (categoryId) => {
    if (actualCategory === -1 || editing || deleteAsk) return;
    setActualCategory(categoryId);
    setRunOnce(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (description.length < 4 || description.length > 200) {
      dispatch(actions.setMessage({
        msgEnabled: true,
        msg: 'Description must have between 4 and 200 characters',
        msgType: 'error'
      }));
      return;
    }

    if (!editing) {
      try {
        const newCategory = await axios.post('/category/', {
          description,
          type,
          defaultteam,
          parent,
          active: true
        });

        setActualCategory(newCategory.data.id);
        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Category ${description} created`,
          msgType: 'info'
        }));

        dispatch(actions.isEditing({ isEditing: true }));

      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(`/category/${actualCategory}`, {
          description,
          type,
          defaultteam,
          parent,
          active
        });

        setRunOnce(true);

        dispatch(actions.setMessage({
          msgEnabled: true,
          msg: `Category ${description} updated`,
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
         <legend><strong>Categories Level 1 List</strong></legend>
          <section>
              <div className="thid">Id</div>
              <div className="thname">Description</div>
              <div className="thstatus">Status</div>
            </section>
          <Container>
            <table>
              <tbody>
                {categoryList.length !== 0 ? (
                  categoryList.map((category) => (
                    <tr key={category.id} onClick={() => handleTrClick(category.id)}>
                      <td className="tdid">{category.id}</td>
                      <td className="tdname">{category.description}</td>
                      <td className="tdstatus">{category.active ? 'Active' : 'Disabled' }</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>There are no Categories</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Container>
        </fieldset>
        <div>
          {actualCategory === -1 && <button type="button" onClick={handleCancelCreate}>Cancel Creation</button>}
          {actualCategory === 0 && <button type="button" onClick={handleCreate}>Create Category</button>}
          {actualCategory > 0 && (editing || deleteAsk) && <button type="button" disabled>Create Category</button>}
          {actualCategory > 0 && (!editing && !deleteAsk) && <button type="button" onClick={handleCreate}>Create Category</button>}
          {actualCategory < 1 || deleteAsk ?
            <button type="button" disabled>Edit Category</button> :
            <button type="button" onClick={handleEdit}>Edit Category</button>
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
          {actualCategory < 1 ?
            <button type="button" disabled>Delete Category</button> :
            <><button type="button" onClick={(e) => handleDeleteAsk(e)}>Delete Category</button>
            <button
              className="deleteB"
              type="button"
              style={{display: 'none'}}
              onClick={handleDelete}
            >Are you sure?</button></>
          }
        </div>
        {actualCategory === 0 ? <></> :
          <fieldset>
            {actualCategory === -1 ? <legend><strong>Category creation</strong></legend> : <legend><strong>Detail of {description}</strong></legend>}
            <ContainerData>
            {actualCategory === -1 || editing ?
              <>
              <form onSubmit={handleSubmit}>
                <label htmlFor="description">
                  Description:
                  <input
                    type="text"
                    className="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Insert category description"
                  />
                </label>
                <label htmlFor="lsteam">
                    Default Team:
                    <SelectStyleLS
                      id="lsteam"
                      name="lsteam"
                      value={defaultteam}
                      onChange={(e) => setDefaultteam(e.currentTarget.value)}
                    >
                    <option value="" disabled hidden>Choose here</option>
                    {teamList.map((team) => (
                        <option value={team.name} key={team.name}>
                          {team.name}
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
                    <><button type="submit">Update Category</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button></>
                  :
                    <><button type="submit">Create Category</button>
                    <button type="button" onClick={() => clearData()}>Clear data</button></>
                  }
                </span>
              </form>
              <fieldset>
              <legend><strong>Level 2</strong></legend>
                <fieldset>
                <legend><strong>Level 3</strong></legend>
                </fieldset>
              </fieldset>
              </>
            :
              <>
              <form>
                <label htmlFor="name">
                  Description:
                  <input
                    type="text"
                    className="name"
                    value={description}
                    readOnly
                  />
                </label>
                <label htmlFor="lsteam">
                  Default Team:
                  <input
                    type="text"
                    className="lsteam"
                    value={defaultteam}
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
              <legend><strong>Level 2</strong></legend>
                <fieldset>
                <legend><strong>Level 3</strong></legend>
                </fieldset>
              </fieldset>
              </>
            }
            </ContainerData>
          </fieldset>
        }
      </MainContainer>
    );
}
