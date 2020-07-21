import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styled';

export default function Menu() {
  const { profile } = useSelector((state) => state.auth.client);
  const [incActive, setIncActive] = useState(false);
  const [reqActive, setReqActive] = useState(false);
  const [chgActive, setChgActive] = useState(false);
  const [admActive, setAdmActive] = useState(false);
  const [incLeftValue, setIncLeftValue] = useState({left: '-85px'});
  const [reqLeftValue, setReqLeftValue] = useState({left: '-85px'});
  const [chgLeftValue, setChgLeftValue] = useState({left: '-85px'});
  const [admLeftValue, setAdmLeftValue] = useState({left: '-85px'});
  const [incMenuValue, setIncMenuValue] = useState({top: '7000px'});
  const [reqMenuValue, setReqMenuValue] = useState({top: '7000px'});
  const [chgMenuValue, setChgMenuValue] = useState({top: '7000px'});
  const [admMenuValue, setAdmMenuValue] = useState({top: '7000px'});

  const resetMenu = () => {
    setIncActive(false);
    setReqActive(false);
    setChgActive(false);
    setAdmActive(false);
    setIncLeftValue({left: '-85px'});
    setReqLeftValue({left: '-85px'});
    setChgLeftValue({left: '-85px'});
    setAdmLeftValue({left: '-85px'});
    setIncMenuValue({top: '7000px'});
    setReqMenuValue({top: '7000px'});
    setChgMenuValue({top: '7000px'});
    setAdmMenuValue({top: '7000px'});
  };

  const handleInc = () => {
    if (incActive) {
      resetMenu();
      return;
    }

    setIncActive(true);
    setIncMenuValue({top: '110px'})
    setReqActive(false);
    setReqLeftValue({left: '-300px'});
    setChgActive(false);
    setChgLeftValue({left: '-300px'});
    setAdmActive(false);
    setAdmLeftValue({left: '-300px'});
  };

  const handleReq = () => {
    if (reqActive) {
      resetMenu();
      return;
    }
    setIncActive(false);
    setIncLeftValue({left: '-300px'});
    setReqActive(true);
    setReqMenuValue({top: '110px'})
    setReqLeftValue({top: '50px', left: '-85px'});
    setChgActive(false);
    setChgLeftValue({left: '-300px'});
    setAdmActive(false);
    setAdmLeftValue({left: '-300px'});
  };

  const handleChg = () => {
    if (chgActive) {
      resetMenu();
      return;
    }
    setIncActive(false);
    setIncLeftValue({left: '-300px'});
    setReqActive(false);
    setReqLeftValue({left: '-300px'});
    setChgActive(true);
    setChgMenuValue({top: '110px'})
    setChgLeftValue({top: '50px', left: '-85px'});
    setAdmActive(false);
    setAdmLeftValue({left: '-300px'});
  };

  const handleAdm = () => {
    if (admActive) {
      resetMenu();
      return;
    }
    setIncActive(false);
    setIncLeftValue({left: '-300px'});
    setReqActive(false);
    setReqLeftValue({left: '-300px'});
    setChgActive(false);
    setChgLeftValue({left: '-300px'});
    setAdmActive(true);
    setAdmMenuValue({top: '110px'})
    setAdmLeftValue({top: '50px', left: '-85px'});
  };

  return (
        <Container>
            <button className="buttonInc" type="button" style={incLeftValue} onClick={handleInc}>
              {incActive ? <>Back</> : <>Incident Management</>}
            </button>
            <button className="buttonReq" type="button" style={reqLeftValue} onClick={handleReq}>
              {reqActive ? <>Back</> : <>Request Management</>}
            </button>
            <button className="buttonChg" type="button" style={chgLeftValue} onClick={handleChg}>
              {chgActive ? <>Back</> : <>Change Management</>}
            </button>
            { profile === 'Administrator' ?
              <button className="buttonAdm" type="button" style={admLeftValue} onClick={handleAdm}>
                {admActive ? <>Back</> : <>Admin Console</>}
              </button>
              : <></>
            }
            <div className="incMenu" style={incMenuValue}>
              <button type="button" className="menuButtom">Create Incident</button>
            </div>
            <div className="reqMenu" style={reqMenuValue}>
              <button type="button" className="menuButtom">Create Request</button>
            </div>
            <div className="chgMenu" style={chgMenuValue}>
              <button type="button" className="menuButtom">Create Change</button>
            </div>
            <div className="admMenu" style={admMenuValue}>
              <button type="button" className="menuButtom">Company</button>
            </div>
        </Container>
    );
}
