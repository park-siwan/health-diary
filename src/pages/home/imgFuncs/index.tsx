import { FieldValues, UseFormResetField } from 'react-hook-form';

import { ImgFile, ImgFileList, Inputs } from '../type';
import ImgStyle from './ImgStyle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button } from '@mui/material';
const ImgFuncs = ({
  name,
  currentRHF,
  resetField,
}: {
  name: ImgFileList;
  currentRHF: Inputs;
  resetField: UseFormResetField<FieldValues>;
}): JSX.Element | null => {
  const AddPictureIcon = ({ ariaLabel }: { ariaLabel: string }) => (
    <Button
      color='inherit'
      aria-label={ariaLabel}
      component='span'
      variant='outlined'
      sx={{ height: 64, mr: 2, borderColor: 'grey.300' }}
    >
      <AddPhotoAlternateIcon sx={{ color: 'grey.300' }} />
    </Button>
  );
  // console.log(currentRHF);
  const readerFile: ImgFile = currentRHF[name];
  if (readerFile?.src === undefined) {
    return <AddPictureIcon ariaLabel={`upload ${name} picture`} />;
  } else {
    return (
      <ImgStyle name={name} readerFile={readerFile} resetField={resetField} />
    );
  }
};
export default ImgFuncs;
