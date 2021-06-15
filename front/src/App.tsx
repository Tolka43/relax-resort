import './App.scss';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import { createContext, useEffect, useState } from 'react';
import moment from 'moment';
import useRoomsData, { Room } from './hooks/useRoomsData';
import Reservation from './Reservation/Reservation';

interface ReservationData {
  checkInDate: string;
  checkOutDate: string;
  setCheckInDate: (value: string) => void;
  setCheckOutDate: (value: string) => void;
  visitorsNumber: number;
  setVisitorsNumber: (value: number) => void;
}
interface RoomsData {
  getRooms: any;
  basicFilteredRoom: Room[] | any;
  roomsFilteredByCapacity: Room[] | any;
  searchingActive: boolean;
}

interface ShowDatepicker {
  show: boolean;
  setShow: (value: boolean) => void;
}

export const ReservationDataContext = createContext<ReservationData>(
  undefined as any
);
export const RoomsDataContext = createContext<RoomsData>(undefined as any);
export const ShowDatepickerContext = createContext<ShowDatepicker>(undefined as any);

function App() {
  function specificDayDate(specificDay) {
    const now = moment();
    const specificDayDate = now.day(specificDay);
    const specificDayDateAsString = specificDayDate.format('YYYY-MM-DD');
    return specificDayDateAsString;
  }
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  const [checkInDate, setCheckInDate] = useState(specificDayDate(5));
  const [checkOutDate, setCheckOutDate] = useState(specificDayDate(7));
  const [visitorsNumber, setVisitorsNumber] = useState(1);
  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  } = useRoomsData();

  const [show, setShow] = useState(false);

  useEffect(() => {
    getRooms(visitorsNumber, checkInDate, checkOutDate);
    setShow(false);
  }, [checkOutDate, visitorsNumber]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsHeaderTransparent(!(window.scrollY > 80));
    });
  }, []);

  return (
    <Router>
      <ShowDatepickerContext.Provider value={{show, setShow}}>
      <RoomsDataContext.Provider
        value={{
          getRooms,
          basicFilteredRoom,
          roomsFilteredByCapacity,
          searchingActive,
        }}
      >
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
              {/* <Route path='/about'>
                <h3>O NAS</h3>
              </Route> */}
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
        </ReservationDataContext.Provider>
      </RoomsDataContext.Provider>
      </ShowDatepickerContext.Provider>
    </Router>
  );
}

export default App;
