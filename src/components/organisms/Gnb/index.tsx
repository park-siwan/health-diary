import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Flex from '../../atoms/Flex';
import { colors } from '../../../constants/colors';
const isActiveStyle = {
  fontWeight: '900',
  color: colors.blue,
};
const GnbContainer = styled.ul`
  width: 100%;
  display: flex;
`;
const Span = styled.span`
  font-size: 16px;
`;
const Li = styled.li`
  font-size: 16px;
  :not(:last-child) {
    margin-right: 10px;
  }
`;

export default function Gnb() {
  return (
    <>
      <Flex fullWidth height={80}>
        <Li>
          <NavLink
            to='/#intro'
            style={({ isActive }) => (isActive ? isActiveStyle : {})}
          >
            <Span>소개</Span>
          </NavLink>
        </Li>
        <Li>
          <NavLink
            to='/#healthDiary'
            style={({ isActive }) => (isActive ? isActiveStyle : {})}
          >
            <Span>프로젝트 목록</Span>
          </NavLink>
        </Li>
      </Flex>
      <hr />
    </>
  );
}
