import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    chars:[]
};


const documentSlice = createSlice({
  name: 'document',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addChar: (state, action) => {
        var current_chars = state.chars
        const new_char = {name: action.payload, questions:[]}

        if(current_chars.filter(e=>e.name === action.payload).length === 0)
            current_chars.push(new_char)
        
        state.chars = current_chars;
      },

    removeChar:(state, action) => {
        const filtered_chars = state.chars.filter(e => e.name !== action.payload);
        state.chars = filtered_chars;
      },

    addQuestion:(state, action) => {
        var new_question_char = action.payload.char
        var new_question_idx = action.payload.index

        //Find characteristic
        const char = state.chars.find(char => char.name === new_question_char)
        
        //Add new index to questions array
        var questions = char.questions
        if(questions.indexOf(new_question_idx)===-1)
            questions.push(new_question_idx)

      },
      
    removeQuestion:(state, action) => {
        var existing_question_char = action.payload.char
        var existing_question_idx = action.payload.index

         //Find characteristic
         const char = state.chars.find(char => char.name === existing_question_char)

         //Remove question idx from array
         const idx = char.questions.indexOf(existing_question_idx)
         if(idx > -1)
            char.questions.splice(idx,1)

      },
    clearDocumentCreation:(state,action)=>{
        const cleared_state = {...initialState};
        return cleared_state
    }

}});

export const { addChar, removeChar, addQuestion, removeQuestion, clearDocumentCreation } = documentSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectChars = (state) => state.document['chars'];

export default documentSlice.reducer;