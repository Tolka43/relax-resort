import { useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import RoomCard from './RoomCard/RoomCard';
import { RoomsDataContext } from '../App';
import './SearchEngine/SearchEngine.scss';
import SearchEngine from './SearchEngine/SearchEngine';

interface ReservationSystemProps {
  setReservationFormActive: (value: boolean) => void;
}

const ReservationSystem = ({ setReservationFormActive }: ReservationSystemProps) => {
  const {
    basicFilteredRooms,
    roomsFilteredByCapacity,
    searchingActive,
  } = useContext(RoomsDataContext);

  return (
    <>
      <div className='flowers-background'>
        <SearchEngine />

        <div>
          {basicFilteredRooms.length > 0 ? (
            <div className='center'>
              <div className='cards-div'>
                {basicFilteredRooms.map((room) => (
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
                    {roomsFilteredByCapacity.map((room) => (
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
