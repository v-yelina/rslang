import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();

  type Values = {
    username: string;
    password: string;
  }

  const onFinish = (values: Values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = () => {
    console.log('Failed.');
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{
          required: true, message: 'Please input your password!', type: 'string', min: 6,
        }]}
        help="Should be at least 6 symbols"
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
