//사진 이미지 미리보기
import { ImgFile, Inputs } from '../type';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { grey } from '@mui/material/colors';
import { MouseEvent, useRef } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/system';
import { shadows } from '@mui/system';
import { UseFormResetField } from 'react-hook-form';
interface Props {
  readerFile: ImgFile;
  resetField: UseFormResetField<Inputs>;
  name: string;
}
// function isAbv(value: any) {
//   return (
//     value &&
//     value.buffer instanceof ArrayBuffer &&
//     value.byteLength !== undefined
//   );
// }
const ImgStyle = ({
  readerFile,
  resetField,
  name,
}: Props): JSX.Element | null => {
  const retryRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const deleteRef = useRef<HTMLDivElement>(null);
  let imgLink = undefined;
  let imgName = undefined;
  imgLink = readerFile?.src;
  imgName = readerFile?.file?.name;
  if (imgLink === null) return null;
  // if (isAbv(imgLink) === true) return null;
  // if (imgName === null || ArrayBuffer) return null;
  const imgContainer = css`
    width: 64px;
    height: 64px;
    display: block;
    flex-shrink: 0;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    margin-right: 16px;
    border-radius: 4px;
    cursor: pointer;
  `;
  const imgCss = css`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  `;
  const retryBox = css`
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
    if (
      retryRef.current === null ||
      imgRef.current === null ||
      deleteRef.current === null
    )
      return;
    if (e.type === 'mouseleave') {
      imgRef.current.style.filter = '';
      retryRef.current.style.opacity = '0';
      retryRef.current.style.zIndex = '0';
      deleteRef.current.style.opacity = '0';
    } else {
      imgRef.current.style.filter = 'brightness(80%)';
      retryRef.current.style.zIndex = '2';
      retryRef.current.style.opacity = '1';
      deleteRef.current.style.opacity = '1';
    }
  };
  const DELETE_SIZE = '24px';

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    resetField(name);
  };
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {/* 이미지 삭제 */}
      <div
        ref={deleteRef}
        css={css`
          opacity: 0;
        `}
        onMouseOver={handleHover}
        onMouseLeave={handleHover}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-10px',
            right: '7px',
            borderRadius: '50%',
            width: `${DELETE_SIZE}`,
            height: `${DELETE_SIZE}`,
            zIndex: 2,
            backgroundColor: 'white',
          }}
        ></Box>
        <IconButton
          onClick={handleDelete}
          sx={{ backgroundColor: 'white', boxShadow: 4 }}
          css={css`
            position: absolute;
            top: -10px;
            right: 7px;
            border-radius: 50%;
            width: ${DELETE_SIZE};
            height: ${DELETE_SIZE};
            z-index: 3;
          `}
        >
          <ClearIcon fontSize='small' sx={{ color: grey[500], fontSize: 16 }} />
        </IconButton>
      </div>
      <div
        css={imgContainer}
        onMouseOver={handleHover}
        onMouseLeave={handleHover}
      >
        {/* 이미지 다시넣기 */}
        <div ref={retryRef} css={retryBox}>
          <AddPhotoAlternateIcon />
        </div>
        <img
          ref={imgRef}
          css={imgCss}
          src={`${imgLink}`}
          alt={imgName}
          loading='lazy'
        />
      </div>
    </div>
  );
};
export default ImgStyle;
