import React, { useState, useEffect } from 'react';
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
import { ImgFileList, Inputs } from './type';
import { Font, usePDF } from '@react-pdf/renderer';
import PdfRenderer from './pdf/PdfRenderer';
import PdfViewer from './pdf/PdfViewer';
// import Button from '../../components/atoms/Button';
import {
  Button,
  ButtonGroup,
  Input,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { blueGrey, pink, grey } from '@mui/material/colors';
import Flex from '../../components/atoms/Flex';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import { SimCardDownloadIcon } from '@mui/icons-material/';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';
import { PhotoCamera } from '@mui/icons-material';

import ImgLoad from './imgFunc/ImgLoad';
import handleImgChange from './imgFunc/handleImgChange';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import classNames from 'classnames/bind';
import healthDiaryStyle from './healthDiary.module.scss';
const cx = classNames.bind(healthDiaryStyle);

export default function HealthDiary() {
  const [recoilData, setRecoilData] = useRecoilState(diaryData);

  //pdf renderer
  const [instance, updateInstance] = usePDF({
    document: <PdfRenderer inputData={recoilData} />,
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    // defaultValues: {
    //   // ...defaultValue,
    //   ...recoilData,
    // },
  });
  useEffect(() => {
    reset({ ...recoilData });
    // 스포카폰트 : https://spoqa.github.io/spoqa-han-sans/
    Font.register({
      family: 'Spoqa',
      fonts: [
        {
          src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
          fontWeight: 400,
        },
        {
          src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf',
          fontWeight: 500,
        },
        {
          src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf',
          fontWeight: 700,
        },
      ],
    });
    // 500 : https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf
    // 700 : https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.ttf
  }, []);
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
    descImg,
    morningImg,
    lunchImg,
    dinnerImg,
    snackImg,
  } = watch();

  //더보기(...) 버튼 전용
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentRHF = getValues();
  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);

    console.log(
      '🚀 ~ file: index.tsx ~ line 127 ~ handleMoreClick ~ current',
      currentRHF
    );
    setRecoilData((currVal: Inputs) => ({ ...currVal, current: currentRHF }));
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>, target: string) => {
    // console.log(event);descImg.reader
    if (target === 'createPdf') {
      handleModalOpen();
      //modal창 띄우고 pdf미리보기, pdf다운로드, pdf 새창보기 넣어야함
      updateInstance();
    }

    setAnchorEl(null);
  };
  //modal 관련
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const style = {
    borderRadius: '16px',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: 'white',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  //이미지 첨부 관련---

  // console.log(imgPreview);
  const PictureInput = styled('input')({
    display: 'none',
    width: '10%',
  });

  const MealInput = styled(TextField)`
    width: 90%;
    margin-right: 16px;
  `;

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
  const ImgPreview = ({
    name,
  }: {
    name: keyof ImgFileList;
  }): JSX.Element | null => {
    if (currentRHF[name]?.reader === null) {
      return <AddPictureIcon ariaLabel={`upload ${name} picture`} />;
    } else {
      return <ImgLoad name={name} currentRHF={currentRHF} />;
    }
  };
  console.log(getValues());
  return (
    <div className={cx('healthDiary')}>
      <PdfViewer instance={instance} updateInstance={updateInstance} />
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby='pdf-modal-title'
        aria-describedby='pdf-modal-description'
      >
        <Box sx={style} className='container'>
          <Flex fullWidth jc='between' mb={20} className='row'>
            <Flex jc='start'>
              <Typography id='pdf-modal-title' variant='h3' component='h2'>
                PDF 미리보기
              </Typography>
            </Flex>
            <Flex jc='end'>
              <IconButton aria-label='close' onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Flex>
          </Flex>
          <div className='row'>
            <PdfViewer instance={instance} updateInstance={updateInstance} />
          </div>
        </Box>
      </Modal>

      <div className='container'>
        <div
          className='row'
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <div
            className='col-sm-4 col-md-6'
            css={css`
              box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
              z-index: 1;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-top: 20px;
                margin-bottom: 20px;
              `}
            >
              <IconButton aria-label='menu'>
                <MenuIcon />
              </IconButton>
              <Typography variant='h4' component='h1'>
                Health Diary
              </Typography>
              <div>
                <IconButton
                  // onClick={updateInstance}
                  id='basic-button'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleMoreClick}
                  aria-label='more features'
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    // id='create-pdf'
                    onClick={(e) => handleClose(e, 'createPdf')}
                    sx={{ width: 320, maxWidth: '100%' }}
                  >
                    <ListItemIcon>
                      <PictureAsPdfIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>PDF 생성하기</ListItemText>
                    <Typography variant='body2' color='text.secondary'>
                      {/* ⌘X */}
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div
          className='row'
          css={css`
            justify-content: center;
          `}
        >
          <div
            className='col-sm-4 col-md-6'
            css={css`
              background-color: white;
              box-shadow: 0 1px 4px rgb(0 0 0 / 6%);
            `}
            style={{
              paddingTop: '40px',
              paddingLeft: '40px',
              paddingRight: '40px',
            }}
          >
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
                    <ImgPreview name='morningImg' />
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
                    <ImgPreview name='lunchImg' />
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
                    <ImgPreview name='dinnerImg' />
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
                    <ImgPreview name='snackImg' />
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
          </div>
          {/* <div className='col-sm-4 col-md-6'>
            <ImgPreview />
          </div> */}
        </div>
      </div>
    </div>
  );
}
