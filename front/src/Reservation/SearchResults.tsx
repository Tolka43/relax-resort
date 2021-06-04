import useRoomsData from '../hooks/useRoomsData';
import OfferCard from './RoomCard';

const SearchResults = ({ setReservationFormActive }: any) => {
  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  }: any = useRoomsData();
  return (
    <div>
      {basicFilteredRoom.length > 0
        ? basicFilteredRoom.map((room: any) => (
            <OfferCard
              key={room.id}
              room={room}
              availabilityButton={false}
              setReservationFormActive={setReservationFormActive}
            />
          ))
        : searchingActive && (
            <>
              <h3>Nie ma dostępnych pokoi w wybranym terminie</h3>
              <p>
                zobacz oferty pasujące do twoich wyszukiwań dostępne w innych
                terminach
              </p>
              {roomsFilteredByCapacity.map((room: any) => (
                <OfferCard
                  key={room.id}
                  room={room}
                  availabilityButton={true}
                  setReservationFormActive={setReservationFormActive}
                />
              ))}
            </>
          )}
    </div>
  );
};

export default SearchResults;
