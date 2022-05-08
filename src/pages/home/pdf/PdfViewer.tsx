import ReactPDF from '@react-pdf/renderer';
import React, { ReactNode, useEffect, useState } from 'react';

//pdf viewer
import { Document as Document2, Page as Page2, pdfjs } from 'react-pdf';
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
  // console.log(instance);
  // console.log(instance.error);
  const [recoilData, setRecoilData] = useRecoilState(diaryData);
  // const inputData = useRecoilValue(diaryData);
  const { title } = recoilData;
  const windowSize = useWindowSize();

  //pdf viewer
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>오류: {instance.error}</div>;

  return (
    <div style={{ position: 'sticky', top: 80 }}>
      <Document2
        loading={'test1'}
        file={instance.url}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          standardFontDataUrl:
            'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
        }}
      >
        <Page2
          loading={'test1'}
          pageNumber={pageNumber}
          width={windowSize.width / 2.6}
          // height={windowSize.height}
        />
      </Document2>
    </div>
  );
}
