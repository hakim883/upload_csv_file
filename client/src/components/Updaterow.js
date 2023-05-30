import React, { useState } from 'react';

import { useSelector } from 'react-redux'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Updatingfile } from '../Redux/fileSlice';
import { useDispatch } from 'react-redux'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import Box from '@mui/material/Box';
const Updaterow = ({File}) => {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const array = useSelector(state => state.CsvReducer.array)

    const file=useSelector(state => state.CsvReducer.file)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [updatedfile, setUpdatedfile] = useState({
      _id:File._id,
      Index: File.Index,
      email: File.email,
      Name: File.Name,
      last_name:File.last_name,
      gender:File.gender,
      ip_address:File.ip_address
    })

    const updating=()=>{
      dispatch(Updatingfile(updatedfile))
      handleClose()
    }
    
  const HandleChange = (e) => {

    setUpdatedfile({ ...updatedfile, [e.target.name]: e.target.value })
  }
  
  const dispatch = useDispatch()
  return (
    <div>
    <Button onClick={handleOpen}><PublishedWithChangesIcon/></Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>

          <p>  line {File.Index}  is selected </p>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Index
            </InputLabel>
            <Input
              onChange={HandleChange}
              name='Index'
              id="Index"
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
            />
          </FormControl>
          <TextField
            id="input-with-icon-textfield"
            label="Name"
            name='Name'
            onChange={HandleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">

                </InputAdornment>
              ),
            }}
            variant="standard"
          />



          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              last_name
            </InputLabel>
            <Input
              onChange={HandleChange}
              name='last_name'
              id="last
              _name"
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              email
            </InputLabel>
            <Input
              onChange={HandleChange}
              name='email'
              id="email"
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Website
            </InputLabel>
            <Input
              onChange={HandleChange}
              name=' Website'
              id=" Website"
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              gender
            </InputLabel>
            <Input
              onChange={HandleChange}
              name='gender'
              id="gender"
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
            ip_address
            </InputLabel>
            <Input
              onChange={HandleChange}
              name='ip_address'
              id="ip_address"
              startAdornment={
                <InputAdornment position="start">
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Button onClick={updating} variant="danger">Update</Button>

      </Box>

    </Modal></div>
  )
}

export default Updaterow