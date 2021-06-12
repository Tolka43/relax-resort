import { useContext } from 'react';
import { ChoosedRoomContext } from '../Reservation';
import './RoomCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ReservationDataContext} from '../../App'
import { apiUrl } from '../../config';

const RoomCard = ({
  room,
  availabilityButton,
  setReservationFormActive
}: any) => {
  const {checkOutDate,
    setCheckInDate,
    setCheckOutDate} = useContext(ReservationDataContext)
  const { setChoosedRoomId } = useContext(ChoosedRoomContext);
  const [startDate, setStartDate] = useState<any>();
  const [show, setShow] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  const onChange = dates => {
    const [start, end] = dates;
    const lastDate = end === null ? checkOutDate : moment(end).format('YYYY-MM-DD')
    setStartDate(start);
    setEndDate(end);
    setCheckInDate(moment(start).format('YYYY-MM-DD'))
    setCheckOutDate(lastDate)
  };

  const findDisabledDates = () => {
    let dates: Date[] = [];
    room.reservations.forEach(reservation => {
      let firstDate = moment(reservation.checkInDate);
      let lastDate = moment(reservation.checkOutDate);
      while (firstDate.format('YYYY-MM-DD') !== lastDate.format('YYYY-MM-DD')) {
        dates.push(firstDate.toDate());
        firstDate = firstDate.add(1, 'days');
      }
      dates.push(lastDate.toDate())
    });

    setDisabledDates(dates);
  };

  return (
    <div className='card'>
      <img src={`${apiUrl}${room.image}`} alt='' />
      <div className='card-body'>
        <h5 className='card-title'>{room.title}</h5>
        <div className='card-text'>
          <p>
            <FontAwesomeIcon icon={faBed} className='icon fa-sm' /> {room.beds}
          </p>
          <p>
            <FontAwesomeIcon icon={faCheck} className='icon fa-sm' />{' '}
            {room.equipment}
          </p>
          <p>cena/noc: {room.price}zł</p>
        </div>
        {availabilityButton && (
          <div >
            <button
              onClick={() => {
                setShow(!show);
                findDisabledDates();
              }}
            >
              sprawdź dostępność
            </button>{' '}
            {show && (
              <DatePicker
                selected={startDate}
                className='availability-picker'
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                excludeDates={disabledDates}
                minDate={new Date()}
                selectsRange
                inline
              ><div className='small-info'>wybierz przedział dat</div></DatePicker>
            )}
          </div>
        )}
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

export default RoomCard;
