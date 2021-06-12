import './App.scss';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import { createContext, useEffect, useState } from 'react';
import Reservation from './Reservation/Reservation';
import moment from 'moment';

interface ReservationData {
  checkInDate: string;
  checkOutDate: string;
  setCheckInDate: (value: string) => void;
  setCheckOutDate: (value: string) => void;
  visitorsNumber: number;
  setVisitorsNumber: (value: number) => void;
}

const defaultReservationData: ReservationData = {
  checkInDate: '',
  checkOutDate: '',
  setCheckInDate: () => {},
  setCheckOutDate: () => {},
  visitorsNumber: 1,
  setVisitorsNumber: () => {},
};

export const ReservationDataContext = createContext<ReservationData>(
  defaultReservationData
);

function App() {
  function specificDayDate(specificDay) {
    const now = moment();
    const specificDayDate = now.day(specificDay);
    const specificDayDateAsString = specificDayDate.format('YYYY-MM-DD');
    return specificDayDateAsString;
  }
  const [installEvent, setInstallEvent] = useState<any>();
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  const [checkInDate, setCheckInDate] = useState(specificDayDate(5));
  const [checkOutDate, setCheckOutDate] = useState(specificDayDate(7));
  const [visitorsNumber, setVisitorsNumber] = useState(1);

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
      <ReservationDataContext.Provider
        value={{
          checkInDate,
          checkOutDate,
          setCheckInDate,
          setCheckOutDate,
          visitorsNumber,
          setVisitorsNumber,
        }}
      >
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
      </ReservationDataContext.Provider>
    </Router>
  );
}

export default App;
