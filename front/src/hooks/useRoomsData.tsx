import { useState } from 'react';
import { apiUrl } from '../config';


interface Reservation {
  checkInDate: string;
  checkOutDate: string;
  email: string;
}
export interface Room {
  beds: string;
  id: number;
  title: string;
  price: number;
  capacity: number;
  reservations: Array<Reservation>;
  image: string;
  equipment: string;
}

export interface RoomsData {
  getRooms: (
    visitorsNumber: number,
    checkInDate: string,
    checkOutDate: string
  ) => void;
  basicFilteredRooms: Room[] | any;
  roomsFilteredByCapacity: Room[] | any;
  searchingActive: boolean;
}

const useRoomsData = () => {
  const [basicFilteredRooms, setBasicFilteredRooms] = useState<Room[]>([]);
  const [roomsFilteredByCapacity, setRoomsFilteredByCapacity] = useState<
    Room[]
  >([]);
  const [searchingActive, setSearchingActive] = useState(false);

  const getRooms = (visitorsNumber, checkInDate, checkOutDate) => {
    fetch(
      `${apiUrl}/reservations?visitorsNumber=${visitorsNumber}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
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
    basicFilteredRooms,
    roomsFilteredByCapacity,
    searchingActive,
  };
};

export default useRoomsData;
