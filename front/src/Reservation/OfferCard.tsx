const OfferCard = ({ room }: any) => (
  <div className='card'>
    <img src="" />
    <div className='card-body'>
      <h5 className="card-title">{room.title}</h5>
      <div className='card-text'>
        cena: {room.price}
        liczba osób: {room.capacity}
      </div>
    </div>
  </div>
);

export default OfferCard;
