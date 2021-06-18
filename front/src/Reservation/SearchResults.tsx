import useRoomsData from '../hooks/useRoomsData';
import OfferCard from './RoomCard/RoomCard';

interface SearchResultsProps {
  setReservationFormActive: (value: boolean) => void;
}

const SearchResults = ({ setReservationFormActive }: SearchResultsProps) => {
  const {
    basicFilteredRooms,
    roomsFilteredByCapacity,
    searchingActive,
  } = useRoomsData();
  return (
    <div>
      {basicFilteredRooms.length > 0
        ? basicFilteredRooms.map((room) => (
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
              {roomsFilteredByCapacity.map((room) => (
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
