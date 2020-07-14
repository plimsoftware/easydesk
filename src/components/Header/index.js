import React from 'react';

import { Nav, NavHeader, NavLeft, NavRight} from './styled';
import Logo from '../../img/easydesk.png';

export default function Header() {

    return (
        <Nav>
            <NavHeader>
                <NavLeft>
                    <img src={Logo} alt="EasyDesk" />
                </NavLeft>
                <NavRight>
                    <span>opção 1</span>
                    <span>opção 2</span>
                </NavRight>
            </NavHeader>
        </Nav>
    );
}
