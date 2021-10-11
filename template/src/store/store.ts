import { configureStore, ThunkAction, Action, applyMiddleware  } from '@reduxjs/toolkit';
import { Currency } from '../reducers/'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import thunk from 'redux-thunk';
import { saveState, loadState } from './storage'

export const graphQLClient = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});
export const store = configureStore({
  reducer: {
    currency: Currency.reducer,
  },
  middleware: [
    thunk.withExtraArgument({client: graphQLClient})
  ],
  preloadedState: loadState()
});

store.subscribe(() => {
  var state = store.getState()
  saveState({
    localState: { },
    sessionState: {
      currency: state.currency
    }
  })
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
