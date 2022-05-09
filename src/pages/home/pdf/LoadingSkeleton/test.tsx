import Skeleton from '@mui/material/Skeleton';
import heartIcon from './heartIcon.png';
import { S, primary, gray } from '../style';
const PdfSkeleton = () => {
  const createDate = '';
  const title = '';
  const desc = '';
  const morning = '';
  const lunch = '';
  const dinner = '';
  const snack = '';
  const nutrients = '';
  const sleepTimeStart = '';
  const sleepTimeEnd = '';
  const exercise = '';
  const review = '';
  const morningImg = '';
  const lunchImg = '';
  const dinnerImg = '';
  const snackImg = '';
  return (
    <div>
      <div style={{ ...S.font, ...S.outer }}>
        <div style={S.header}>
          {/* 순번 */}
          <div style={{ ...S.headerText, color: primary[500] }}>
            HEALTH JOURNAL
          </div>
          {/* 하트 png 이미지*/}
          <img src={heartIcon} alt='heart' style={{ width: 48 }} />
          {/* 시간 */}
          <div
            style={{
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                ...S.headerText,
                color: primary[500],
                marginRight: 10,
              }}
            >
              Date
            </div>
            <div style={{ ...S.headerText, fontWeight: 700 }}>
              {/* {formatToDate} */}
            </div>
          </div>
        </div>
        <div style={S.inner}>
          <div style={{ flexDirection: 'row' }}>
            <div style={S.foods}>
              <div style={S.food}>
                <div style={S.foodTitle}>아침</div>
                <div style={S.foodDesc}>{morning}</div>
                <div
                  // src={morningImg.src}
                  // src={`${morningImg.src}`}
                  style={{ width: 163, height: 143.5 }}
                />
              </div>

              <div style={S.food}>
                <div style={S.foodTitle}>점심</div>
                <div style={S.foodDesc}>{lunch}</div>
              </div>
              <div style={S.food}>
                <div style={S.foodTitle}>저녁</div>
                <div style={S.foodDesc}>{dinner}</div>
              </div>
              <div style={{ ...S.food, borderBottom: 0 }}>
                <div style={S.foodTitle}>간식</div>
                <div style={S.foodDesc}>{snack}</div>
              </div>
            </div>
            <div style={S.rightBodies}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: primary[600],
                  marginBottom: 8,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontWeight: 400,
                  color: gray[500],
                }}
              >
                {desc}
              </div>
            </div>
          </div>
          <div style={S.bottomBox}>
            <div style={S.bottomTitle}>영양제 기록</div>
            <div style={S.bottomDesc}>{nutrients} </div>
          </div>
          <div style={S.bottomBox}>
            <div style={S.bottomTitle}>수면 시간 </div>
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
                <div style={{ ...S.bottomDesc }}>
                  {/* {formatToSleepTimeStart} */}
                </div>
                <div style={{ ...S.bottomDesc, margin: '0 10px' }}>~</div>
                <div style={{ ...S.bottomDesc, marginRight: 30 }}>
                  {/* {formatToSleepTimeEnd} */}
                </div>
              </div>
              <div
                style={{
                  flexDirection: 'row',
                }}
              >
                <div style={{ ...S.bottomDesc, margin: '0 10px' }}>|</div>
                <div style={{ ...S.bottomDesc, flexDirection: 'row' }}>
                  <div style={S.totalSleepTimeTitle}>TOTAL</div>
                  <div style={S.totalSleepTime}>{/* {sleepHour} */}</div>
                  <div style={S.totalSleepTimeTitle}>시간</div>
                  <div style={S.totalSleepTime}>{/* {sleepMin} */}</div>
                  <div style={{ ...S.totalSleepTimeTitle, marginRight: 0 }}>
                    분
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={S.bottomBox}>
            <div style={S.bottomTitle}>운동 기록</div>
            <div style={S.bottomDesc}>{exercise}</div>
          </div>
          <div style={S.bottomBox}>
            <div style={S.bottomTitle}>한줄평</div>
            <div style={S.bottomDesc}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
