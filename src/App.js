import './App.css';
import Create  from'./components/Create'
import Read from './components/Read'
import Delete from './components/Delete'
import Update from './components/Update'
import Home from './components/Home'
import {BrowserRouter as Router,Route} from 'react-router-dom'


function App() {

  
  return (
    <div>
    <Router>
    <div className="main">
   <h2 className="main-header">Crud operations</h2>
    <Route exact path ='/' component={Home}/>
   <Route exact path ='/create' component={Create}/>
    <Route exact path ='/delete' component={Delete}/>
    <Route exact path ='/Read' component={Read}/>
    <Route exact path ='/update' component={Update}/>
  
    </div>
    </Router>

    </div>
  );
}

export default App;
