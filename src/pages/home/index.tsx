import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ko from 'date-fns/locale/ko';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { diaryData, diaryDefaultValue, gnb } from './store';
import { ImgFile, ImgFileList, Inputs } from './type';
import { Font, PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import PdfRenderer from './pdf/PdfRenderer';
import PdfViewer from './pdf/PdfViewer';
import { Button, ButtonGroup, Skeleton, Tooltip } from '@mui/material';
import { blueGrey, pink, grey } from '@mui/material/colors';
import Flex from '../../components/atoms/Flex';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';
import ImgStyle from './imgFuncs/ImgStyle';
import handleImgChange from './imgFuncs/handleImgChange';

import classNames from 'classnames/bind';
import healthDiaryStyle from './healthDiary.module.scss';
import RefreshIcon from '@mui/icons-material/Refresh';

import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enLocale from 'date-fns/locale/en-GB';
import ImgFuncs from './imgFuncs';
import Preview from './Preview';

const cx = classNames.bind(healthDiaryStyle);

export default function HealthDiary() {
  const gnbState = useRecoilValue(gnb);
  const [recoilData, setRecoilData] = useRecoilState(diaryData);
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    resetField,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...diaryDefaultValue,
    },
  });
  // const {  } = useFormState();
  const currentRHF = getValues();

  const [instance, updateInstance] = usePDF({
    document: <PdfRenderer inputData={currentRHF} />,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  //이미지 첨부 관련---
  const PictureInput = styled('input')({
    display: 'none',
    width: '10%',
  });

  const [isCreatedPdf, setIsCreatedPdf] = useState(false);
  const handleRerender = () => {
    const currentRHF2 = getValues();
    setRecoilData(currentRHF2);
    setIsCreatedPdf(true);
    updateInstance();
  };
  const handleDownloadDisabled = () => {
    setIsCreatedPdf(false);
  };
  const PdfDownloadContainer = (
    <PDFDownloadLink
      className='test'
      document={<PdfRenderer inputData={currentRHF} />}
      fileName={`${currentRHF.title}`}
    >
      {({ blob, url, loading, error }) => {
        return loading ? 'PDF 로딩중...' : 'PDF 다운로드';
        // return 'PDF';
      }}
    </PDFDownloadLink>
  );
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
    // morningImg,
    // lunchImg,
    // dinnerImg,
    // snackImg,
  } = watch();
  // const watchDiff = watch();
  useEffect(() => {
    setRecoilData(currentRHF);
  }, [
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
    // morningImg,
    // lunchImg,
    // dinnerImg,
    // snackImg,
    // setRecoilData,
    // currentRHF,
  ]);

  const PdfRealTimeRender = (
    <Stack
      flexDirection='row'
      justifyContent='flex-end'
      mt={2}
      alignItems='center'
    >
      <ButtonGroup aria-label='create pdf'>
        <Button
          variant='outlined'
          // variant='text'
          onClick={handleRerender}
          type='submit'
        >
          <RefreshIcon />
        </Button>
        <Button
          onClick={handleDownloadDisabled}
          variant='outlined'
          color='primary'
          disabled={!isCreatedPdf}
          // loading={!isCreatedPdf}
        >
          <SimCardDownloadIcon />
          {PdfDownloadContainer}
        </Button>
      </ButtonGroup>
    </Stack>
  );
  const outerWidth = useRef<HTMLDivElement>(null);
  let a4Height = 805.97;
  if (outerWidth.current !== null) {
    a4Height = outerWidth.current.offsetWidth * 1.414;
  }
  const previewContainer = css`
    display: flex;
    /* flex-shrink: 0; */
    position: sticky;
    top: 70px;
    height: ${a4Height}px;
  `;
  return (
    <div className={cx('healthDiary')}>
      <Flex mt={50}></Flex>
      {/* <Lnb>
       
      </Lnb> */}
      <div
        className='container'
        css={css`
          margin-top: 20px;
        `}
      >
        <div
          className='row'
          css={css`
            justify-content: center;
          `}
        >
          <Box className='col-sm-4 col-md-6'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              css={css`
                background-color: white;
                box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
                padding: 40px;
                border-radius: 16px;
              `}
            >
              <Stack spacing={2}>
                {/* <h2>입력</h2> */}
                <Controller
                  name='createDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label='날짜'
                      // value={field.value}
                      // onChange={(newValue) => {
                      //   field.onChange(newValue);
                      // }}
                      inputFormat={'yyyy.MM.dd'}
                      mask='____.__.__'
                      renderInput={(params) => (
                        <TextField variant='standard' {...params} />
                      )}
                    />
                  )}
                />
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      label='제목'
                      {...field}
                      placeholder='제목을 입력하세요'
                      variant='standard'
                      error={errors.title ? true : false}
                    />
                  )}
                />

                <h3>본문</h3>
                <label
                  htmlFor='icon-button-file-desc'
                  css={css`
                    display: flex;
                    justify-content: flex-end;
                  `}
                ></label>
                {/* </Stack> */}
                <Controller
                  name='desc'
                  control={control}
                  render={({ field }) => (
                    <TextareaAutosize
                      // className='form-input'
                      {...field}
                      aria-label='diary contents'
                      placeholder='내용을 입력해주세요'
                      minRows={3}
                      style={{
                        width: '100%',
                        border: `1px solid ${grey[300]}`,
                        height: 200,
                        padding: 30,
                        borderRadius: 8,
                      }}
                    />
                  )}
                />

                <h3>식단</h3>
                {/* <img src={descImg.reader.result} alt='1' /> */}
                <div className={cx('mealContainer')}>
                  <label htmlFor='icon-button-file-morning'>
                    <Controller
                      name='morningImg'
                      control={control}
                      render={({ field }) => (
                        <PictureInput
                          onChange={(e) => handleImgChange(e, field, setValue)}
                          // ref={field.ref}
                          accept='image/*'
                          id='icon-button-file-morning'
                          type='file'
                        />
                      )}
                    />
                    <ImgFuncs
                      name='morningImg'
                      currentRHF={currentRHF}
                      resetField={resetField}
                    />
                  </label>
                  {/* <input type='file' {...register('morningImg.buffer')} /> */}
                  <Controller
                    name='morning'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: '90%', mr: '16px' }}
                        label='아침'
                        {...field}
                        placeholder='아침 식사를 입력하세요'
                        variant='standard'
                      />
                    )}
                  />
                </div>
                <div className={cx('mealContainer')}>
                  <label htmlFor='icon-button-file-lunch'>
                    <Controller
                      name='lunchImg'
                      control={control}
                      render={({ field }) => (
                        <PictureInput
                          onChange={(e) => handleImgChange(e, field, setValue)}
                          // ref={field.ref}
                          accept='image/*'
                          id='icon-button-file-lunch'
                          type='file'
                        />
                      )}
                    />
                    <ImgFuncs
                      name='lunchImg'
                      currentRHF={currentRHF}
                      resetField={resetField}
                    />
                  </label>
                  <Controller
                    name='lunch'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: '90%', mr: '16px' }}
                        label='점심'
                        {...field}
                        placeholder='점심 식사를 입력하세요'
                        variant='standard'
                      />
                    )}
                  />
                </div>
                <div className={cx('mealContainer')}>
                  <label htmlFor='icon-button-file-dinner'>
                    <Controller
                      name='dinnerImg'
                      control={control}
                      render={({ field }) => (
                        <PictureInput
                          onChange={(e) => handleImgChange(e, field, setValue)}
                          // ref={field.ref}
                          accept='image/*'
                          id='icon-button-file-dinner'
                          type='file'
                        />
                      )}
                    />
                    <ImgFuncs
                      currentRHF={currentRHF}
                      name='dinnerImg'
                      resetField={resetField}
                    />
                  </label>
                  <Controller
                    name='dinner'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: '90%', mr: '16px' }}
                        label='저녁'
                        {...field}
                        placeholder='저녁 식사를 입력하세요'
                        variant='standard'
                      />
                    )}
                  />
                </div>
                <div className={cx('mealContainer')}>
                  <label htmlFor='icon-button-file-snack'>
                    <Controller
                      name='snackImg'
                      control={control}
                      render={({ field }) => (
                        <PictureInput
                          onChange={(e) => handleImgChange(e, field, setValue)}
                          // ref={field.ref}
                          accept='image/*'
                          id='icon-button-file-snack'
                          type='file'
                        />
                      )}
                    />
                    <ImgFuncs
                      currentRHF={currentRHF}
                      name='snackImg'
                      resetField={resetField}
                    />
                  </label>
                  <Controller
                    name='snack'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: '90%', mr: '16px' }}
                        label='간식'
                        {...field}
                        placeholder='간식 식사를 입력하세요'
                        variant='standard'
                      />
                    )}
                  />
                </div>
                {/* 영양제기록 : 오토컴플리트(freesolo + Multiple values) */}
                <Controller
                  name='nutrients'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='영양제'
                      {...field}
                      placeholder='영양제를 입력하세요'
                      variant='standard'
                    />
                  )}
                />
                {/* 수면시간 : 타임픽커 */}
                <h3>수면 시간</h3>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={enLocale}
                >
                  <div
                    css={css`
                      display: flex;
                    `}
                  >
                    <Controller
                      name='sleepTimeStart'
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          {...field}
                          label='취침 시간'
                          // inputFormat={'hh:mm'}
                          // mask='__:__'
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='standard'
                              sx={{ width: '50%', mr: 4 }}
                            />
                          )}
                        />
                      )}
                    />
                    <Controller
                      name='sleepTimeEnd'
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          {...field}
                          label='기상 시간'
                          // inputFormat={'hh:mm'}
                          // inputFormat={'aaa hh:mm'}
                          // mask='__:__'
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant='standard'
                              sx={{ width: '50%' }}
                            />
                          )}
                        />
                      )}
                    />
                  </div>
                </LocalizationProvider>
                <h3>운동</h3>
                {/* 운동기록 : 오토컴플리트(freesolo운동종류 + dialog운동시간입력 요청 ) */}
                <Controller
                  name='exercise'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='운동'
                      {...field}
                      placeholder='운동을 기록해주세요'
                      variant='standard'
                    />
                  )}
                />
                <h3>후기</h3>
                <Controller
                  name='review'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label='한 줄 평'
                      {...field}
                      placeholder='한줄평을 남겨주세요'
                      variant='standard'
                    />
                  )}
                />
              </Stack>
            </form>
            {PdfRealTimeRender}
          </Box>
          {/* <PdfRealTimeRender /> */}

          {gnbState.preview && (
            <div
              className={`col-sm-4 col-md-6 lg-only`}
              ref={outerWidth}
              css={previewContainer}
            >
              <Preview />
            </div>
          )}

          <Flex fullWidth mb={120} />
        </div>
      </div>
    </div>
  );
}
