import React from 'react';
import {
  AppBar,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { jsPDF } from 'jspdf';

const Header = ({ canvas }) => {
  const handleSave = async () => {
    if (!canvas) return;
    
    const json = canvas.toJSON();
    const dataStr = JSON.stringify(json);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'electrical-panel-design.json';
    link.click();
  };

  const handleExportPDF = () => {
    if (!canvas) return;

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('electrical-panel-design.pdf');
  };

  const handleExportPNG = () => {
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'electrical-panel-design.png';
    link.click();
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = JSON.parse(event.target.result);
        canvas.loadFromJSON(json, () => {
          canvas.renderAll();
        });
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <AppBar position="static" color="primary">
      <MuiToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ⚡ Electric Panel Designer
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<FolderOpenIcon />}
            onClick={handleLoad}
          >
            Open
          </Button>
          <Button
            color="inherit"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            color="inherit"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportPDF}
          >
            Export PDF
          </Button>
          <Button
            color="inherit"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportPNG}
          >
            Export PNG
          </Button>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Header;