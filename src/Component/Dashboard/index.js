import React, { useEffect } from 'react'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Box, FormControl, MenuItem, Select, } from '@mui/material';
import ViewSection from '../ViewSection';
import Loading from '../Loading';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
const getFilterStateData=()=>{
 

  if(window.location.href.includes('?')){
    const params = new URL(window.location.href).searchParams;
    let filter = params.get('launch')
if(filter){

return filter

}
}else  {


return 'all'
}
}
const getTimeStateData=()=>{
 
  if(window.location.href.includes('?')){
    const params = new URL(window.location.href).searchParams;
    let time = params.get('time')
if(time){

return time

}
}else {


return 'past'
}
}
export default function Dashboard() {
    const [filter, setFilter] = React.useState(getFilterStateData());
    const [time, setTime] = React.useState(getTimeStateData());

    const [allData, setAllData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);



    const handleChange = (event) => {
      setFilter(event.target.value);
      setLoading(true)
      var str = window.location.search
      str = replaceQueryParam('launch', event.target.value, str)
      window.history.pushState({},null,str)
    };
    const handleTimeChange = (event) => {
      setTime(event.target.value);
      setLoading(true)
      var str = window.location.search
      str = replaceQueryParam('time', event.target.value, str)
      window.history.pushState({},null,str)
    };
    function replaceQueryParam(param, newval, search) {
      var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
      var query = search.replace(regex, "$1").replace(/&$/, '');
      return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
  }

  const fetchData=()=>{
    fetch(`https://api.spacexdata.com/v3/launches/${time}`).then(data=>data.json()).then((res)=>{setAllData(res);setLoading(false)})
  }

      const fetchDataWithFilter=()=>{
        if(filter==='all'){
          fetchData()
        }else{

          fetch(`https://api.spacexdata.com/v3/launches/${time}?${getFilter()}`).then(data=>data.json()).then((res)=>{setAllData(res);setLoading(false)})
        }
      }

      useEffect(() => {
        setLoading(true)
       }, [])
      
       useEffect(() => {
        fetchDataWithFilter()
       }, [filter,time])
       
       const getFilter=()=>{
        if(filter==='success'){
          return 'launch_success=true'
        }else {
          return 'launch_success=false'
        }
       }
  return (
    <>
    <Box>

    <Box display='flex' justifyContent='space-between' alignItems='center' marginTop='1rem'>
        <Box display='flex' justifyContent='center' alignItems='center' sx={{gap:'0.25rem'}} className='customSelect'>


<FormControl variant="outlined" >
<span className="frmLeftIcons">
<CalendarTodayOutlinedIcon/>
                            </span>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={time}
    label="Time"
    style={{paddingLeft:35,marginTop:-3}}
    onChange={handleTimeChange}
  >
    <MenuItem value='past'>Past 6 Months</MenuItem>
    <MenuItem value='upcoming'>Upcoming Launches</MenuItem>
  </Select>
</FormControl>
{/* <ExpandMoreIcon/> */}

</Box>

<Box display='flex' justifyContent='center' alignItems='center' sx={{gap:'0.25rem'}}>

<FormControl variant="outlined">
<span className="frmLeftIcons">
<FilterAltIcon/>
                            </span>

  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={filter}
    label="Filter"
    onChange={handleChange}
    style={{paddingLeft:35,marginTop:-3}}
  >
    <MenuItem value='all'>All Launches</MenuItem>
    <MenuItem value='success'>Successful Launches</MenuItem>
    <MenuItem value='failes'>Failed Launches</MenuItem>
  </Select>
</FormControl>

</Box>

    </Box>
    {
loading ? <Loading/>:
      allData.length!==0 ? <ViewSection data={allData}/>:'No results found for the specified filter'
    }
    </Box>
    </>
  )
}
