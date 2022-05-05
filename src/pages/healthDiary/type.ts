export interface ImgFile {
  reader: FileReader | null;
  file: File | null;
}
export type ImgFileList =
  | 'descImg'
  | 'morningImg'
  | 'lunchImg'
  | 'dinnerImg'
  | 'snackImg';

export interface Inputs {
  [x: string | number | symbol]: any;
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
  morningImg: ImgFile;
  lunchImg: ImgFile;
  dinnerImg: ImgFile;
  snackImg: ImgFile;
}
