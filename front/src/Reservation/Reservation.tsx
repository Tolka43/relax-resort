import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reservation = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(50);
  const [visitorsNumber, setVisitorsNumber] = useState(1);
  return (
    <>
      <h3>REZERWACJA</h3>
      <div>
        <input onChange={(event) => console.log(event)} type='date'/>
        <DatePicker
          selected={checkInDate}
          onChange={(date: any) => {
            setCheckInDate(date);
            console.log(date);
          }}
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date: any) => {
            console.log(date);
            setCheckOutDate(date);
          }}
        />
      </div>
      <div>
        <label>{price}zł</label>
        <input
          type='range'
          min='50'
          max='250'
          onChange={event => setPrice(Number(event.target.value))}
        />
      </div>
      <div>
        <label>liczba osób</label>
        <input
          type='number'
          min='1'
          max='5'
          onChange={event => setVisitorsNumber(Number(event.target.value))}
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
      <div>
        <button onClick={() => {}}>zarezerwuj</button>
      </div>
    </>
  );
};

export default Reservation;
