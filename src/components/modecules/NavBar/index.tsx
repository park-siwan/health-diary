import React, { ReactNode } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { zIndexList } from '../../../constants/zIndex';
// import { ReactJSXElementChildrenAttribute } from '@emotion/react/types/jsx-namespace';
interface Props {
  gnb?: boolean;
  lnb?: boolean;
  children: ReactNode;
  height?: string;
}
export default function NavBar({ gnb, lnb, children, height = '72px' }: Props) {
  const header = css`
    display: block;
    position: relative;
    width: 100%;
    background-color: white;
    height: ${height};
  `;
  const headerWrap = css`
    position: fixed;
    width: 100%;
    background-color: white;
    box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
    height: ${height};
    z-index: ${zIndexList.nav};
  `;
  const container = css`
    height: 100%;
  `;
  const row = css`
    width: 100%;
    height: 100%;
  `;
  const navStyle = css`
    display: flex;
    justify-content: ${gnb ? 'space-between' : 'end'};
    align-items: center;
    /* padding: ${gnb ? '10px' : '5px'}; */
    height: 100%;
  `;

  return (
    <header css={header}>
      <div css={headerWrap}>
        <div className='container' css={container}>
          <div className='row' css={row}>
            <div className='col-sm-4'>
              <nav css={navStyle}>{children}</nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
