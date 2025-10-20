import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Divider } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import CreateIcon from '@mui/icons-material/Create';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const Toolbar = ({ selectedTool, setSelectedTool }) => {
  const handleToolChange = (event, newTool) => {
    if (newTool !== null) {
      setSelectedTool(newTool);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
      }}
    >
      <ToggleButtonGroup
        value={selectedTool}
        exclusive
        onChange={handleToolChange}
        aria-label="design tools"
      >
        <ToggleButton value="select" aria-label="select">
          <MouseIcon />
        </ToggleButton>
        <ToggleButton value="draw" aria-label="draw">
          <CreateIcon />
        </ToggleButton>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToggleButton value="rectangle" aria-label="rectangle">
          <CropSquareIcon />
        </ToggleButton>
        <ToggleButton value="circle" aria-label="circle">
          <CircleOutlinedIcon />
        </ToggleButton>
        <ToggleButton value="line" aria-label="line">
          <HorizontalRuleIcon />
        </ToggleButton>
        <ToggleButton value="text" aria-label="text">
          <TextFieldsIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Toolbar;
