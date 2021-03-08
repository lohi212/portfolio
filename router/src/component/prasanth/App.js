import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
//import ScoringSection from "./ScoringSection"
// import FormDialog from "./FormDialog"
import ICPlist from "./ICPlist"
import ICPconditions from "./ICPconditions";
import Filter from "./Filter";
import FilterEdit from "./FilterEdit";
import  ComboBox  from "./ComboBox";
import { ThemeProvider } from "@material-ui/core";
// import AddButton from "./AddButton";


//import MultipleSelect from "./MultipleSelect"
//import Revenue from "./Revenue"
//import ScoringSectionHeader from "./ScoringSectionHeader"


function App() {
  return (
        // <div><ComboBox /></div>
    
  //  <ThemeProvider theme={theme}></ThemeProvider>
      <Router>
      <div>

        <ul className="App-header">
          <li>
            <Link to="/">ICPlist</Link>
          </li>
          <li>
            <Link to="/ICPConditions">ICPconditions</Link>
          </li>
          <li>
            <Link to="/FilterEdit">FilterEdit</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path='/' component={ICPlist}></Route>
          <Route exact path='/ICPconditions/:icpname/:filterid' component={ICPconditions}></Route>
          <Route exact path='/FilterEdit/:icpname' component={FilterEdit}></Route>
        </Switch>
       
      </div>
    </Router>
  );
}

export default App;
