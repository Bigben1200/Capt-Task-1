// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api/httpService";

interface PersonalData {
    internalUse: boolean;
    show: boolean
}

interface PersonalQuestions {
    id: string;
    type: string;
    question: string;
    choice: string[];
    maxChoice: number;
    disqualify: boolean;
    other: boolean;
}

export interface personalInfo {
    firstName: PersonalData;
    lastName: PersonalData; 
    emailId: PersonalData;
    phoneNumber: PersonalData;
    nationality: PersonalData;
    currentResidence: PersonalData;
    idNumber: PersonalData;
    dateOfBirth: PersonalData;
    gender: PersonalData;
    personalQuestions: PersonalQuestions[] 
}

interface Profile {
    education: PersonalData;
    experience: PersonalData;
    resume: PersonalData;
    profileQuestions: PersonalQuestions[]
}

export interface Attributes {
    coverImage: string;
    personalInformation: personalInfo;
    profile: string;
    customisedQuestions: PersonalQuestions[]
  }



export interface InitialState {
  attributes: Attributes[];
  isLoading: boolean;
  error: string;
  message: string;
}
const initialState: InitialState = {
  attributes: [],
  isLoading: false,
  error: "",
  message: "",
};

export const getData = createAsyncThunk(
  "getData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/973.3763674530109/programs/illo/application-form");
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      if (error.request) {
        return thunkAPI.rejectWithValue("Network Error");
      }
      if (error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);



export const getDataSlice = createSlice({
  name: "vendorFood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.message = "";
      state.error = "";
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      // Add user to the state array
      state.attributes = action.payload.allFood;
      //state.message = action.payload.message
      state.error = "";
      //toast.success(action.payload.message)
    });

    builder.addCase(getData.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.message = "";
      state.error = action.payload as string;
      //toast.error(action.payload as string)
    });


  },
});

// Action creators are generated for each case reducer function
//   export const { logout, loginSuccess } = popularFoodSlice.actions;

export default getDataSlice.reducer;
