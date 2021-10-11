import React from 'react';
import { useApolloClient } from '@apollo/client';
import { GetDispatch  } from '../../store/hooks';
import { Currency } from '../../reducers/'

export function Home() {
  var dispatch = GetDispatch()
  var currencies = Currency.State()
  var client = useApolloClient();
  return (
    <div>
      <span>
        {currencies}
      </span>
      <button onClick={() => dispatch(Currency.actionsAsync.GetData({client: client,details:{}}))}>
       Get Currencies 
      </button>
      <button onClick={() => dispatch(Currency.actions.Reset())}>
       Reset
      </button>
    </div>
  )
}
