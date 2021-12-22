import { createSlice } from '@reduxjs/toolkit';

const model_objectives = 
{
    "Preferences":
    [{
        id:"visual_design",
        name:"Visual Design", 
        description: "Aesthetics of the software interface, including imagery, colorfulness, themes, icons, complexity, and fonts",
        goals: [
            {
                goal: 'Analyse the UI to identify and remove potential gender stereotypes in the visual design',
                gender_issues: [
                    {
                        name: "Stereotypical masculine visual elements",
                        description: "Stereotypical masculine visual elements in the interface can make potential users who do not identify with such design feel like the software is not meant for them and decrease the motivation for interacting with it. This design negatively impacts the majority of potential users, including men."   
                    },
                    {
                        name: "Shrink it and and Pink it",
                        description: "Do not design “for women” based on traditional definitions of femininity. Inscribing stereotypical feminine visual design in the interface of the software perpetuates gender roles and marginalizes female users."   
                    }
                ]
                 
            },
            {
                goal: 'Include the preferences of all users and not prioritize the aesthetic and visual preferences of a group of users at the expense of others',
                gender_issues: [
                    {
                        name: "\“Neutral\” design assumption",
                        description: "Assuming the design is \"neutral\" and ignoring gender during interface design might result in masculine aesthetic preferences being adopted. This option can negatively impact the attitudes and perceptions of users who do not identify with such preferences and are more critical and sensitive to the visual design of the system."   
                    }
                ]
                 
            },
        ],
    

    }
    ]
}

const model_questions =
{
    "Visual Design": 
    [
        {
            id:0,
            value: "Does the system provide gender inclusive, rather than gendered or \"neutral\", visual design? Are the aesthetic elements of the system inclusive?"
        },
        {
            id:1,
            value:"Can the visual design be discriminating against any user of any gender identity (e.g., does it include stereotypical masculine elements)?"
        },
        {
            id:2,
            value:"Are the visual design choices for the system based on gender essentialism stereotypes of women’s and men’s preferences?"
        }
    ]
}



const initialState = {
  detail: '',
  selected_node:''
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setDetail: (state, action) => {
      state.detail = model_objectives[action.payload];
      state.selected_node = action.payload;
    },
    clearDetail: (state, action) =>{
        const cleared_state = {...initialState};
        return cleared_state
    }
  }
});

export const { setDetail, clearDetail } = modelSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDetail = (state) => state.model.detail;
export const selectedNode = (state) => state.model.selected_node;

export default modelSlice.reducer;