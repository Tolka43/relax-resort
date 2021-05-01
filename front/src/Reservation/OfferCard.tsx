import { useContext } from 'react';
import { ChoosedRoomContext } from './Reservation';
import './OfferCard.scss';

const OfferCard = ({
  room,
  availabilityButton,
  setReservationFormActive,
}: any) => {
  const { setChoosedRoomId } = useContext(ChoosedRoomContext);
  return (
    <div className='card'>
      <img src='' />
      <div className='card-body'>
        <h5 className='card-title'>{room.title}</h5>
        <div className='card-text'>
          cena: {room.price}
          liczba osób: {room.capacity}
        </div>
        {availabilityButton && <button>sprawdź dostępność</button>}
        {!availabilityButton && (
          <button
            onClick={() => {
              setReservationFormActive(true);
              setChoosedRoomId(room.id);
            }}
          >
            zarezerwuj
          </button>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
