import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { selectDocuments } from '../../reducers/workspaceReducer'
import Grid from '@material-ui/core/Grid';
import DocumentItem from './DocumentItem';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  }));

const DocumentList = () =>{
    const classes = useStyles();
    const documents = useSelector(selectDocuments);
     
    return( 
        <Grid container justifyContent='flex-start' direction='row' alignItems='flex-start' spacing={10}>
                <Grid item xs={12}>
                <Typography variant="h2" component='h2'>Documents</Typography>
                </Grid>
                {documents.length === 0 ?
                    <Grid item xs={12}>
                        No documents
                    </Grid>
                :
                    documents.map( d => 
                        <Grid item xs={12} md={4} key={d.details.name}>
                        <DocumentItem key={d.details.name} document={d}/>
                        </Grid>
                )}
                <Grid container>
                    <Grid item xs={4} md={4}>
                        <Link to='/document/new'>
                        <Button variant="contained" color="primary">Create new Document</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Button variant="contained" color="primary">Import Workspace</Button>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Button variant="contained" color="primary">Export workspace</Button>
                    </Grid>
                </Grid>
              </Grid>
    )
}

export default DocumentList;