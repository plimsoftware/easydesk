import React, { useState } from 'react';

import { Container } from './styled';

export default function Menu() {
  const [incActive, setIncActive] = useState(false);
  const [reqActive, setReqActive] = useState(false);
  const [chgActive, setChgActive] = useState(false);
  const [incLeftValue, setIncLeftValue] = useState({left: '-85px'});
  const [reqLeftValue, setReqLeftValue] = useState({left: '-85px'});
  const [chgLeftValue, setChgLeftValue] = useState({left: '-85px'});
  const [incMenuValue, setIncMenuValue] = useState({top: '7000px'});
  const [reqMenuValue, setReqMenuValue] = useState({top: '7000px'});
  const [chgMenuValue, setChgMenuValue] = useState({top: '7000px'});

  const resetMenu = () => {
    setIncActive(false);
    setReqActive(false);
    setChgActive(false);
    setIncLeftValue({left: '-85px'});
    setReqLeftValue({left: '-85px'});
    setChgLeftValue({left: '-85px'});
    setIncMenuValue({top: '7000px'});
    setReqMenuValue({top: '7000px'});
    setChgMenuValue({top: '7000px'});
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
  };

  return (
        <Container>
            <button className="buttonInc" type="button" style={incLeftValue} onClick={handleInc}>
              {incActive ? <>Voltar</> : <>Incident Management</>}
            </button>
            <button className="buttonReq" type="button" style={reqLeftValue} onClick={handleReq}>
              {reqActive ? <>Voltar</> : <>Request Management</>}
            </button>
            <button className="buttonChg" type="button" style={chgLeftValue} onClick={handleChg}>
              {chgActive ? <>Voltar</> : <>Change Management</>}
            </button>
            <div className="incMenu" style={incMenuValue}>
              <button type="button" className="menuButtom">Create Incident</button>
            </div>
            <div className="reqMenu" style={reqMenuValue}>
              <button type="button" className="menuButtom">Create Request</button>
            </div>
            <div className="chgMenu" style={chgMenuValue}>
              <button type="button" className="menuButtom">Create Change</button>
            </div>
        </Container>
    );
}
