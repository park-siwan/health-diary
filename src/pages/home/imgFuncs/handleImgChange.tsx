import { FieldValues } from 'react-hook-form';
import { Inputs } from '../type';

const handleImgChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: FieldValues,
  setValue: Function
): void => {
  const { files } = e.target;
  if (files === undefined || files === null) return;
  field.onChange(files);
  const reader = new FileReader();
  reader.onload = () => {
    const imgFile = { file: files[0], src: reader.result };
    if (setValue === undefined) return;
    console.log(field.name, imgFile);
    setValue(field.name, imgFile, {
      shouldValidate: true,
    });
  };
  reader.readAsDataURL(files[0]);
};
export default handleImgChange;
