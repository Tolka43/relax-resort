import { useState } from 'react';
import ReservationForm from './ReservationForm';
import SearchEngine from './SearchEngine';
import SearchResults from './SearchResults';

const Reservation = () => {
  const actualDate = new Date().toISOString().substr(0, 10);
  const [checkInDate, setCheckInDate] = useState(actualDate);
  const [checkOutDate, setCheckOutDate] = useState(actualDate);
  const [reservationFormActive, setReservationFormActive] = useState(false);
  return (
    <div>
      <SearchEngine
        setReservationFormActive={setReservationFormActive}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkInDate}
        setCheckOutDate={setCheckOutDate}
      />
      {reservationFormActive && (
        <ReservationForm
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
        />
      )}
    </div>
  );
};

export default Reservation;
