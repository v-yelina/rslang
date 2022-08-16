import React, { FC } from 'react';
import { ButtonProps } from 'antd/lib/button/button';
import { Button as AntdButton } from 'antd';

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <AntdButton {...props}>{children}</AntdButton>
);

export default Button;
