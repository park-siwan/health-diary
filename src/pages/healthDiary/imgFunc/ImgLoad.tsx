//사진 이미지 미리보기
import { ImgFileList, Inputs } from '../type';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
type imgLinkName = string | undefined;

interface Props {
  name: keyof ImgFileList;
  currentRHF: any;
}
// const AddPhotoIcon = ({ ariaLabel }: { ariaLabel: string }) => (
//   <IconButton aria-label={ariaLabel} component='span'>
//     <AddPhotoAlternateIcon />
//   </IconButton>
// );

const ImgLoad = ({ name, currentRHF }: Props): JSX.Element | null => {
  // const current = getValues();
  let imgLink: imgLinkName = undefined;
  let imgName: imgLinkName = undefined;
  if (
    currentRHF === null ||
    currentRHF[name] === null ||
    currentRHF[name]?.reader === null ||
    currentRHF[name]?.file === null ||
    currentRHF?.[name]?.file?.name === null ||
    currentRHF[name]?.reader?.result === null
  ) {
    return null;
  }
  imgLink = currentRHF[name]?.reader?.result as string;
  imgName = currentRHF?.[name]?.file?.name;
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
export default ImgLoad;
