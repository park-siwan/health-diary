import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
const ModalHook = () => {
  //modal 관련
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const modalBodyStyle = {
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
  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby='pdf-modal-title'
      aria-describedby='pdf-modal-description'
    >
      <Box sx={modalBodyStyle} className='container'>
        {/* <Flex fullWidth jc='between' mb={20} className='row'>
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
          {isLoading && (
            <PdfViewer
              instance={instance}
              updateInstance={updateInstance}
              getValues={getValues}
            />
          )}
        </div> */}
      </Box>
    </Modal>
  );
};
export default ModalHook;
