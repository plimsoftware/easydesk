import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Container, MainContainer } from './styled';
import axios from '../../services/axios';

export default function ListCases() {
  const [runOnce, setRunOnce] = useState(true);
  const [taskView, setTaskView] = useState('team')
  const [taskList, setTaskList] = useState([]);
  const [taskNr, setTaskNr] = useState ('');
  const [title, setTitle] = useState ('');
  const [description, setDescription] = useState ('');
  const [type, setType] = useState ('');
  const [categorynv1, setCategorynv1] = useState ('');
  const [categorynv2, setCategorynv2] = useState ('');
  const [categorynv3, setCategorynv3] = useState ('');
  const [status, setStatus] = useState ('');
  const [phone, setPhone] = useState (0);
  const [email, setEmail] = useState ('');
  const [companyid, setCompanyid] = useState (0);
  const [clientid, setClientid] = useState (0);
  const [reopenings, setReopenings] = useState (0);
  const [reclassified, setReclassified] = useState (false);
  const [name, setName] = useState ('');
  const [company, setCompany] = useState ('');
  const [assigneduser, setAssigneduser] = useState ('');
  const [assignedteam, setAssignedteam] = useState ('');
  const [completed, setCompleted] = useState ('');
  const [closed, setClosed] = useState ('');
  const [canceled, setCanceled] = useState ('');
  const [incidentHists, setIncidentHists] = useState ([]);
  const [actualTask, setActualTask] = useState(0);
  const [actualType, setActualType] = useState('');
  const { username } = useSelector((state) => state.auth.client);

  function updateFields(data) {
    setTaskNr(data.type + data.id);
    setTitle(data.title);
    setDescription(data.description);
    setType(data.type);
    setCategorynv1(data.categorynv1);
    setCategorynv2(data.categorynv2);
    setCategorynv3(data.categorynv3);
    setStatus(data.status);
    setPhone(data.phone);
    setEmail(data.email);
    setCompanyid(data.companyid);
    setClientid(data.clientid);
    setReopenings(data.reopenings);
    setReclassified(data.reclassified);
    setName(data.name);
    setCompany(data.company);
    setAssigneduser(data.assigneduser);
    setAssignedteam(data.assignedteam);
    setCompleted(data.completed_at);
    setClosed(data.closed_at);
    setCanceled(data.canceled_at);
    setIncidentHists(data.IncidentHists);
  }

  function clearFields(data) {
    setTaskNr('');
    setTitle('');
    setDescription('');
    setType('');
    setCategorynv1('');
    setCategorynv2('');
    setCategorynv3('');
    setStatus('');
    setPhone(0);
    setEmail('');
    setCompanyid(0);
    setClientid(0);
    setReopenings(0);
    setReclassified(false);
    setName('');
    setCompany('');
    setAssigneduser('');
    setAssignedteam('');
    setCompleted('');
    setClosed('');
    setCanceled('');
    setIncidentHists([]);
  }

  useEffect(() => {
    async function getData() {
      try {
        setActualTask(0);
        clearFields();
        if (taskView === 'team') {
          const responseUserTeams = await axios.get(`/teammembers/?username=${username}`);
          let querySearch= '';

          responseUserTeams.data.forEach((team, index) => {
            if (index === 0 ) {
              querySearch += `?assignedteam=${team.Team.name}`
            } else {
              querySearch += `&assignedteam=${team.Team.name}`
            }
          });

          if (querySearch.length > 0) {
            const responseTasks = await axios.get(`/incident/${querySearch}`);
            setTaskList(responseTasks.data);
            if (responseTasks.data.length > 0) {
              setActualTask(responseTasks.data[0].id);
              updateFields(responseTasks.data[0]);
            }
            if (responseTasks.data.length > 0) setActualType(responseTasks.data[0].type);
          } else {
            const responseTasks = await axios.get(`/incident/`);
            setTaskList(responseTasks.data);
            if (responseTasks.data.length > 0) {
              setActualTask(responseTasks.data[0].id);
              updateFields(responseTasks.data[0]);
            }
            if (responseTasks.data.length > 0) setActualType(responseTasks.data[0].type);
          }
        } else {
          const responseTasks = await axios.get(`/incident/?assigneduser=${username}`);
          setTaskList(responseTasks.data);
          if (responseTasks.data.length > 0) {
            setActualTask(responseTasks.data[0].id);
            updateFields(responseTasks.data[0]);
          }
          if (responseTasks.data.length > 0) setActualType(responseTasks.data[0].type);
        }

        setRunOnce(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (runOnce) getData();
  }, [runOnce, username ]);

    return (
      <MainContainer>
        <fieldset>
         {taskView === 'team' && <legend><strong>Tasks (my teams)</strong></legend>}
         {taskView === 'me' && <legend><strong>Tasks (assigned to me)</strong></legend>}
         <section>
            <div className="thid">Id</div>
            <div className="thtitle">Title</div>
            <div className="thclient">Client</div>
            <div className="thcompany">Company</div>
            <div className="thstatus">Status</div>
            <div className="thteam">Assigned to</div>
          </section>
          <Container>
            <table>
              <tbody>
                {taskList.length !== 0 ? (
                  taskList.map((task) => (
                    <tr key={task.type + task.id} onClick={() => {}}>
                      <td className="tdid" style={{textTransform: 'capitalize'}}>{task.type}{task.id}</td>
                      <td className="tdtitle">{task.title}</td>
                      <td className="tdclient">{task.name}</td>
                      <td className="tdcompany">{task.company}</td>
                      <td className="tdstatus">{task.status}</td>
                      <td className="tdteam">{task.assigneduser}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>There are no Tasks</td>
                  </tr>
                )}
              </tbody>
            </table>

          </Container>
        </fieldset>
        <section>
          <button type="button" onClick={() => {
                setTaskView('team');
                setRunOnce(true);
              }}>Tasks in my teams</button>
              <button type="button" onClick={() => {
                setTaskView('me');
                setRunOnce(true);
              }}>Tasks assigned to me</button>
        </section>
        { actualTask !== 0 && <fieldset>
        <legend><strong>Detail</strong></legend>
          <Container>
          <span className="titletask">{taskNr}</span>
            <p></p>
          </Container>
        </fieldset>}
      </MainContainer>
    );
}
