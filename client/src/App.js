import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Import from './pages/Import'
function App() {

  return (
    <Router>

      <Routes>
   
        <Route path='/' element={<Import/>}     />
      



      </Routes>
    </Router>
 
  );
}

export default App;