import React from 'react';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ModelInfo from '../../app/model_objectives.json'
import ModelQuestions from '../../app/model_questions.json'

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    maxWidth: 350,
    backgroundColor: '#E1BEE7'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


function loadFile(location, callback) {
    PizZipUtils.getBinaryContent(location, callback);
  }


function generateExportData(document){

    // add characteristics
    var export_variables={}
    var chars=[]
    var goals=[]
    var questions = []
    var participants = []
    document.details.participants.map( p=> participants.push({participant: p}))
    document.chars.map(c => chars.push({char: c.name, goals:[], questions:[]}))

    //Add goals per characteristic
    for(const c of chars){
         //Add goals per characteristic
        const info = ModelInfo.find(mi => mi.name === c.char)
        info.goals.map(g => goals.push({'goal':g.goal}))
        c['goals'] = goals

         //Add questions per characteristic
        const doc_char =  document.chars.find( dc => dc.name ===c.char)
        doc_char.questions.map( dq => questions.push({question: ModelQuestions[c.char][dq].value}))
        c['questions'] = questions
    }

    return {characteristics:chars, name: document.details.name, author:document.details.author, participants:participants}
}


export default function DocumentItem(props) {
  const classes = useStyles();
  const {document} = props

  const generateDocument = () => {
    loadFile(process.env.PUBLIC_URL + '/template-example.docx', function(
      error,
      content
    ) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      });
      doc.setData(generateExportData(document));
      try {
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function(error) {
              return error.properties.explanation;
            })
            .join('\n');
          console.log('errorMessages', errorMessages);
          // errorMessages is a humanly readable message looking like this:
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }); //Output the document using Data-URI
      saveAs(out, 'output.docx');
    });
  };
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body1" component="h1" gutterBottom>
          Name: {document.details.name}
        </Typography>
        <Typography variant="body1" component="h2" gutterBottom>
          Author: {document.details.author}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" variant="body1">
          Characteristics:
        </Typography>
        <Typography variant="body2" component="p">
          {document.chars.map(c => c.name)}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" variant="body1">
          Participants:
        </Typography>
        <Typography variant="body2" component="p">
          {document.details.participants}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={generateDocument}>Export</Button>
        <Button size="small" variant="contained" color="primary">Edit</Button>
        <Button size="small" variant="contained" color="primary">Delete</Button>
      </CardActions>
    </Card>
  );
}