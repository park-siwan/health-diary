import { FileReadResult } from 'fs/promises';

export interface ImgFile {
  // reader: FileReadResult<ArrayBufferView> | null;
  file: File | null;
  src?: string;
  buffer?: Buffer;
  reader?: FileReader;
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
