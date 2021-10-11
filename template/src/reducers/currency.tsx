import { createAsyncThunk, createSlice, PayloadAction, AsyncThunkOptions} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState, AppThunk } from '../app/store'
import { StateSelector } from '../app/hooks'
import { gql } from '@apollo/client';
import { useApolloClient, ApolloClient} from '@apollo/client';


export interface CountryCurrency {
  name: string
  currency: string
}

const initialState: CountryCurrency[] = [];

export const GetDataQuery = gql`
query getCountry() {
  countries(filter: {}) {
    name
    currency
  }
}
`;
export interface GetDataResults {
  createUser: {
    countries: CountryCurrency[]
  }
}

export interface GetDataVariables {
  filter: {
    code: string,
    currency: string,
    continent: string
  }
}
const GetData = createAsyncThunk('user/LoginAsync',async(args: {client: ApolloClient<unknown>, details: GetDataVariables}) => {
  return args.client.query<GetDataResults,GetDataVariables>({query: GetDataQuery,variables: args.details})
})

export const actionsAsync = { GetData }
export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    Reset: (state) => {
      state = [];
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
        state = data
      })
      .addCase(GetData.rejected,(state,action) => {
        console.log("Failed",action.error.message ?? "")
      });
  }
})

// export const state = (state: RootState) => state.user;
export const { actions,reducer } = user
export const State = () => StateSelector((state) => state.user)
