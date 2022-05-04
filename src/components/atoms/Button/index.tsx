import React, { ReactChild } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../../constants/colors';
import Flex from '../Flex';
// import Button from '@mui/material/Button';
interface Buttons {
  primary?: boolean;
  children: ReactChild;
  onClick: Function;
}
const BtnStyle = styled.button`
  background-color: ${colors.background};
  padding: 20px 30px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  &:hover {
    background-color: ${colors.tertiary};
  }
`;
export default function Button({ primary, children, onClick }: Buttons) {
  return (
    <Flex fullWidth mb={20} mt={20}>
      <Button onClick={() => onClick()}>{children}</Button>
    </Flex>
  );
}
