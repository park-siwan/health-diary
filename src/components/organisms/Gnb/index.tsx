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
import { useState } from 'react';
import NavBar from '../../modecules/NavBar';
import ToggleButtons from '../ToggleButtons';
import AppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
export default function Gnb() {
  return (
    <AppBar sx={{ bgcolor: 'white' }}>
      <Toolbar variant='dense'>
        <IconButton
          size='large'
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
        >
          Health Diary
        </Typography>
        <ToggleButtons />
      </Toolbar>
    </AppBar>
  );
}
