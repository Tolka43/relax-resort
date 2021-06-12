import { createContext, useState } from 'react';
import useRoomsData from '../hooks/useRoomsData';
import ReservationForm from './ReservationForm/ReservationForm';
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



export const ChoosedRoomContext =
  createContext<choosedRoom>(defaultChoosedRoom);
export const RoomsDataContext = createContext<RoomsData>(undefined as any);

const Reservation = () => {
  
  const [reservationFormActive, setReservationFormActive] = useState(false);
  const [choosedRoomId, setChoosedRoomId] = useState<number | any>();
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
            <ReservationSystem
              setReservationFormActive={setReservationFormActive}
            />
            {reservationFormActive && (
              <ReservationForm
                setReservationFormActive={setReservationFormActive}
              />
            )}
          </ChoosedRoomContext.Provider>
        </RoomsDataContext.Provider>
    </div>
  );
};

export default Reservation;
