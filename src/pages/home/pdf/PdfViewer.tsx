import ReactPDF from '@react-pdf/renderer';
import React, { ReactNode, useEffect, useState } from 'react';

//pdf diver
import { Document, Page as Page2, pdfjs } from 'react-pdf';
import useWindowSize from '../../../hooks/useWindowSize';
import { useRecoilState, useRecoilValue } from 'recoil';
import { diaryData } from '../store';
import { Button } from '@mui/material';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Flex from '../../../components/atoms/Flex';
import { UseFormGetValues } from 'react-hook-form';
import { Inputs } from '../type';
// import { setTimeout } from 'timers';
import Skeleton from '@mui/material/Skeleton';
import heartIcon from './heartIcon.png';
import { S, primary, gray } from './style';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface Props {
  instance: ReactPDF.UsePDFInstance;
  updateInstance: () => void;
  getValues: UseFormGetValues<Inputs>;
}
export default function PrintDocs({
  instance,
  updateInstance,
  getValues,
}: Props) {
  // console.log(instance.error);
  const [recoilData, setRecoilData] = useRecoilState(diaryData);
  // const inputData = useRecoilValue(diaryData);
  const { title } = recoilData;
  const windowSize = useWindowSize();
  const fullWidth = windowSize.width / 2.6;
  //pdf diver
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }

  const PdfSkeleton = () => {
    return <div></div>;
  };

  if (instance.error) return <div>오류: {instance.error}</div>;
  const Doc = () => {
    return (
      // <div className={`${stateAni.animation}`} style={stateAni}>
      <div
        className='fadeIn'
        css={css`
          box-shadow: 0 0 8px rgb(235 215 215);
        `}
      >
        <Document
          // className={`fadeIn ${stateAni}`}
          // loading={'loading..'}
          loading={<PdfSkeleton />}
          file={instance.url}
          onLoadSuccess={onDocumentLoadSuccess}
          options={{
            standardFontDataUrl:
              'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
          }}
        >
          <Page2
            loading={<PdfSkeleton />}
            pageNumber={pageNumber}
            width={500}
          />
        </Document>
      </div>
    );
  };

  return (
    <div
      css={css`
        position: sticky;
        width: 100%;
        top: 60px;
      `}
    >
      <div
        css={css`
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: start;
        `}
      >
        {instance.loading ? (
          // {true ? (
          <div
            css={css`
              width: 100%;
            `}
          >
            <PdfSkeleton />
          </div>
        ) : (
          <Doc />
        )}
      </div>
    </div>
  );

  // return (

  // );
}
