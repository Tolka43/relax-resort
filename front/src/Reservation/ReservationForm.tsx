import { useContext, useState } from 'react';
import { ChoosedRoomContext, RoomsDataContext } from './Reservation';
import './ReservationForm.scss';

interface ReservationFormProps {
  visitorsNumber: number;
  checkInDate: string;
  setCheckInDate: (value: string) => void;
  checkOutDate: string;
  setCheckOutDate: (value: string) => void;
  setReservationFormActive: (value: boolean) => void;
}

const ReservationForm = ({
  visitorsNumber,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  setReservationFormActive,
}: ReservationFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { choosedRoomId } = useContext(ChoosedRoomContext);
  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  } = useContext(RoomsDataContext);

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>REZERWACJA</h2>
        <div>
          <p>dzień przyjazdu: {checkInDate}</p>
          {/* <input
            onChange={event => setCheckInDate(event.target.value)}
            type='date'
            defaultValue={checkInDate}
          /> */}
        </div>
        <div>
          <p>dzień wyjazdu: {checkOutDate}</p>
          {/* <input
            onChange={event => setCheckOutDate(event.target.value)}
            type='date'
            defaultValue={checkOutDate}
          /> */}
        </div>
        <div>
          <label htmlFor=''>liczba osób: {visitorsNumber}</label>
        </div>
        <div>
          <label htmlFor='name'>imię</label>
          <input
            id='name'
            type='text'
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>email</label>
          <input
            id='email'
            type='email'
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <p>
          koszt:{' '}
          {roomsFilteredByCapacity.find(room => room.id === choosedRoomId)
            .price * visitorsNumber}
        </p>
        <button
          onClick={() =>
            fetch('http://localhost:4000/api', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                checkInDate,
                checkOutDate,
                choosedRoomId,
                email
              }),
            })
          }
        >
          zarezerwuj
        </button>
        <button onClick={() => setReservationFormActive(false)}>X</button>
      </div>
    </div>
  );
};

export default ReservationForm;
