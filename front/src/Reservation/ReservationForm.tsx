import { useState } from 'react';
import './ReservationForm.scss';

interface ReservationFormProps {
  checkInDate: string;
  setCheckInDate: (value: string) => void;
  checkOutDate: string;
  setCheckOutDate: (value: string) => void
}

const ReservationForm = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}: ReservationFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>REZERWACJA</h2>
        <div>
          <label htmlFor=''>dzień przyjazdu</label>
          <input
            onChange={event => setCheckInDate(event.target.value)}
            type='date'
            defaultValue={checkInDate}
          />
        </div>
        <div>
          <label htmlFor=''>dzień wyjazdu</label>
          <input
            onChange={event => setCheckOutDate(event.target.value)}
            type='date'
            defaultValue={checkOutDate}
          />
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
        <p>koszt: -</p>
        <button onClick={() => {}}>zarezerwuj</button>
      </div>
    </div>
  );
};

export default ReservationForm;
