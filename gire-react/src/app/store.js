import { configureStore } from '@reduxjs/toolkit';
import modelReducer from '../reducers/modelReducer';
import workspaceReducer from '../reducers/workspaceReducer';
import documentReducer from '../reducers/documentReducer';

export const store = configureStore({
  reducer: {
    model: modelReducer,
    workspace: workspaceReducer,
    document: documentReducer
  },
});

window.store = store;