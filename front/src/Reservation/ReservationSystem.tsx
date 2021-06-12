import { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import RoomCard from './RoomCard/RoomCard';
import { RoomsDataContext } from './Reservation';
import './SearchEngine/SearchEngine.scss';
import SearchEngine from './SearchEngine/SearchEngine'

const ReservationSystem = ({
  visitorsNumber,
  setReservationFormActive,
  checkInDate,
  checkOutDate,
}: any) => {
  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  } = useContext(RoomsDataContext);

  const [show, setShow] = useState(false);
  

  useEffect(() => {
    getRooms(visitorsNumber, checkInDate, checkOutDate);
    setShow(false);
  }, [checkOutDate, visitorsNumber]);

  return (
    <>
      <div className='flowers-background'>
        

        <SearchEngine setShow={setShow} show={show}/>

        <div>
          {basicFilteredRoom.length > 0 ? (
            <div className='center'>
              <div className='cards-div'>
                {basicFilteredRoom.map((room: any) => (
                  <RoomCard
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
                      <RoomCard
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
      </div>
    </>
  );
};

export default ReservationSystem;
