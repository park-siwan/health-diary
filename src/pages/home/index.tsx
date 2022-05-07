import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ko from 'date-fns/locale/ko';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import { useRecoilState } from 'recoil';
import { diaryData } from './store';
import { ImgFile, ImgFileList, Inputs } from './type';
import { Font, PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import PdfRenderer from './pdf/PdfRenderer';
import PdfViewer from './pdf/PdfViewer';
import { Button } from '@mui/material';
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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import classNames from 'classnames/bind';
import healthDiaryStyle from './healthDiary.module.scss';
const cx = classNames.bind(healthDiaryStyle);

export default function HealthDiary() {
  const [recoilData, setRecoilData] = useRecoilState(diaryData);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ...recoilData,
    },
  });
  const currentRHF = getValues();
  // const PdfRendererConst = ;
  //pdf renderer

  useEffect(() => {
    reset({ ...recoilData });
  }, []);

  const [instance, updateInstance] = usePDF({
    document: <PdfRenderer inputData={currentRHF} />,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  //이미지 첨부 관련---
  const PictureInput = styled('input')({
    display: 'none',
    width: '10%',
  });

  const ImgFuncs = ({
    name,
    currentRHF,
  }: {
    name: ImgFileList;
    currentRHF: Inputs;
  }): JSX.Element | null => {
    const AddPictureIcon = ({ ariaLabel }: { ariaLabel: string }) => (
      <Button
        aria-label={ariaLabel}
        component='span'
        variant='outlined'
        sx={{ height: 64, mr: 2 }}
      >
        <AddPhotoAlternateIcon />
      </Button>
    );
    console.log(currentRHF);
    const readerFile: ImgFile = currentRHF[name];
    // console.log(
    //   '🚀 ~ file: index.tsx ~ line 150 ~ HealthDiary ~ readerFile',
    //   readerFile
    // );
    if (readerFile?.src === undefined) {
      return <AddPictureIcon ariaLabel={`upload ${name} picture`} />;
    } else {
      return (
        <ImgStyle name={name} readerFile={readerFile} resetField={resetField} />
      );
    }
  };

  const [isCreatedPdf, setIsCreatedPdf] = useState(false);
  const handleRerender = () => {
    const currentRHF2 = getValues();
    setRecoilData(currentRHF2);
    setIsCreatedPdf(true);
  };
  useEffect(() => {
    updateInstance(); //rerender
  }, [setRecoilData, updateInstance]);

  const handleDownloadHidden = () => {
    setIsCreatedPdf(false);
  };
  console.log(getValues());

  const PdfDownloadContainer = (
    <PDFDownloadLink
      className='test'
      document={<PdfRenderer inputData={currentRHF} />}
      fileName={`${currentRHF.title}`}
    >
      {({ blob, url, loading, error }) => {
        // updateInstance();
        return (
          <Button
            onClick={handleDownloadHidden}
            variant='contained'
            color='secondary'
            sx={isCreatedPdf ? { display: 'block' } : { display: 'none' }}
          >
            {loading ? '로딩중...' : 'pdf 다운로드'}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );

  return (
    <div className={cx('healthDiary')}>
      <div className='container'>
        <div
          className='row'
          css={css`
            justify-content: center;
          `}
        >
          <Box
            className='col-sm-4 col-md-6'
            sx={{ boxShadow: 4 }}
            // css={css`
            //   background-color: white;
            //   box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
            //   padding: 40px;
            // `}
          >
            <Button variant='outlined' onClick={handleRerender}>
              PDF 생성하기
            </Button>
            {PdfDownloadContainer}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {/* <h2>입력</h2> */}
                <Controller
                  name='createDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label='날짜'
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                      }}
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
                  render={({ field }) => (
                    <TextField
                      label='제목'
                      {...field}
                      placeholder='제목을 입력하세요'
                      variant='standard'
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
                    <ImgFuncs name='morningImg' currentRHF={currentRHF} />
                  </label>

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
                    <ImgFuncs name='lunchImg' currentRHF={currentRHF} />
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
                    <ImgFuncs currentRHF={currentRHF} name='dinnerImg' />
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
                    <ImgFuncs currentRHF={currentRHF} name='snackImg' />
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
                        inputFormat={'a hh:mm'}
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
                        inputFormat={'a hh:mm'}
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
            <Flex fullWidth mb={120} />
          </Box>
          <div className='col-sm-4 col-md-6'>
            <PdfViewer
              instance={instance}
              updateInstance={updateInstance}
              getValues={getValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
