import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fabric } from 'fabric';

const DRAWER_WIDTH = 280;

const electricalComponents = {
  'Circuit Breakers': [
    { name: 'Single Pole Breaker', type: 'breaker-1p' },
    { name: 'Double Pole Breaker', type: 'breaker-2p' },
    { name: 'Three Pole Breaker', type: 'breaker-3p' },
    { name: 'GFCI Breaker', type: 'breaker-gfci' },
    { name: 'AFCI Breaker', type: 'breaker-afci' },
    { name: 'Miniature Circuit Breaker', type: 'breaker-mcb' },
  ],
  'Contactors': [
    { name: 'AC Contactor', type: 'contactor-ac' },
    { name: 'DC Contactor', type: 'contactor-dc' },
    { name: 'Mini Contactor', type: 'contactor-mini' },
    { name: 'Power Contactor', type: 'contactor-power' },
  ],
  'Relays': [
    { name: 'Control Relay', type: 'relay-control' },
    { name: 'Timer Relay', type: 'relay-timer' },
    { name: 'Thermal Relay', type: 'relay-thermal' },
    { name: 'Overload Relay', type: 'relay-overload' },
    { name: 'Solid State Relay', type: 'relay-ssr' },
  ],
  'Busbars & Distribution': [
    { name: 'Main Busbar', type: 'busbar-main' },
    { name: 'Distribution Block', type: 'dist-block' },
    { name: 'Terminal Block', type: 'terminal-block' },
    { name: 'Neutral Bar', type: 'busbar-neutral' },
    { name: 'Ground Bar', type: 'busbar-ground' },
  ],
  'Connectors & Terminals': [
    { name: 'Wire Connector', type: 'connector-wire' },
    { name: 'Cable Lug', type: 'connector-lug' },
    { name: 'Terminal Strip', type: 'terminal-strip' },
    { name: 'Ring Terminal', type: 'terminal-ring' },
    { name: 'Spade Terminal', type: 'terminal-spade' },
  ],
  'Switches & Disconnects': [
    { name: 'Manual Disconnect', type: 'switch-disconnect' },
    { name: 'Transfer Switch', type: 'switch-transfer' },
    { name: 'Rotary Switch', type: 'switch-rotary' },
    { name: 'Toggle Switch', type: 'switch-toggle' },
  ],
  'Fuses': [
    { name: 'Blade Fuse', type: 'fuse-blade' },
    { name: 'Cartridge Fuse', type: 'fuse-cartridge' },
    { name: 'HRC Fuse', type: 'fuse-hrc' },
    { name: 'Fuse Holder', type: 'fuse-holder' },
  ],
  'Indicators & Meters': [
    { name: 'Pilot Light', type: 'indicator-light' },
    { name: 'LED Indicator', type: 'indicator-led' },
    { name: 'Voltmeter', type: 'meter-volt' },
    { name: 'Ammeter', type: 'meter-amp' },
    { name: 'Power Meter', type: 'meter-power' },
  ],
};

const ComponentLibrary = ({ canvas }) => {
  const [expanded, setExpanded] = useState('Circuit Breakers');

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addComponentToCanvas = (component) => {
    if (!canvas) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#e3f2fd',
      width: 80,
      height: 60,
      stroke: '#1976d2',
      strokeWidth: 2,
      rx: 5,
      ry: 5,
    });

    const text = new fabric.Text(component.name, {
      left: 140,
      top: 130,
      fontSize: 10,
      fill: '#000',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
    });

    const group = new fabric.Group([rect, text], {
      left: 150,
      top: 150,
      selectable: true,
    });

    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.renderAll();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          position: 'relative',
          borderRight: '1px solid #ddd',
        },
      }}
    >
      <Box sx={{ p: 2, backgroundColor: '#1976d2', color: 'white' }}>
        <Typography variant="h6">Component Library</Typography>
        <Typography variant="caption">3000+ Electrical Blocks</Typography>
      </Box>
      <Divider />
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        {Object.entries(electricalComponents).map(([category, components]) => (
          <Accordion
            key={category}
            expanded={expanded === category}
            onChange={handleAccordionChange(category)}
            disableGutters
            elevation={0}
            sx={{ '&:before': { display: 'none' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ backgroundColor: '#f5f5f5' }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List dense>
                {components.map((component, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      onClick={() => addComponentToCanvas(component)}
                      sx={{ pl: 3 }}
                    >
                      <ListItemText primary={component.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Drawer>
  );
};

export default ComponentLibrary;