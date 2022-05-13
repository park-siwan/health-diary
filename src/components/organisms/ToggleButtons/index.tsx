import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PreviewIcon from '@mui/icons-material/Preview';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useRecoilState } from 'recoil';
import { gnb, gnbStateDefaultVal } from '../../../pages/Home/store';

export default function ToggleButtons() {
  const [alignment, setAlignment] = useState<string | null>('list');
  const [gnbState, setGnbState] = useRecoilState(gnb);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    //반드시 1개가 선택됨
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    } else {
      return;
    }
    let newState = { ...gnbStateDefaultVal };
    newState[newAlignment] = true;
    setGnbState(newState);
  };

  return (
    <ToggleButtonGroup
      className='lg-only'
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label='mode'
      sx={{ backgroundColor: 'white' }}
    >
      <ToggleButton value='list' aria-label='list' size='small'>
        <FormatListBulletedIcon fontSize='small' />
      </ToggleButton>
      <ToggleButton value='preview' aria-label='preview' size='small'>
        <PreviewIcon fontSize='small' />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
