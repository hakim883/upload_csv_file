import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios';



export const uploadCsv =createAsyncThunk('file/uploadCsv' ,async (files,{rejectWithValue})=>{

  try {
    
    const {data} = await axios.post('http://localhost:5000/api/files/create',files)
    
    return data

} catch (error) {
  return rejectWithValue(error.response.data.message )
}
})


export const deleateallCsvData = createAsyncThunk('file/deleateallcsvData', async () => {
  try {
    const {data} = await axios.delete('http://localhost:5000/api/files/');
   return data
  } catch (error) {
    throw error.response.data;
  }
});


export const readCsvData = createAsyncThunk('file/readCsvData', async () => {
  try {
    const {data} = await axios.get('http://localhost:5000/api/files/read');
   return data
  } catch (error) {
    throw error.response.data;
  }
});
export const Updatingfile = createAsyncThunk('file/Updatingfile', async(updatedfile,{rejectWithValue,dispatch})=>{
  try {
      const {data} = await axios.put(`http://localhost:5000/api/files/update/${updatedfile._id}`,updatedfile)
      dispatch(readCsvData())

      return data
  } catch (error) {
      return rejectWithValue(error.response.data.message)
  }
})
export const Deletingfile = createAsyncThunk('file/Deletingfile', async(id,{rejectWithValue,dispatch})=>{
  try {
      const {data} = await axios.delete(`http://localhost:5000/api/files/${id}`)
      dispatch(readCsvData())
      return data
  } catch (error) {
      return rejectWithValue(error.response.data.message)
  }
})
export const exportcsv = createAsyncThunk('file/exportcsv', async(__,{rejectWithValue})=>{


  try {
    const {data }= await axios.get('http://localhost:5000/api/files/export', { responseType: 'blob' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    return rejectWithValue(error.response.data.message)

  }
}

)










  



const fileSlice = createSlice({
  name: 'file',
    initialState:{ 
      isLoading: false,
      Errors : null,
      array:[],
      file:{}
  },
   
  reducers:{  },

  extraReducers:{
      [uploadCsv.pending]: (state)=>{
          state.isLoading = true
      },
      [uploadCsv.fulfilled]: (state,{type,payload})=>{
          state.isLoading = false
          state.array= payload;
         
         

        },
      [uploadCsv.rejected] : (state,{type,payload})=>{
        state.isLoading = true
      },    
  
      [readCsvData.pending]: (state)=>{
          state.isLoading = true
      },
      [readCsvData.fulfilled]: (state,{type,payload})=>{
          state.isLoading = false
          state.array= payload;


        },
      [readCsvData.rejected] : (state,{type,payload})=>{
          state.Errors = payload
      },
      
      
      [deleateallCsvData.pending]: (state)=>{
        state.isLoading = true
    },
    [deleateallCsvData.fulfilled]: (state,{type,payload})=>{
      state.isLoading = false
      state.file= state.array.splice(0)


      },
    [deleateallCsvData.rejected] : (state,{type,payload})=>{
        state.Errors = payload
    }, 








   
      [Updatingfile.pending]: (state)=>{
        state.isLoading = true
    },
    [Updatingfile.fulfilled]: (state,action)=>{
        state.isLoading = false
        state.file = state.array.map(row=> (row._id == action.payload._id)? {...row,...action.payload} : row )
    },
    [Updatingfile.rejected]: (state,action)=>{
        state.Errors = action.payload
    },


    [Deletingfile.pending]: (state)=>{
        state.isLoading = true
    },
    [Deletingfile.fulfilled]: (state,action)=>{
        state.isLoading = false
        state.file= state.array.filter(row=> row._id !== action.payload.deletedfile._id )
    },
    [Deletingfile.rejected]: (state,action)=>{
        state.Errors = action.payload
    },

    [exportcsv.pending]: (state)=>{
      state.isLoading = true
  },
  [exportcsv.fulfilled]: (state,{type,payload})=>{
      state.isLoading = false
      state.array= payload;


    },
  [exportcsv.rejected] : (state,{type,payload})=>{
      state.Errors = payload
  },    

    
    }


    }
  )  
  
  export default fileSlice.reducer
