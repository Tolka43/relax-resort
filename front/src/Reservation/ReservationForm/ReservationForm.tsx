import { useContext, useState } from 'react';
import { apiUrl } from '../../config';
import { ChoosedRoomContext} from '../Reservation';
import { ReservationDataContext, RoomsDataContext } from '../../App';
import './ReservationForm.scss';

interface ReservationFormProps {
  setReservationFormActive: (value: boolean) => void;
}

const ReservationForm = ({
  setReservationFormActive
}: ReservationFormProps) => {
  const [name, setName] = useState('Dziękujemy');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const { choosedRoomId } = useContext(ChoosedRoomContext);
  const {
    roomsFilteredByCapacity
  } = useContext(RoomsDataContext);

  const {checkInDate, checkOutDate, visitorsNumber} = useContext(ReservationDataContext)

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
          <h2
            className='numbers close-button'
            onClick={() => setReservationFormActive(false)}
          >
            x
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
