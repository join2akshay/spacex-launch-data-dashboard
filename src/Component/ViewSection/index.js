import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment/moment';
import React, { useMemo, useState } from 'react'
import CustomDialog from '../Dialog';
import Pagination from '../Pagination';
let PageSize = 10;

export default function ViewSection({data}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});


  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage,data]);
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No:</TableCell>
            <TableCell >Launched UTC</TableCell>
            <TableCell >Location</TableCell>
            <TableCell >Mission</TableCell>
            <TableCell >Orbit</TableCell>
            <TableCell >Launch Status</TableCell>
            <TableCell >Rocket</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
            {
                currentTableData.map((item,i)=> <TableRow onClick={()=>{setSelectedValue(item);setOpen(true)}}
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor:'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {(currentPage - 1) * 10 + i+1}
                </TableCell><TableCell component="th" scope="row">
                  {moment(item.launch_date_utc).format(' Do MMMM YYYY, HH:mm')}
                </TableCell>
                <TableCell >{item.launch_site.site_name}</TableCell>
                <TableCell >{item.mission_name}</TableCell>
                <TableCell >{item.rocket.second_stage.payloads[0].orbit}</TableCell>
                <TableCell >{item.launch_success ? 'Success' : 'Failed'}</TableCell>
                <TableCell >{item.rocket.rocket_name}</TableCell>

              </TableRow>)
            }
       
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination
    className="pagination-bar"
    currentPage={currentPage}
    totalCount={data.length}
    pageSize={PageSize}
    onPageChange={page => setCurrentPage(page)}
  />
 <CustomDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
  </>
  )
}
