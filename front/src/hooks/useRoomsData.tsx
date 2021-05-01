import { useState } from 'react';

export interface Room {
  id: number;
  title: string;
  price: number;
  capacity: number;
  reservations: [];
}

const useRoomsData = () => {
  const [basicFilteredRoom, setBasicFilteredRooms] = useState<Room[]>([]);
  const [roomsFilteredByCapacity, setRoomsFilteredByCapacity] = useState<Room[]>([]);
  const [searchingActive, setSearchingActive] = useState(false);

  const getRooms = (
    visitorsNumber: number,
    checkInDate: string,
    checkOutDate: string
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
