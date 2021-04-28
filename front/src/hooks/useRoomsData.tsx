import { useState } from 'react';

const useRoomsData = () => {
  const [basicFilteredRoom, setBasicFilteredRooms] = useState([]);
  const [roomsFilteredByCapacity, setRoomsFilteredByCapacity] = useState([]);
  const [searchingActive, setSearchingActive] = useState(false);

  const getRooms = (
    visitorsNumber: number,
    checkInDate: any,
    checkOutDate: any
  ) => {
    fetch(
      `http://localhost:4000/api?visitorsNumber=${visitorsNumber}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    )
      .then(res => res.json())
      .then(res => {
        setBasicFilteredRooms(res.filteredRooms);
        setRoomsFilteredByCapacity(res.roomsFilteredByCapacity);
      })
      .then(() => setSearchingActive(true));
  };

  return {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  };
};

export default useRoomsData;
