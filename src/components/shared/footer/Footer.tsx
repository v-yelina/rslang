import React, { FC } from 'react';
import { Layout, Col, Row } from 'antd';
import {
  GithubOutlined
} from '@ant-design/icons';

const { Footer } = Layout;

const FooterComp: FC = () => (
  <Footer>
    <Row justify="space-between">
      <Col span={8}>
        <Row>
          <Col span={8}><a className="github-link" href="https://github.com/v-yelina"><GithubOutlined /> Valiantsina Yelina</a></Col>
          <Col span={8}><a className="github-link" href="https://github.com/nina-si"><GithubOutlined /> Nina Sitaeva</a></Col>
          <Col span={8}><a className="github-link" href="https://github.com/Eremor"><GithubOutlined /> Artem Smirnov</a></Col>
        </Row>
      </Col>
      <Col span={4}>
        <Row justify="space-around" align="middle">
          <Col span={4}>2022</Col>
          <Col span={4} ><a className="school-link" href="https://rs.school/js/"
          ><img src="https://rs.school/images/rs_school_js.svg" alt="Course logo" width="100"
            /></a></Col>
        </Row>
      </Col>
    </Row>
  </Footer>
);

export default FooterComp;
