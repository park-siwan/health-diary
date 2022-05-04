import ReactPDF from '@react-pdf/renderer';
import React, { ReactNode, useEffect, useState } from 'react';

//pdf viewer
import { Document as Document2, Page as Page2, pdfjs } from 'react-pdf';
import useWindowSize from '../../../hooks/useWindowSize';
import { useRecoilValue } from 'recoil';
import { diaryData } from '../store';
import { Button } from '@mui/material';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Flex from '../../../components/atoms/Flex';
// import { setTimeout } from 'timers';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function PrintDocs({
  instance,
  updateInstance,
}: {
  instance: ReactPDF.UsePDFInstance;
  updateInstance: () => void;
}) {
  const inputData = useRecoilValue(diaryData);
  const { title } = inputData;
  const windowSize = useWindowSize();

  //pdf viewer
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }

  if (instance.loading) return <div>Loading ...</div>;

  if (instance.error) return <div>오류: {instance.error}</div>;
  const handleDownload = () => {
    updateInstance();
    setTimeout(() => {}, 1000);
    if (instance.url === null) return;
    const link = document.createElement('a');
    link.href = instance.url;
    link.setAttribute('download', `${title}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // <a href={instance.url || undefined} download={`${title}.pdf`}>
    //   pdf 다운로드
    // </a>;
  };
  return (
    <div className='col-sm-4'>
      {/* <div> */}
      {/* <h2>출력</h2> */}
      {/* <MyDoc /> */}

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
          // width={windowSize.width}
          // height={windowSize.height}
        />
      </Document2>

      <Flex jc='end'>
        <Button onClick={updateInstance} sx={{ mr: 2 }}>
          pdf새로고침
        </Button>
        <Button
          variant='outlined'
          sx={{ marginRight: 2 }}
          href={instance.url || undefined}
        >
          pdf 새창으로 보기
        </Button>
        <Button onClick={handleDownload} variant='contained'>
          pdf 다운로드
        </Button>
      </Flex>
      {/* <PDFViewer width={'100%'} height={'50%'}>
          <MyDoc />
        </PDFViewer> */}
    </div>
  );
}
