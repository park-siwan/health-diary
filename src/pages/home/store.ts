import { atom } from 'recoil';
// , selector, useRecoilState, useRecoilValue
import { ImgFile, Inputs } from './type';
// import add from "date-fns/add";
import { add, set } from 'date-fns';
const date = new Date();
const goToBedTime = set(date, { hours: 23, minutes: 0 });
const wakeUpTime = add(goToBedTime, { hours: 8, minutes: 30 });
const reader = new FileReader();
// const file = new File(0, 'fake.jpg');
// const buffer = Buffer.from(file).toString('base64');
const FileReaderObj: ImgFile = {
  file: null,
  src: undefined,
  // buffer: undefined,
  // reader: undefined,
};
export const diaryDefaultValue = {
  createDate: date,
  title: '오늘의 건강일기',
  desc: '아침 수업이 있어서 7시에 일어나 시리얼을 먹고 학교를 갔다.\n\n점심은 2시쯤 집에와서 떡갈비, 스팸, 검은콩, 일미를 차려서 먹었다.\n\n저녁은 8시에 국밥을 먹고 집을 갔다.\n\n매일 학교 갈때 올때 걸어다니며, 오늘은 6시에 테니스 동아리가 있어서 2시간정도 유산소 운동을 했다.',
  morning: '시리얼',
  lunch: '떡갈비, 스팸, 검은콩, 일미',
  dinner: '국밥',
  snack: '아메리카노',
  nutrients: '유산균, 비타민C, 오메가3',
  sleepTimeStart: goToBedTime,
  sleepTimeEnd: wakeUpTime,
  exercise: '테니스 운동을 2시간 했다.',
  review: '유산소 운동 2시간 하고 밥도 잘 챙겨먹었다.',
  // descImg: FileReaderObj,
  morningImg: FileReaderObj,
  lunchImg: FileReaderObj,
  dinnerImg: FileReaderObj,
  snackImg: FileReaderObj,
};
export const diaryData = atom({
  key: 'diaryData',
  default: diaryDefaultValue,
});
export const fontLoading = atom({
  key: 'fontLoading',
  default: false,
});
// const diaryDataSelector = selector({
//   key: 'diaryDataSelector',
//   get: ({ get }) => {
//     let list: = get(diaryData);
//     const { createDate } = list;
//     list.createDate = ;
// });
