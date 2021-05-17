import { useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OfferCard from './OfferCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { RoomsDataContext } from './Reservation';
import './SearchEngine.scss';

const SearchEngine = ({
  visitorsNumber,
  setVisitorsNumber,
  setReservationFormActive,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}: any) => {
  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  } = useContext(RoomsDataContext);

  return (
    <>
      <div className='flowers-background'>
        <div className='search-engine'>
          <div className='search-form'>
            <input
              onChange={event => setCheckInDate(event.target.value)}
              type='date'
              min={new Date().toISOString().substr(0, 10)}
              defaultValue={checkInDate}
            />
            <input
              onChange={event => setCheckOutDate(event.target.value)}
              type='date'
              min={new Date().toISOString().substr(0, 10)}
              defaultValue={checkOutDate}
            />
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
              <FontAwesomeIcon className='icon fa-lg' icon={faUserFriends} />
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
          <div className='center'>
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
          </div>
        ) : (
          searchingActive && (
            <div>
              <h2>Nie ma dostępnych pokoi w wybranym terminie</h2>
              <p>Aby zarezerwować pokój w innym terminie: </p>
              <ol>
                <li>sprawdź dostępność odpowiadającego ci pokoju </li>
                <li>wybierz w wyszukiwarce nowy, dostępny termin</li>
              </ol>
              <div className='center'>
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
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default SearchEngine;
