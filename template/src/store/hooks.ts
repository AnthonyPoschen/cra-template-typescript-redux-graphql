import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const GetDispatch = () => useDispatch<AppDispatch>();
export function StateSelector<Type>(Func: {(Arg: RootState):Type}):Type {
  return useSelector<RootState,Type>(Func)
} 
