import React from 'react'
import { useSelector, useDispatch} from 'react-redux';
import {selectDetail} from '../../reducers/modelReducer';
import {addChar, removeChar, selectChars} from '../../reducers/documentReducer';


import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import * as Scroll from 'react-scroll';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    column: {
        flexBasis: '100%',
      },
    table: {
        minWidth: 650,
      },
  }));


const ModelInfo = () =>{
    const classes = useStyles();
    const detail = useSelector(selectDetail);
    const chars = useSelector(selectChars);
    
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      Scroll.animateScroll.scrollToBottom();
    };

    const addToDocument = (char) =>(event)=>{
        event.stopPropagation();
        dispatch(addChar(char));
        Scroll.animateScroll.scrollToTop();
    }

    const removeFromDocument = (char) =>(event)=>{
        event.stopPropagation();
        dispatch(removeChar(char));
        Scroll.animateScroll.scrollToTop();
    }

    if (!detail) {
        return (
            <div className={classes.root}>
            </div>
          );
    }
   
    return( 
        <div>
            <Typography variant="h2" component='h2'>Characteristics</Typography>
        <div>

        </div>
        <div>
        {detail.map( d => 
           <Accordion expanded={expanded === d.name} onChange={handleChange(d.name)} key={d.name}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1bh-content"
             aria-label="Expand"
             id="panel1bh-header"
           >
             <Typography className={classes.heading}>{d.name}</Typography>
             <Typography className={classes.secondaryHeading}>{d.description}</Typography>
             {
                chars.filter(e=>e.name === d.name).length === 0 ? 
                    <Button 
                    variant="contained" 
                    color="primary"
                    onClick={addToDocument(d.name)} 
                    onFocus={(event) => event.stopPropagation()}
                    >Add to Document
                    </Button>
                : 
                <Button 
                variant="contained" 
                color="secondary"
                onClick={removeFromDocument(d.name)} 
                onFocus={(event) => event.stopPropagation()}
                >Remove from document
                </Button>
            }
           </AccordionSummary>
           <Divider />
           <AccordionDetails>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        <TableRow key="goals">
                            <TableCell>
                                <b>Goals</b>
                            </TableCell>
                            {d.goals.map(g =>
                            <TableCell align="center" colSpan={g.gender_issues.length} key={g.goal}>
                                {g.goal}
                            </TableCell>
                            )}
                        </TableRow>
                        <TableRow key='issues'>
                            <TableCell align='left' rowSpan={2}>
                                <b>Potential Gender issues</b>
                            </TableCell>
                            {d.goals.map(g => {
                                return g.gender_issues.map(gi =>
                                            <TableCell align='center' key={gi.name}>
                                            {gi.name}
                                            </TableCell>
                                    )}
                            )} 
                        </TableRow>
                        <TableRow key='issues_description'>
                            {d.goals.map(g => {
                                return g.gender_issues.map(gi =>
                                            <TableCell align='center' key={gi.name}>
                                            {gi.description}
                                            </TableCell>
                                    )}
                            )} 
                        </TableRow>
                    </TableBody>
            </Table>
            </TableContainer>
           </AccordionDetails>
         </Accordion>
        )}
        </div>
        </div>
    )
}

export default ModelInfo;


/*
    <Grid item xs={9}>
                    <ul>
                    {d.goals.map(g =>  
                    <li>
                        <Typography className={classes.column}>
                            {g.goal}
                        </Typography>
                    </li>   
                    )}
                    </ul>
                </Grid>
                */