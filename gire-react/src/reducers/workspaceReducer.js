import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    documents:[]
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addOrEditDocument: (state, action) => {
        var document = action.payload;
        document = {details: document.details, chars:document.chars}


        //See if document with same name already exists, if so replace it
        var existing_doc= state.documents.find( d => d.details.name == document.details.name)
        
        if(typeof existing_doc ==='undefined')
            state.documents.push(document)
        
        else
            existing_doc = document
    }

}});

export const { setDetail, addOrEditDocument } = workspaceSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDocuments = (state) => state.workspace['documents'];

export default workspaceSlice.reducer;