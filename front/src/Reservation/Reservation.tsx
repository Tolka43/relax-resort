import { createContext, useState } from 'react';
import useRoomsData from '../hooks/useRoomsData';
import ReservationForm from './ReservationForm';
import SearchEngine from './SearchEngine';
import moment from 'moment'
import { Room } from '../hooks/useRoomsData';

interface choosedRoom {
  choosedRoomId: number;
  setChoosedRoomId: (value: number) => void;
}

const defaultValue: choosedRoom = {
  choosedRoomId: 0,
  setChoosedRoomId: () => {},
};

interface RoomsData {
  getRooms: any;
  basicFilteredRoom: Room[] | any;
  roomsFilteredByCapacity: Room[] | any;
  searchingActive: boolean;
}

export const ChoosedRoomContext = createContext<choosedRoom>(defaultValue);
export const RoomsDataContext = createContext<RoomsData>(undefined as any);

const Reservation = () => {
  function specificDayDate(specificDay){
    const now = moment()
    const specificDayDate = now.day(specificDay)
    const specificDayDateAsString = specificDayDate.format('YYYY-MM-DD')
    return specificDayDateAsString;
  }
  const [checkInDate, setCheckInDate] = useState(specificDayDate(5));
  const [checkOutDate, setCheckOutDate] = useState(specificDayDate(7));
  const [reservationFormActive, setReservationFormActive] = useState(false);
  const [choosedRoomId, setChoosedRoomId] = useState<number | any>();

  const [visitorsNumber, setVisitorsNumber] = useState(1);
  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  } = useRoomsData();

  

  return (
    <div>
      <RoomsDataContext.Provider
        value={{
          getRooms,
          basicFilteredRoom,
          roomsFilteredByCapacity,
          searchingActive,
        }}
      >
        <ChoosedRoomContext.Provider
          value={{ choosedRoomId, setChoosedRoomId }}
        >
          <SearchEngine
            visitorsNumber={visitorsNumber}
            setVisitorsNumber={setVisitorsNumber}
            setReservationFormActive={setReservationFormActive}
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
          />
          {reservationFormActive && (
            <ReservationForm
            visitorsNumber={visitorsNumber}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              setReservationFormActive={setReservationFormActive}
            />
          )}
        </ChoosedRoomContext.Provider>
      </RoomsDataContext.Provider>
    </div>
  );
};



export default Reservation;
