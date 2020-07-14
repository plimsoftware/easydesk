import React from 'react';

import { Container} from './styled';
import Menu from '../../components/Menu';
import ListCases from '../../components/ListCases';

export default function Header() {

    return (
        <Container>
            <div className="split left">
                <div className="centered">
                    <Menu />
                </div>
            </div>
            <div className="split right">
                <ListCases />
            </div>
        </Container>
    );
}
