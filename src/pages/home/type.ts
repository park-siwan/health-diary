import { FileReadResult } from 'fs/promises';

export interface ImgFile {
  // reader: FileReadResult<ArrayBufferView> | null;
  file: File | null;
  src?: string;
  // buffer?: Buffer;
  // reader?: FileReader;
}
export type ImgFileList =
  | 'descImg'
  | 'morningImg'
  | 'lunchImg'
  | 'dinnerImg'
  | 'snackImg';

export type date = number | Date;
export interface Inputs {
  [x: string | number | symbol]: any;
  createDate: date;
  title: string;
  desc: string;
  morning: string;
  lunch: string;
  dinner: string;
  snack: string;
  nutrients: string;
  sleepTimeStart: date;
  sleepTimeEnd: date;
  exercise: string;
  review: string;
  morningImg: ImgFile;
  lunchImg: ImgFile;
  dinnerImg: ImgFile;
  snackImg: ImgFile;
}

export interface GnbType {
  [x: string]: boolean;
  list: boolean;
  preview: boolean;
}
