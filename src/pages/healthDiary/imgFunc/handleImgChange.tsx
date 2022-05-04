import { FieldValues } from 'react-hook-form';
interface Props {
  e: React.ChangeEvent<HTMLInputElement>;
  field: FieldValues;
  setValue: Function;
}
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
    const imgFile = { reader, file: files[0] };
    setValue(field.name, imgFile);
  };
  reader.readAsDataURL(files[0]);
};
export default handleImgChange;
