import { ReactNode, useEffect } from 'react';

import ReactPDF, {
  Page as _Page,
  Document as _Document,
  PDFViewer,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
  BlobProvider,
  Canvas,
  usePDF,
  Svg,
  Image,
  Circle,
} from '@react-pdf/renderer';

import ko from 'date-fns/locale/ko';
import { useRecoilValue } from 'recoil';
import { diaryData } from '../store';
import { Inputs } from '../type';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { S, primary, gray, FOOD_BOX_SIZE } from './style';
import heartIcon from './heartIcon.png';
import { format, differenceInMinutes, isValid } from 'date-fns';
import transparent from './transparent.png';
import source1 from '../../../styles/fonts/NotoSansCJKkr-Light.ttf';
import source2 from '../../../styles/fonts/NotoSansCJKkr-Regular.ttf';
import source3 from '../../../styles/fonts/NotoSansCJKkr-Bold.ttf';
import testImg from './testImg.jpg';

Font.register({
  family: 'NotoSans',
  fonts: [
    {
      src: source1,
      fontWeight: 400,
    },
    {
      src: source2,
      fontWeight: 500,
    },
    {
      src: source3,
      fontWeight: 700,
    },
  ],
});

function PdfRenderer({ inputData }: { inputData: Inputs }) {
  const {
    createDate,
    title,
    desc,
    morning,
    lunch,
    dinner,
    snack,
    nutrients,
    sleepTimeStart,
    sleepTimeEnd,
    exercise,
    review,
    morningImg,
    lunchImg,
    dinnerImg,
    snackImg,
  } = inputData;

  //type 에러 해결용
  function componentWithChildren<Props>(Component: React.ComponentType<Props>) {
    return Component as React.ComponentType<Props & { children: ReactNode }>;
  }

  const Document = componentWithChildren(_Document);
  const Page = componentWithChildren(_Page);

  //날씨 데이터 InValid 감지 로직
  type date = string;
  let formatToDateStr: date = '';
  let formatToSleepTimeStart: date = '';
  let formatToSleepTimeEnd: date = '';
  type dateDiff = number;
  let sleepTotal: dateDiff = 0;
  let sleepMin: dateDiff = 0;
  let sleepHour: dateDiff = 0;
  if (isValid(createDate)) {
    formatToDateStr = format(createDate, 'yyyy.MM.dd.E', { locale: ko });
  }
  const validSleepStart = isValid(sleepTimeStart);
  const validSleepEnd = isValid(sleepTimeEnd);
  if (validSleepStart) {
    formatToSleepTimeStart = format(sleepTimeStart, 'aaa hh:mm');
  }
  if (validSleepEnd) {
    formatToSleepTimeEnd = format(sleepTimeEnd, 'aaa hh:mm');
  }
  if (validSleepStart && validSleepEnd) {
    sleepTotal = differenceInMinutes(sleepTimeEnd, sleepTimeStart);
    sleepMin = sleepTotal % 60;
    sleepHour = Math.floor(sleepTotal / 60);
  }

  return (
    <Document creator='health-diary'>
      <Page size='A4' style={{ ...S.font, ...S.outer }}>
        <View style={S.header}>
          {/* 순번 */}
          <Text style={{ ...S.headerText, color: primary[500] }}>
            HEALTH JOURNAL
          </Text>
          {/* 하트 png 이미지*/}
          <Image src={heartIcon} style={{ width: 48 }} />
          {/* 시간 */}
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                ...S.headerText,
                color: primary[500],
                marginRight: 10,
              }}
            >
              Date
            </Text>
            <Text style={{ ...S.headerText, fontWeight: 700 }}>
              {formatToDateStr}
            </Text>
          </View>
        </View>
        <View style={S.inner}>
          <View style={{ flexDirection: 'row' }}>
            <View style={S.foods}>
              <View style={S.food1}>
                <Text style={S.foodTitle1}>아침</Text>
                <Text style={S.foodDesc1}>{morning}</Text>
              </View>

              <View style={S.food1}>
                <Text style={S.foodTitle1}>점심</Text>
                <Text style={S.foodDesc1}>{lunch}</Text>
              </View>
              <View style={S.food1}>
                <Text style={S.foodTitle1}>저녁</Text>
                <Text style={S.foodDesc1}>{dinner}</Text>
              </View>
              <View style={{ ...S.food1, borderBottom: 0 }}>
                <Text style={S.foodTitle1}>간식</Text>
                <Text style={S.foodDesc1}>{snack}</Text>
              </View>
            </View>
            <View style={S.rightBodies}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: primary[600],
                  marginBottom: 8,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontWeight: 400,
                  color: gray[500],
                }}
              >
                {desc}
              </Text>
            </View>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>영양제 기록</Text>
            <Text style={S.bottomDesc}>{nutrients} </Text>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>수면 시간 </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '80%',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text style={{ ...S.bottomDesc }}>
                  {formatToSleepTimeStart}
                </Text>
                <Text style={{ ...S.bottomDesc, marginHorizontal: 10 }}>~</Text>
                <Text style={{ ...S.bottomDesc, marginRight: 30 }}>
                  {formatToSleepTimeEnd}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text style={{ ...S.bottomDesc, marginHorizontal: 10 }}>|</Text>
                <View style={{ ...S.bottomDesc, flexDirection: 'row' }}>
                  <Text style={S.totalSleepTimeTitle}>TOTAL</Text>
                  <Text style={S.totalSleepTime}>{sleepHour}</Text>
                  <Text style={S.totalSleepTimeTitle}>시간</Text>
                  <Text style={S.totalSleepTime}>{sleepMin}</Text>
                  <Text style={{ ...S.totalSleepTimeTitle, marginRight: 0 }}>
                    분
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>운동 기록</Text>
            <Text style={S.bottomDesc}>{exercise}</Text>
          </View>
          <View style={S.bottomBox}>
            <Text style={S.bottomTitle}>한줄평</Text>
            <Text style={S.bottomDesc}>{review}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
export default PdfRenderer;
