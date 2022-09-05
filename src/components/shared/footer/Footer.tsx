import React, { FC } from 'react';
import { Layout, Col, Row } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import './footer.scss';

const { Footer } = Layout;

const FooterComp: FC = () => (
  <Footer id="footer" className="footer">
    <Row justify="space-between" className="footer__wrapper">
      <Col span={16}>
        <Row className="footer__links">
          <Col span={8}>
            <a className="footer__link" href="https://github.com/v-yelina">
              <GithubOutlined />
              {' '}
              Valiantsina Yelina
            </a>
          </Col>
          <Col span={8}>
            <a className="footer__link" href="https://github.com/nina-si">
              <GithubOutlined />
              {' '}
              Nina Sitaeva
            </a>
          </Col>
          <Col span={8}>
            <a className="footer__link" href="https://github.com/Eremor">
              <GithubOutlined />
              {' '}
              Artem Smirnov
            </a>
          </Col>
        </Row>
      </Col>
      <Col span={8} className="footer__school">
        <Row justify="space-around" align="middle">
          <Col span={4} className="footer__year">2022</Col>
          <Col span={4}>
            <a className="footer__logo" href="https://rs.school/js/">
              <img src="https://rs.school/images/rs_school_js.svg" alt="Course logo" width="100" />
            </a>
          </Col>
        </Row>
      </Col>
    </Row>
  </Footer>
);

export default FooterComp;
