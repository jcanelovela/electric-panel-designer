import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { Box } from '@mui/material';

const Canvas = ({ setCanvas, selectedTool }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1200,
      height: 800,
      backgroundColor: '#ffffff',
    });

    fabricCanvasRef.current = canvas;
    setCanvas(canvas);

    // Cleanup
    return () => {
      canvas.dispose();
    };
  }, [setCanvas]);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    // Handle different tools
    switch (selectedTool) {
      case 'select':
        fabricCanvasRef.current.isDrawingMode = false;
        break;
      case 'draw':
        fabricCanvasRef.current.isDrawingMode = true;
        fabricCanvasRef.current.freeDrawingBrush.width = 2;
        fabricCanvasRef.current.freeDrawingBrush.color = '#000000';
        break;
      default:
        break;
    }
  }, [selectedTool]);

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        overflow: 'auto',
        p: 2,
      }}
    >
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
    </Box>
  );
};

export default Canvas;