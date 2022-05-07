import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuIcon from '@mui/icons-material/Menu';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

export default function Gnb() {
  //더보기(...) 버튼 전용
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (
    e: React.MouseEvent<HTMLElement>,
    target: string
  ) => {
    if (target === 'createPdf') {
    }
    setAnchorEl(null);
  };

  return (
    <header css={header}>
      <div css={headerWrap}>
        <div
          className='container'
          css={css`
            height: 100%;
          `}
        >
          <div
            className='row'
            css={css`
              width: 100%;
              height: 100%;
            `}
          >
            <div className='col-sm-4'>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 10px;
                  height: 100%;
                `}
              >
                <IconButton aria-label='menu'>
                  <MenuIcon />
                </IconButton>
                <Typography variant='h5' component='h1'>
                  Health Diary
                </Typography>
                <div>
                  <IconButton
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
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      // id='create-pdf'
                      onClick={(e) => handleMenuClose(e, 'createPdf')}
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
        </div>
      </div>
    </header>
  );
}
