// @flow

import React from 'react';

import { Link } from 'react-router';

import { Container, Row, Col } from 'reactstrap';

export default function MainLayout(props:any) {
  const title = 'Zonky Stats';
  return (
    <Container>
      <Row>
        <Col>
          <div class="jumbotron">
            <h1>{title}</h1>
            <Row>
              <Col>
                <ul class=" nav justify-content-center">
                  <li>
                    <Link to="loans" activeClassName="active" class="nav-item nav-link">Loans</Link>
                  </li>
                  {/* <li>
                    <Link to="main" activeClassName="active" class="nav-item nav-link">Main</Link>
                  </li> */}
                </ul>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
}
