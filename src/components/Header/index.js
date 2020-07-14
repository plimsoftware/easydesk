import React from 'react';

import { Nav, NavHeader, NavLeft, NavRight} from './styled';

export default function Header() {
    
    return (
        <Nav>
            <NavHeader>
                <NavLeft>
                    LOGO
                </NavLeft>
                <NavRight>
                    <span>opção 1</span>
                    <span>opção 2</span>
                </NavRight>
            </NavHeader>
        </Nav>
    );
}
