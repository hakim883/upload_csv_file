import React,{useState} from 'react'

import { useDispatch } from 'react-redux'
import { deleateallCsvData, uploadCsv } from '../Redux/fileSlice';

import EnhancedTable from '../components/EnhancedTable'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Import = () => {


  
    const [file, setFile] = useState(null);
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
    const dispatch = useDispatch()

  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
       dispatch(deleateallCsvData())
       dispatch(uploadCsv(formData))
      }
    };
  
    return (
      <><Form     onSubmit={handleSubmit}>
        <input  style={{  marginRight:' 20px',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '10px',
  cursor: 'pointer',
}} type="file" accept=".csv" onChange={handleFileChange} />
        <Button type="submit">Upload</Button>
      </Form><div> <EnhancedTable/></div></>

    );
  }
  

export default Import