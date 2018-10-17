// @flow

import type {
	Store as ReduxStore,
	Dispatch as ReduxDispatch,
} from 'redux';

export type Store = ReduxStore;
export type GetState = () => Object;
export type Dispatch = ReduxDispatch<any> & Thunk<any>;
export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

export type ImportDataType = Array<{|date: string, temp: string|}>;
