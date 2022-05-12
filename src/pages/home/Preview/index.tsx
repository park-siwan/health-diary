import { differenceInMinutes, isValid } from 'date-fns';
import format from 'date-fns/format';
import { ko } from 'date-fns/locale';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { gray, primary, S } from '../pdf/style';
import { diaryData } from '../store';
import heartIcon from '../pdf//heartIcon.png';
export default function Preview() {
  const recoilValue = useRecoilValue(diaryData);
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
  } = recoilValue;
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
  console.log(recoilValue);
  return (
    <div>
      <div style={{ ...S.font, ...S.outer }}>
        <div style={S.header}>
          {/* 순번 */}
          <h1 style={{ ...S.headerText, color: primary[500] }}>
            HEALTH JOURNAL
          </h1>
          {/* 하트 png 이미지*/}
          <img src={heartIcon} alt='heart img' style={{ width: 48 }} />
          {/* 시간 */}
          <div
            style={{
              flexDirection: 'row',
            }}
          >
            <h3
              style={{
                ...S.headerText,
                color: primary[500],
                marginRight: 10,
              }}
            >
              Date
            </h3>
            <span style={{ ...S.headerText, fontWeight: 700 }}>
              {formatToDateStr}
            </span>
          </div>
        </div>
        <div style={S.inner}>
          <div style={{ flexDirection: 'row' }}>
            <div style={S.foods}>
              <div style={S.food1}>
                <h3 style={S.foodTitle1}>아침</h3>
                <span style={S.foodDesc1}>{morning}</span>
              </div>

              <div style={S.food1}>
                <h3 style={S.foodTitle1}>점심</h3>
                <span style={S.foodDesc1}>{lunch}</span>
              </div>
              <div style={S.food1}>
                <h3 style={S.foodTitle1}>저녁</h3>
                <span style={S.foodDesc1}>{dinner}</span>
              </div>
              <div style={{ ...S.food1, borderBottom: 0 }}>
                <h3 style={S.foodTitle1}>간식</h3>
                <span style={S.foodDesc1}>{snack}</span>
              </div>
            </div>
            <div style={S.rightBodies}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: primary[600],
                  marginBottom: 8,
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  color: gray[500],
                }}
              >
                {desc}
              </p>
            </div>
          </div>
          <div style={S.bottomBox}>
            <h3 style={S.bottomTitle}>영양제 기록</h3>
            <span style={S.bottomDesc}>{nutrients} </span>
          </div>
          <div style={S.bottomBox}>
            <h3 style={S.bottomTitle}>수면 시간 </h3>
            <div
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '80%',
              }}
            >
              <div
                style={{
                  flexDirection: 'row',
                }}
              >
                <span style={{ ...S.bottomDesc }}>
                  {formatToSleepTimeStart}
                </span>
                <span style={{ ...S.bottomDesc, margin: '0px 10px' }}>~</span>
                <span style={{ ...S.bottomDesc, marginRight: 30 }}>
                  {formatToSleepTimeEnd}
                </span>
              </div>
              <div
                style={{
                  flexDirection: 'row',
                }}
              >
                <span style={{ ...S.bottomDesc, margin: '0px 10px' }}>|</span>
                <div style={{ ...S.bottomDesc, flexDirection: 'row' }}>
                  <h3 style={S.totalSleepTimeTitle}>TOTAL</h3>
                  <span style={S.totalSleepTime}>{sleepHour}</span>
                  <span style={S.totalSleepTimeTitle}>시간</span>
                  <span style={S.totalSleepTime}>{sleepMin}</span>
                  <span style={{ ...S.totalSleepTimeTitle, marginRight: 0 }}>
                    분
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={S.bottomBox}>
            <h3 style={S.bottomTitle}>운동 기록</h3>
            <span style={S.bottomDesc}>{exercise}</span>
          </div>
          <div style={S.bottomBox}>
            <h3 style={S.bottomTitle}>한줄평</h3>
            <span style={S.bottomDesc}>{review}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
