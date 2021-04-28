import './OfferCard.scss'

const OfferCard = ({ room, availabilityButton, setReservationFormActive }: any) => (
  <div className='card'>
    <img src='' />
    <div className='card-body'>
      <h5 className='card-title'>{room.title}</h5>
      <div className='card-text'>
        cena: {room.price}
        liczba osób: {room.capacity}
      </div>
      {availabilityButton && <button>sprawdź dostępność</button>}
      <button onClick={() => setReservationFormActive(true)}>zarezerwuj</button>
    </div>
  </div>
);

export default OfferCard;
