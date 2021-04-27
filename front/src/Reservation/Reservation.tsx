import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OfferCard from './OfferCard';

const Reservation = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(350);
  const [visitorsNumber, setVisitorsNumber] = useState(2);
  const [basicFilteredRoom, setBasicFilteredRooms] = useState([]);
  const [roomsFilteredByCapacity, setRoomsFilteredByCapacity] = useState([]);
  const [searchEngineActive, setSearchEngineActive] = useState(false);

  const getRooms = () => {
    fetch(
      `http://localhost:4000/api?visitorsNumber=${visitorsNumber}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    )
      .then(res => res.json())
      .then(res => {
        setBasicFilteredRooms(res.filteredRooms);
        setRoomsFilteredByCapacity(res.roomsFilteredByCapacity);
      });
    setSearchEngineActive(true);
  };

  return (
    <>
      <h3>REZERWACJA</h3>
      <div>
        <input
          onChange={event => setCheckInDate(event.target.value)}
          type='date'
        />
        <input
          onChange={event => setCheckOutDate(event.target.value)}
          type='date'
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
          defaultValue={2}
          type='number'
          min='1'
          max='4'
          onChange={event => setVisitorsNumber(Number(event.target.value))}
        />
      </div>
      {/* <div>
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
      </div> */}
      <div>
        <button onClick={getRooms}>szukaj</button>
        {/* <button onClick={() => {}}>zarezerwuj</button> */}
      </div>
      <div>
        {basicFilteredRoom.length > 0 ? (
          basicFilteredRoom.map((room: any) => (
            <OfferCard key={room.id} room={room} availabilityButton={false}/>
          ))
        ) : (
          searchEngineActive && <>
            <h3>Nie ma dostępnych pokoi w wybranym terminie</h3>
            <p>
              zobacz oferty pasujące do twoich wyszukiwań dostępne w innych
              terminach
            </p>
            {roomsFilteredByCapacity.map((room: any) => (
              <OfferCard key={room.id} room={room} availabilityButton={true}/>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Reservation;
