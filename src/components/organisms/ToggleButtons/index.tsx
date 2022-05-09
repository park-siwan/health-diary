import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PreviewIcon from '@mui/icons-material/Preview';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function ToggleButtons() {
  const [alignment, setAlignment] = useState<string | null>('list');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
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
