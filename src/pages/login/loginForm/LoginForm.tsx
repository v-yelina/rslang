import React, { FC } from 'react';
import {
  Alert, Button, Form, Input,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearError } from '../../../store/slices/auth';
import { login } from '../../../store/thunks';
import { Values } from '../registrationForm/RegistrationForm';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const onFinish = (values: Pick<Values, 'email' | 'password'>) => {
    dispatch(clearError());
    dispatch(login(values));
  };

  const onFinishFailed = () => {
    console.log('Login failed, please try again');
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {error && <Alert message={error} type="error" />}
      <h3>Log In</h3>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
