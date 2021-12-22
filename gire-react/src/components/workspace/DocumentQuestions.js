import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, removeQuestion } from '../../reducers/documentReducer';


import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import ModelQuestions from '../../app/model_questions.json'

function TabPanel(props) {
  const {char, dispatch, children, value, index, ...other} = props;
  const questions = useSelector(state=> state.document.chars.find(e=>e.name === char.name).questions)

  const handleChange = (payload) => (event) =>{
    if(event.target.checked)
        dispatch(addQuestion(payload))
    else 
        dispatch(removeQuestion(payload))
  }


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        ModelQuestions[char.name].map((q,i)=> 
            <Box p={3} key={q.value}>
            <Checkbox
            checked={questions.includes(i)}
            onChange={handleChange({char: char.name, index:i})}
            color='primary'
            inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography variant="body1" display='inline'>{q.value}</Typography>
            </Box>
        )
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexGrow: 1,
    paddingTop: 50,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function DocumentQuestions(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch= useDispatch();

  const {characteristics} = props;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <Grid container justifyContent = "flex-start" spacing={2} className={classes.root}>
        <Grid item xs={4} md={2}>
        <Tabs
            orientation="vertical"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
             {characteristics.map((c,i)=>
                <Tab key={i} label={c.name + " " + c.questions.length + "/" + ModelQuestions[c.name].length} {...a11yProps(i)} />
            )}
        </Tabs>
        </Grid>
      <Grid item xs={8} md={10}>
      {characteristics.map((c,i)=>
                <TabPanel key={i} char={c} dispatch={dispatch} value={value} index={i}/>
      )}
      </Grid>
    </Grid>
  );
}