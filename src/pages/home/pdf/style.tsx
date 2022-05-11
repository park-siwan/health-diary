// import source1 from '../../../styles/fonts/SpoqaHanSansNeo-Regular.ttf';
import ReactPDF, { Font, StyleSheet } from '@react-pdf/renderer';

export const primary = {
  100: '#FAE5E6', //배경
  500: '#E3ACAC', //헤더 글자
  600: '#E7A9AA', // 본문 타이틀
  700: '#9F5C5C', // 헤더 날짜
};
export const gray = {
  100: '#E9E3E3', //border
  300: '#CBC5C5',
  500: '#A69E9E', //내용desc
};
export const FOOD_BOX_SIZE = 139;

const food: any = {
  display: 'flex',
  // justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: FOOD_BOX_SIZE,
  height: FOOD_BOX_SIZE,
  borderRight: `1px solid ${gray[100]}`,
  borderBottom: `1px solid ${gray[100]}`,
  padding: 10,
};
const foodTitle: any = {
  // color: primary[600],
  fontWeight: 700,
  fontSize: 16,
  marginLeft: 10,
  marginTop: 10,
  marginBottom: 5,
};
const foodDesc: any = {
  display: 'flex',
  color: gray[500],
  fontSize: 14,
  marginLeft: 10,
};
const fontFamily = 'Spoqa';
export const S = StyleSheet.create({
  //<Page> 에 S.font 로 전역적용한 폰트
  font: {
    fontFamily: fontFamily,
  },
  outer: {
    width: '100%',
    height: '100%',
    backgroundColor: primary[100],
  },
  inner: {
    // width: '90%',
    height: '90%',
    backgroundColor: 'white',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
  },
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 10,
    paddingHorizontal: 40,
  },
  headerText: {
    fontSize: '14px',
    fontWeight: 400,
    color: primary[700],
  },
  foods: {},
  // food: { ...food },
  food1: {
    ...food,
    justifyContent: 'flex-start',
  },
  food2: {
    ...food,
    justifyContent: 'flex-end',
  },
  foodTitle1: {
    ...foodTitle,
    color: primary[600],
  },
  foodTitle2: {
    ...foodTitle,
    color: 'white',
  },
  foodDesc1: {
    ...foodDesc,
    color: gray[500],
  },
  foodDesc2: {
    ...foodDesc,
    color: 'white',
  },
  ImgContainer: {
    width: FOOD_BOX_SIZE,
    height: FOOD_BOX_SIZE,
    zIndex: 1,
    position: 'absolute',
    flexShrink: 0,
    overflow: 'hidden',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center center',
    // backgroundSize: 'contain',
  },
  foodImg: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  rightBodies: {
    width: 360,
    height: 574,
    padding: 26,
  },

  bottomBox: {
    fontSize: '12px',
    borderTop: `1px solid ${gray[100]}`,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomTitle: {
    fontWeight: 500,
    color: gray[500],
    marginRight: 20,
    width: 70,
  },
  bottomDesc: {
    color: gray[500],
  },
  totalSleepTimeTitle: {
    fontWeight: 500,
    color: gray[500],
    marginRight: 8,
  },
  totalSleepTime: {
    // fontWeight: 700,
    // color: gray[500],
  },
});
