import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from './components/NavBar'
import Model from './components/Model/Model';
import Header from './components/Landing';
import DocumentList from './components/workspace/DocumentList';
import DocumentForm from './components/workspace/DocumentForm';
import Grid from '@material-ui/core/Grid';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: "#d1cbcb",
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#cd9762',
      },
    },
  });

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1
    }
}));


function App() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Grid className={classes.root} container spacing={3} justifyContent = "center" alignItems='center' direction='row' >
                    <Grid item xs={12}>
                        <NavBar/>
                    </Grid>
                    <Switch>
                        <Route path="/model">
                            <Model />
                        </Route>
                        <Route path="/document/new">
                        <Grid item xs={12} md={12}>
                            <DocumentForm />
                        </Grid>
                        </Route>
                        <Route path="/workspace">
                        <Grid item xs={12} md={10}>
                            <DocumentList />
                        </Grid>
                        </Route>
                        <Route path="/">
                            <Header />
                        </Route>
                    </Switch>
                    </Grid>
        </Router>
        </ThemeProvider>
  );
}

export default App;
