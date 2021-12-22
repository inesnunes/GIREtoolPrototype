import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'center',
    alignItems:'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));




export default function DocumentDetails(props) {
  const classes = useStyles();
  const [doc_name, setDocName] = React.useState('');
  const [doc_author, setDocAuthor] = React.useState('');
  const [doc_participants, setDocParticipants] = React.useState('');
  const {createDocument} =  props

  return (
    <Grid container justifyContent='center' direction='row' alignItems='center' spacing={6}>
    <Grid item xs={12} md={6}>
    <form className={classes.root} noValidate autoComplete="off" 
            onSubmit={createDocument({name:doc_name,author:doc_author,participants:doc_participants})}>
        <Grid item xs={12} md={12}>
        <Typography variant="h2" component='h2'>Document Details</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
            <TextField required id="doc_name" label="Document name" value={doc_name} onInput={e => setDocName(e.target.value)} fullWidth/>
        </Grid>
        <Grid item xs={12} md={12}>
            <TextField required id="doc_author" label="Author" value={doc_author} onInput={e => setDocAuthor(e.target.value)}  fullWidth/>
        </Grid>
        <Grid item xs={12} md={12}>
            <TextField required id="doc_participants" label="Participants (Add one per line)" value={doc_participants} onInput={e => setDocParticipants(e.target.value)}  multiline rows={5} fullWidth/>
        </Grid>
        <Grid item xs={12} md={2}>
        <Button 
            variant="contained" 
            color='primary'
            type='submit'
            disabled={doc_name === '' || doc_author === '' || doc_participants === ''}
            >
            Create Document
        </Button>
        </Grid>
    </form>
    </Grid>
    </Grid>
  );
}