import { createContext, useState } from 'react';
import ReservationForm from './ReservationForm/ReservationForm';
import ReservationSystem from './ReservationSystem';

interface choosedRoom {
  choosedRoomId: number;
  setChoosedRoomId: (value: number) => void;
}

const defaultChoosedRoom: choosedRoom = {
  choosedRoomId: 0,
  setChoosedRoomId: () => {},
};




export const ChoosedRoomContext =
  createContext<choosedRoom>(defaultChoosedRoom);

const Reservation = () => {
  
  const [reservationFormActive, setReservationFormActive] = useState(false);
  const [choosedRoomId, setChoosedRoomId] = useState<number | any>();

  return (
    <div>
      
        
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
    </div>
  );
};

export default Reservation;
