import { createAsyncThunk, createSlice, PayloadAction, AsyncThunkOptions} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState, AppThunk } from '../store/store'
import { StateSelector } from '../store/hooks'
import { gql } from '@apollo/client';
import { useApolloClient, ApolloClient} from '@apollo/client';


export interface CountryCurrency {
  name: string
  currency: string
}

export interface CurrencyState {
  countries: CountryCurrency[]
}
const initialState: CurrencyState = {
  countries: []
};

export const GetDataQuery = gql`
query {
  countries(filter: {}) {
    name
    currency
  }
}
`;
export interface GetDataResults {
  countries: CountryCurrency[]
}

export interface GetDataVariables {
  filter: {
    code: string,
    currency: string,
    continent: string
  }
}
const GetData = createAsyncThunk('currency/GetData',async(args: {client: ApolloClient<unknown>, details: GetDataVariables}) => {
  return args.client.query<GetDataResults,GetDataVariables>({query: GetDataQuery,variables: args.details})
})

export const actionsAsync = { GetData }
export const currency = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    Reset: (state) => {
      console.log("reset")
      state.countries = [];
    }
  },
  extraReducers: (builder) => {
    ///////////////////////////////////////////////////////
    // GetData
    ///////////////////////////////////////////////////////
    builder
      .addCase(GetData.pending, (state) => {
        console.log("loading")
      })
      .addCase(GetData.fulfilled, (state, action) => {
        var data = action.payload.data
        if(action.payload == null || data === undefined || action.payload.error !== undefined) {
          console.log(action.payload.error?.message ?? "")
          return
        }
        console.log("loaded")
        return {countries: data.countries}
      })
      .addCase(GetData.rejected,(state,action) => {
        console.log("Failed",action.error.message ?? "")
      });
  }
})

// export const state = (state: RootState) => state.user;
export const { actions,reducer } = currency
export const State = () => StateSelector((state) => state.currency)
