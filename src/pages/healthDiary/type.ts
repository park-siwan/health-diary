// type muiTextField = FileList | null;
interface ImgFile {
  reader: null | FileReader;
  file: null | File;
}
export interface ImgFileList {
  descImg: ImgFile | null;
  morningImg: ImgFile | null;
  lunchImg: ImgFile | null;
  dinnerImg: ImgFile | null;
  snackImg: ImgFile | null;
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
