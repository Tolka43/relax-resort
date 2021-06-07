import { useContext, useState } from 'react';
import { apiUrl } from '../config';
import { ChoosedRoomContext, RoomsDataContext } from './Reservation';
import './ReservationForm.scss';

interface ReservationFormProps {
  visitorsNumber: number;
  checkInDate: string;
  setCheckInDate: (value: string) => void;
  checkOutDate: string;
  setCheckOutDate: (value: string) => void;
  setReservationFormActive: (value: boolean) => void;
}

const ReservationForm = ({
  visitorsNumber,
  checkInDate,
  checkOutDate,
  setReservationFormActive,
}: ReservationFormProps) => {
  const [name, setName] = useState('Dziękujemy');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const { choosedRoomId } = useContext(ChoosedRoomContext);
  const {
    getRooms,
    basicFilteredRoom,
    roomsFilteredByCapacity,
    searchingActive,
  } = useContext(RoomsDataContext);

  const differenceInTime =
    new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
  const numberOfNights = differenceInTime / (1000 * 3600 * 24);
  const wholePrice =
    roomsFilteredByCapacity.find(room => room.id === choosedRoomId).price *
    numberOfNights;

  return (
    <div className='modal'>
      <div className='modal-body'>
        <div className='modal-content'>
          <h2 className='m-10'>REZERWACJA</h2>
          <div className='m-10'>
            <p>
              dzień przyjazdu: <span className='numbers'>{checkInDate}</span>
            </p>
          </div>
          <div className='m-10'>
            <p>
              dzień wyjazdu: <span className='numbers'>{checkOutDate}</span>
            </p>
          </div>
          <div className='m-10'>
            <p>
              liczba osób: <span className='numbers'>{visitorsNumber}</span>
            </p>
          </div>

          <p className='m-10'>
            koszt: <span className='numbers'>{wholePrice}zł</span>
          </p>
          <div className='m-10'>
            <label htmlFor='name'>imię</label>
            <input
              id='name'
              type='text'
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className='m-10'>
            <label htmlFor='email'>email</label>
            <input
              id='email'
              type='email'
              onChange={event => {
                setEmail(event.target.value);
              }}
            />
            {!validEmail && (
              <p className='invalid-email'>wpisz poprawny email</p>
            )}
          </div>
          <div className='checkbox-div'>
            <input type='checkbox' id='check' />{' '}
            <label className='check-label' htmlFor='check'>
              Wyrażam zgodę na otrzymanie e-maila
            </label>
          </div>
          <button
            className='m-10'
            onClick={() => {
              if (
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                  email
                )
              ) {
                setReservationFormActive(false);
                fetch(`${apiUrl}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    checkInDate,
                    checkOutDate,
                    choosedRoomId,
                    email,
                  }),
                }).then(() =>
                  alert(
                    `${name}, zarezerwowałeś/aś pokój w dniach od ${checkInDate} do ${checkOutDate}`
                  )
                );
              } else {
                setValidEmail(false);
              }
            }}
          >
            zarezerwuj
          </button>
          <button
            onClick={() =>
              fetch(`${apiUrl}/mail`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({ email, name }),
              })
            }
          ></button>
          <h2
            className='numbers close-button'
            onClick={() => setReservationFormActive(false)}
          >
            x
          </h2>
          {/* <FontAwesomeIcon icon={faTimes} className='close-button'
          onClick={() => setReservationFormActive(false)}/> */}
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
