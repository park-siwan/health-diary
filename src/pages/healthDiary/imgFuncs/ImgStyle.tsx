//사진 이미지 미리보기
import { ImgFile } from '../type';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { grey } from '@mui/material/colors';
import { MouseEvent, useRef } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
interface Props {
  readerFile: ImgFile;
}
function isAbv(value: any) {
  return (
    value &&
    value.buffer instanceof ArrayBuffer &&
    value.byteLength !== undefined
  );
}
const ImgStyle = ({ readerFile }: Props): JSX.Element | null => {
  const retryTextRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  let imgLink = undefined;
  let imgName = undefined;
  imgLink = readerFile?.reader?.result;
  imgName = readerFile?.file?.name;
  if (imgLink === null) return null;
  // if (isAbv(imgLink) === true) return null;
  // if (imgName === null || ArrayBuffer) return null;
  const imgContainer = css`
    display: block;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    margin-right: 16px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
  `;
  const imgCss = css`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    /* :hover {
      filter: brightness(80%);
    } */
  `;
  const retryText = css`
    /* display: block; */
    width: 64px;
    height: 64px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-size: 12px; */
  `;

  const handleHover = (
    e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>
  ): void => {
    if (retryTextRef.current === null || imgRef.current === null) return;
    if (e.type === 'mouseleave') {
      retryTextRef.current.style.opacity = '0';
      imgRef.current.style.filter = '';
      retryTextRef.current.style.zIndex = '0';
    } else {
      retryTextRef.current.style.zIndex = '2';
      retryTextRef.current.style.opacity = '1';
      imgRef.current.style.filter = 'brightness(80%)';
    }
    console.log(e);
  };
  return (
    <div
      css={imgContainer}
      onMouseOver={handleHover}
      onMouseLeave={handleHover}
    >
      <span ref={retryTextRef} css={retryText}>
        <AddPhotoAlternateIcon />
      </span>
      <img
        ref={imgRef}
        css={imgCss}
        src={`${imgLink}`}
        alt={imgName}
        loading='lazy'
      />
    </div>
  );
};
export default ImgStyle;
