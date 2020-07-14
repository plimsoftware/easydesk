import React from 'react';

import { Container } from './styled';

export default function Menu() {

    return (
        <Container>
            <button type="button">
                Incident Management
            </button>
            <button type="button">
                Request Management
            </button>
            <button type="button">
                Change Management
            </button>
        </Container>
    );
}
