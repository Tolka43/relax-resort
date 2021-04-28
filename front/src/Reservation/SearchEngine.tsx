import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OfferCard from './OfferCard';
import useRoomsData from '../hooks/useRoomsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './SearchEngine.scss';

const SearchEngine = ({
  setReservationFormActive,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}: any) => {
  const [price, setPrice] = useState(350);
  const [visitorsNumber, setVisitorsNumber] = useState(2);

  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  } = useRoomsData();

  return (
    <>
      <div className='flowers-background'>
        <div className='search-engine'>
          <div className='search-form'>
            <input
              onChange={event => setCheckInDate(event.target.value)}
              type='date'
              defaultValue={checkInDate}
            />
            <input
              onChange={event => setCheckOutDate(event.target.value)}
              type='date'
              defaultValue={checkOutDate}
            />
            {/* <div>
          <label>{price}zł</label>
          <input
            type='range'
            min='50'
            max='250'
            onChange={event => setPrice(Number(event.target.value))}
          />
        </div> */}
            <div>
              <input
                defaultValue={2}
                type='number'
                min='1'
                max='4'
                onChange={event =>
                  setVisitorsNumber(Number(event.target.value))
                }
              />
              <FontAwesomeIcon
                className='user-icon fa-lg'
                icon={faUserFriends}
              />
            </div>
          </div>
          <button
            onClick={() => {
              getRooms(visitorsNumber, checkInDate, checkOutDate);
              console.log(checkInDate, checkOutDate);
            }}
          >
            szukaj
          </button>
        </div>
      </div>

      <div>
        {basicFilteredRoom.length > 0 ? (
          <div className='cards-div'>
            {basicFilteredRoom.map((room: any) => (
              <OfferCard
                key={room.id}
                room={room}
                availabilityButton={false}
                setReservationFormActive={setReservationFormActive}
              />
            ))}
          </div>
        ) : (
          searchingActive && (
            <>
              <h2>Nie ma dostępnych pokoi w wybranym terminie</h2>
              <p>
                zobacz oferty pasujące do twoich wyszukiwań dostępne w innych
                terminach
              </p>

              <div className='cards-div'>
                {roomsFilteredByCapacity.map((room: any) => (
                  <OfferCard
                    key={room.id}
                    room={room}
                    availabilityButton={true}
                    setReservationFormActive={setReservationFormActive}
                  />
                ))}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default SearchEngine;
