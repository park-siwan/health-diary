import React, { useState } from 'react';
import classNames from 'classnames/bind';
import home from './_home.module.scss';

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Gnb from '../../components/organisms/Gnb';
const cx = classNames.bind(home);

const Home = () => {
  return (
    <>
      <Gnb />
      <div className='container'>
        <div className='row'>
          <div className={cx('home')}>
            <div className='col-sm-4'>
              <h1>프론트엔드 개발자 박시완</h1>
              <h2 id='intro'>소개</h2>
              <p>
                React, TypeScript 등을 이용하여 프론트 개발을 하고있다.
                여행플랫폼 회사(트리피누)에서 11개월 근무하였다.
              </p>
              <h2 id='healthDiary'>프로젝트 목록</h2>
              <Link to='/healthDiary'>건강 일기</Link>
              {/* <h2>폰트적용</h2> */}
              {/* <input className='form-input' type='text' /> */}
              {/* <button>버튼</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
