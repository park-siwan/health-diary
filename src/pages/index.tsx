import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
// import HealthDiary from './Home';
import Gnb from '../components/organisms/Gnb';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ModalHook from '../components/modecules/Modal';
export default function Pages() {
  return (
    <>
      <Gnb />
      <ModalHook />
      <div
        css={css`
          min-height: 100vh;
          margin-top: 20px;
        `}
      >
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </>
  );
}
