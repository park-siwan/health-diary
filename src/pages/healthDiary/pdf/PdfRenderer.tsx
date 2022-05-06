import { ReactNode, useEffect } from 'react';

import {
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
import { S, primary, gray } from './style';
import heartIcon from './heartIcon.png';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';
function PdfRenderer({
  inputData,
}: // updateInstance,
{
  inputData: Inputs;
  // updateInstance: Function;
}) {
  // const recoilValue = useRecoilValue(diaryData);
  // console.log(
  //   '🚀 ~ file: PdfRenderer.tsx ~ line 30 ~ PdfRenderer ~ recoilValue',
  //   recoilValue
  // );
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
  // if (morningImg.reader?.result === null) return null;
  function componentWithChildren<Props>(Component: React.ComponentType<Props>) {
    return Component as React.ComponentType<Props & { children: ReactNode }>;
  }
  useEffect(() => {}, []);

  // var y = document.createElement('SOURCE');
  // console.log('🚀 ~ file: PdfRenderer.tsx ~ line 52 ~ PdfRenderer ~ y', y);
  const Document = componentWithChildren(_Document);
  const Page = componentWithChildren(_Page);

  const formatToDate = format(createDate, 'yyyy.MM.dd.E', { locale: ko });
  const formatToSleepTimeStart = format(sleepTimeStart, 'a hh:mm');
  const formatToSleepTimeEnd = format(sleepTimeEnd, 'a hh:mm');

  const sleepTotal = differenceInMinutes(sleepTimeEnd, sleepTimeStart);
  const sleepMin = sleepTotal % 60;
  const sleepHour = Math.floor(sleepTotal / 60);
  // console.log(morningImg.src);

  // if (morningImg?.reader === null) return null;
  // const sleepTotal =
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
              {formatToDate}
            </Text>
          </View>
        </View>
        <View style={S.inner}>
          <View style={{ flexDirection: 'row' }}>
            <View style={S.foods}>
              <View style={S.food}>
                <Text style={S.foodTitle}>아침</Text>
                <Text style={S.foodDesc}>{morning}</Text>
                <Image
                  // src={morningImg.src}
                  src={`${morningImg.src}`}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <View style={S.food}>
                <Text style={S.foodTitle}>점심</Text>
                <Text style={S.foodDesc}>{lunch}</Text>
              </View>
              <View style={S.food}>
                <Text style={S.foodTitle}>저녁</Text>
                <Text style={S.foodDesc}>{dinner}</Text>
              </View>
              <View style={{ ...S.food, borderBottom: 0 }}>
                <Text style={S.foodTitle}>간식</Text>
                <Text style={S.foodDesc}>{snack}</Text>
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
