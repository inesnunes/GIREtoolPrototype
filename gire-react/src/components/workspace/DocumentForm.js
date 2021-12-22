import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChars, removeChar, clearDocumentCreation } from '../../reducers/documentReducer';
import { addOrEditDocument } from '../../reducers/workspaceReducer';
import { clearDetail } from '../../reducers/modelReducer'

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Model from '../Model/Model';
import Grid from '@material-ui/core/Grid';
import DocumentQuestions from './DocumentQuestions';
import DocumentDetails from './DocumentDetails';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select model concepts', 'Select questions', 'Add document details']; 
}


function questionsSelected(chars){
    var selected = 0
    for(const char of chars){
        if(char.questions.length !== 0)
            selected++
    }
    return (selected === chars.length)
}

export default function DocumentForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useHistory();
  const steps = getSteps();
  const dispatch= useDispatch();
  const characteristics = useSelector(selectChars);
  var document = useSelector(state=> state.document)

  const qSelected = questionsSelected(characteristics)

  const moveToNextStep = () =>{
      setActiveStep(activeStep+1)
  }
   const moveToPreviousStep = () =>{
      setActiveStep(activeStep-1)
  }

  const createDocument = (doc_details) =>(event)=>{
        event.preventDefault();
        doc_details.participants = doc_details.participants.split('\n')
        var doc = {details:doc_details, ...document};

        console.log(doc_details);
        console.log(doc);
        dispatch(addOrEditDocument(doc))
        dispatch(clearDocumentCreation())
        dispatch(clearDetail())
        history.push('/workspace')

  }

  return (
    <div className={classes.root}>
    <Grid container justifyContent='center' direction='row' spacing={3}>
        <Grid item xs={12} md={9}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Grid>
        <Grid container justifyContent='center' direction='row' spacing={0}>
            <Button 
            variant="contained" 
            color='primary' 
            disabled={activeStep === 0}
            onClick={moveToPreviousStep}
            >
            Previous
            </Button>
            {activeStep==2 ?
            <div></div>
            :
            <Button 
            variant="contained" 
            color='primary'
            disabled={(characteristics.length === 0) || (activeStep==1 && !qSelected)}
            onClick={moveToNextStep}
            >
            Next
            </Button>
            }
        </Grid>
        { activeStep === 0 ?
        <Grid item md={4} xs={12}>
            <Paper component="ul" className={classes.root}>
            <Grid container justifyContent='center'>
                <Typography>Selected:</Typography>
            {characteristics != null ? characteristics.map((data) => {
                return (
                <li key={data.name}>
                    <Chip
                    color='primary'
                    clickable={false}
                    label={data.name}
                    onDelete={()=>{dispatch(removeChar(data.name))}}
                    className={classes.chip}
                    />
                </li>
                );
            }) : <div></div>}
            </Grid>
            </Paper>
        </Grid>: <div></div>}
        <Grid item xs={12} md={12}>
            { activeStep === 0 ? 
                <Model/> 
                : <div></div> }
            { activeStep === 1 ?   
                <DocumentQuestions characteristics={characteristics}/>
            : <div></div>
            }
            { activeStep === 2 ?   
                <DocumentDetails  createDocument={createDocument}/>
            : <div></div>
            }
        </Grid>
      </Grid>

    </div>
  );
}