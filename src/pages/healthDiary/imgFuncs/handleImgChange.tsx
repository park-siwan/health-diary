import { FieldValues } from 'react-hook-form';
import { Inputs } from '../type';

const handleImgChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: FieldValues,
  reset: Function,
  currentRHF: Inputs
): void => {
  const { files } = e.target;
  if (files === undefined || files === null) return;
  field.onChange(files);
  const reader = new FileReader();
  reader.onload = () => {
    const imgFile = { reader, file: files[0] };
    reset({ ...currentRHF, [field.name]: imgFile });
  };
  reader.readAsDataURL(files[0]);
};
export default handleImgChange;
