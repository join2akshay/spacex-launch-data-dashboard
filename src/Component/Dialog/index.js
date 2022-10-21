import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import React from 'react'
import { Box, Paper, Typography } from '@mui/material';
import moment from 'moment';

export default function CustomDialog(props) {
    const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

 
  return (
    <Dialog onClose={handleClose} open={open} className='modal'>
    
    <Paper className='modal'>
        <Box display='flex' justifyContent='end'>
            <Typography onClick={handleClose} sx={{cursor:'pointer'}}>
                X
            </Typography>
        </Box>
   <Box>
<Box display='flex' gap='1rem'>
    <img src={selectedValue?.links?.mission_patch} alt="logo" className='modal-logo'/>
    <Box>
    <Typography variant="subtitle1">
{selectedValue?.mission_name}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
{selectedValue?.rocket?.rocket_name}
        </Typography>
        <Box>
            <img src={require('../../assets/spacex.png')} className='social-icons' onClick={()=>window.open(selectedValue?.links?.article_link)} alt="article link"/>
            <img src={require('../../assets/wiki.png')} className='social-icons' onClick={()=>window.open(selectedValue?.links?.wikipedia)} alt="wikipedia link"/>
            <img src={require('../../assets/youtube.png')} className='social-icons' onClick={()=>window.open(selectedValue?.links?.video_link)} alt="youtube video link"/>

        </Box>
    </Box>
    <Typography >
Success
        </Typography>
</Box>
<Box marginTop='1rem'>
    <Typography variant="body1" gutterBottom>
        {selectedValue?.details}. <span onClick={()=>window.open(selectedValue?.links?.wikipedia)} className='link'>wikipedia</span>
    </Typography>
</Box>

<Box marginTop='1.5rem' display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
        Flight Number 
    </Typography>
    <Typography>
        {selectedValue?.flight_number}
    </Typography>
</Box>

<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
       Mission Name 
    </Typography>
    <Typography>
        {selectedValue?.mission_name}
    </Typography>
</Box>
<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
        Rocket Type
    </Typography>
    <Typography>
        {selectedValue?.rocket?.rocket_type}
    </Typography>
</Box>
<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
        Manufacturer 
    </Typography>
    <Typography>
    {selectedValue?.rocket?.second_stage?.payloads[0]?.manufacturer}
    </Typography>
</Box>
<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
        Nationality
    </Typography>
    <Typography>
        {selectedValue?.rocket?.second_stage?.payloads[0]?.nationality}
    </Typography>
</Box>
<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
        Launch Date
    </Typography>
    <Typography>
        {moment(selectedValue?.launch_date_utc).format(' Do MMMM YYYY, HH:mm')}
    </Typography>
</Box>
<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem' >
        Payload Type
    </Typography>
    <Typography>
        {selectedValue?.rocket?.second_stage?.payloads[0]?.payload_type}
    </Typography>
</Box>
<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
        Orbit 
    </Typography>
    <Typography>
        {selectedValue?.rocket?.second_stage?.payloads[0]?.orbit}
    </Typography>
</Box>
<Box display='flex' gap='3.5rem' borderBottom='1px solid #00000029' paddingBottom='0.5rem' marginBottom='0.75rem'>
<Typography width='9rem'>
        Lauch Site
    </Typography>
    <Typography>
        {selectedValue?.launch_site?.site_name}
    </Typography>
</Box>
    </Box>
   </Paper>
  </Dialog>
  )
}
