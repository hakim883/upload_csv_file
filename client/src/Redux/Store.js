import { configureStore } from "@reduxjs/toolkit";
import CsvReducer from "./fileSlice"
  export const  Store=configureStore ({
    reducer:{
      CsvReducer
  }
})