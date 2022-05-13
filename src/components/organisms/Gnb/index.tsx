import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuIcon from '@mui/icons-material/Menu';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { EventHandler, MouseEventHandler, useState } from 'react';
import NavBar from '../../modecules/NavBar';
import ToggleButtons from '../ToggleButtons';
import AppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { gnb } from '../../../pages/Home/store';
export default function Gnb() {
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    console.log(e);
  };
  return (
    <AppBar sx={{ bgcolor: 'white', padding: 0 }}>
      <div className='container'>
        <div className='row'>
          <Toolbar variant='dense' className='col-sm-4' sx={{ padding: 0 }}>
            <IconButton
              onClick={handleClick}
              size='small'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ color: grey[600] }} />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, color: grey[800] }}
              // sx={{  }}
            ></Typography>
            <ToggleButtons />
          </Toolbar>
        </div>
      </div>
    </AppBar>
  );
}
