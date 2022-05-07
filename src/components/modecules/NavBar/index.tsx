import React, { ReactNode } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import { ReactJSXElementChildrenAttribute } from '@emotion/react/types/jsx-namespace';
interface Props {
  children: ReactNode;
}
export default function NavBar({ children }: Props) {
  const header = css`
    display: block;
    position: relative;
    height: 80px;
    width: 100%;
    background-color: white;
  `;
  const headerWrap = css`
    z-index: 100;
    position: fixed;
    width: 100%;
    background-color: white;
    /* box-shadow: 0 1px 4px rgb(0 0 0 / 12%); */
    height: 80px;
  `;
  return (
    <header css={header}>
      <div css={headerWrap}>
        <div
          className='container'
          css={css`
            height: 100%;
          `}
        >
          <div
            className='row'
            css={css`
              width: 100%;
              height: 100%;
            `}
          >
            <div className='col-sm-4'>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 10px;
                  height: 100%;
                `}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
