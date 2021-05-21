import { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import OfferCard from './RoomCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { RoomsDataContext } from './Reservation';
import './SearchEngine.scss';
import moment from 'moment';
import DatePicker from 'react-datepicker';

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
  // const [dateRange, setDateRange] = useState<any>([
  //   new Date('2021-05-21'),
  //   new Date('2021-05-24'),
  // ]);
  // const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState<any>();
  const [show, setShow] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const onChange = dates => {
    const [start, end] = dates;
    const lastDate =
      end === null ? checkOutDate : moment(end).format('YYYY-MM-DD');
    setStartDate(start);
    setEndDate(end);
    setCheckInDate(moment(start).format('YYYY-MM-DD'));
    setCheckOutDate(lastDate);
  };

  useEffect(() => {
    getRooms(visitorsNumber, checkInDate, checkOutDate);
    setShow(false);
  }, [checkOutDate, visitorsNumber]);

  return (
    <>
      <div className='flowers-background'>
        <div className='search-engine'>
          <div className='search-form'>
            <div className='date-group'>
              <label htmlFor=''>dzień przyjazdu</label> <br />
              <input
                type='text'
                value={checkInDate}
                onClick={() => setShow(true)}
              />
            </div>
            <div className='date-group'>
              <label htmlFor=''>dzień wyjazdu</label> <br />
              <input
                type='text'
                value={checkOutDate}
                onClick={() => setShow(true)}
              />
            </div>
            {show && (
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                excludeDates={disabledDates}
                minDate={new Date()}
                selectsRange
                inline><div className='small-info'>wybierz przedział dat</div>
              </DatePicker>
                
              
            )}

            <div className='date-group'>
              <label htmlFor="">liczba osób</label> <br />
              <input
                className='number-input'
                defaultValue={visitorsNumber && visitorsNumber}
                type='number'
                min='1'
                max='4'
                onChange={event => {
                  setVisitorsNumber(Number(event.target.value));
                }}
              />
              {/* <FontAwesomeIcon className='icon fa-lg' icon={faUserFriends} /> */}
            </div>
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
                <p>
                  Sprawdź oferty pasujące do twoich wyszukiwań dostępne w innych
                  terminach
                </p>
                <div className='center'>
                  <div className='cards-div'>
                    {roomsFilteredByCapacity.map((room: any) => (
                      <OfferCard
                        key={room.id}
                        room={room}
                        availabilityButton={true}
                        setReservationFormActive={setReservationFormActive}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        setCheckInDate={setCheckInDate}
                        setCheckOutDate={setCheckOutDate}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SearchEngine;
