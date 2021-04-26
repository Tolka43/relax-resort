import './App.css';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Reservation from './Reservation/Reservation';
import { useEffect, useState } from 'react';

function App() {
  const [installEvent, setInstallEvent] = useState<any>();
  
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', event =>
      setInstallEvent(event)
    );
  }, []);

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/reservation'>
            <Reservation />
          </Route>
          <Route path='/about'>
            <h3>O NAS</h3>
          </Route>
          <Route path='/'>
            <Home />
            <button onClick={() => installEvent.prompt()}>download</button>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
