//사진 이미지 미리보기
import { ImgFile } from '../type';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
  let imgLink = undefined;
  let imgName = undefined;
  imgLink = readerFile?.reader?.result;
  imgName = readerFile?.file?.name;
  if (imgLink === null) return null;
  // if (isAbv(imgLink) === true) return null;
  // if (imgName === null || ArrayBuffer) return null;
  return (
    <div
      css={css`
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
      `}
    >
      <img
        css={css`
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        `}
        src={`${imgLink}`}
        srcSet={`${imgName}`}
        alt={imgName}
        loading='lazy'
      />
    </div>
  );
};
export default ImgStyle;
