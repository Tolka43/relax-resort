import { createContext, useState } from 'react';
import useRoomsData from '../hooks/useRoomsData';
import ReservationForm from './ReservationForm';
import ReservationSystem from './ReservationSystem';
import moment from 'moment';
import { Room } from '../hooks/useRoomsData';

interface choosedRoom {
  choosedRoomId: number;
  setChoosedRoomId: (value: number) => void;
}

const defaultChoosedRoom: choosedRoom = {
  choosedRoomId: 0,
  setChoosedRoomId: () => {},
};

interface RoomsData {
  getRooms: any;
  basicFilteredRoom: Room[] | any;
  roomsFilteredByCapacity: Room[] | any;
  searchingActive: boolean;
}

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

export const ChoosedRoomContext =
  createContext<choosedRoom>(defaultChoosedRoom);
export const RoomsDataContext = createContext<RoomsData>(undefined as any);
export const ReservationDataContext = createContext<ReservationData>(
  defaultReservationData
);

const Reservation = () => {
  function specificDayDate(specificDay) {
    const now = moment();
    const specificDayDate = now.day(specificDay);
    const specificDayDateAsString = specificDayDate.format('YYYY-MM-DD');
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
            <ReservationSystem
              setReservationFormActive={setReservationFormActive}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              visitorsNumber={visitorsNumber}
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
      </ReservationDataContext.Provider>
    </div>
  );
};

export default Reservation;
