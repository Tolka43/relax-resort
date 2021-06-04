import './App.scss';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import { useEffect, useState } from 'react';
import Reservation from './Reservation/Reservation';

function App() {
  const [installEvent, setInstallEvent] = useState<any>();
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', event =>
      setInstallEvent(event)
    );
    window.addEventListener('scroll', () => {
      setIsHeaderTransparent(!(window.scrollY > 80));
    });
  }, []);

  return (
    <Router>
      <div className='App'>
        <Navbar isHeaderTransparent={isHeaderTransparent} />
        <Switch>
          <Route path='/reservation'>
            <Reservation />
          </Route>
          <Route path='/about'>
            <h3>O NAS</h3>
          </Route>
          <Route path='/'>
            <Home />
            {/* <button onClick={() => installEvent.prompt()}>download</button> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
