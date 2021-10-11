import React from 'react';
import { useApolloClient } from '@apollo/client';
import { GetDispatch  } from '../../store/hooks';
import { Currency } from '../../reducers/'

export function Home() {
  var dispatch = GetDispatch()
  var {countries} = Currency.State()
  if(countries === undefined) {
    countries = []
  }
  var client = useApolloClient();
  return (
    <div>
      <button onClick={() => dispatch(Currency.actionsAsync.GetData({client: client,details:{filter:{code:"",currency:"",continent:""}}}))}>
       Get Currencies 
      </button>
      <button onClick={() => dispatch(Currency.actions.Reset())}>
       Reset
      </button>
      {countries.map((value,index) => 
        <div key={index}>
          {index}: {value.currency} - {value.name} 
        </div>
      )}
    </div>
  )
}
