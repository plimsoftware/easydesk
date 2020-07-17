import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { Nav, NavHeader, NavLeft, NavRight} from './styled';
import Logo from '../../img/easydesk.png';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = (evt) => {
    evt.preventDefault();
    dispatch(actions.logout());
    history.push('/');
  };

    return (
        <Nav>
            <NavHeader>
                <NavLeft>
                    <img src={Logo} alt="EasyDesk" />
                </NavLeft>
                <NavRight>
                  { isLoggedIn ? <span title="Logout" onClick={handleClick}>Logout <FaPowerOff size={15} /> </span> : <></>}
                </NavRight>
            </NavHeader>
        </Nav>
    );
}
