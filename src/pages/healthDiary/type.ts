// type muiTextField = FileList | null;
type ImgFile = {
  reader: FileReader | null;
  file: File | null;
};
export interface ImgFileList {
  descImg: ImgFile;
  morningImg: ImgFile;
  lunchImg: ImgFile;
  dinnerImg: ImgFile;
  snackImg: ImgFile;
}
export interface Inputs extends ImgFileList {
  [x: string]: unknown;
  createDate: Date;
  title: string;
  desc: string;
  morning: string;
  lunch: string;
  dinner: string;
  snack: string;
  nutrients: string;
  sleepTimeStart: Date;
  sleepTimeEnd: Date;
  exercise: string;
  review: string;
}
