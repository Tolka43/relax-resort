import { useContext, useState } from 'react';
import { ReservationDataContext, ShowDatepickerContext } from '../../App';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const SearchEngine = () => {
  const {show, setShow} = useContext(ShowDatepickerContext)
  const {
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    visitorsNumber,
    setVisitorsNumber,
  } = useContext(ReservationDataContext);
  const [startDate, setStartDate] = useState<any>();

  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    const lastDate =
      end === null ? checkOutDate : moment(end).format('YYYY-MM-DD');
    setStartDate(start);
    setEndDate(end);
    setCheckInDate(moment(start).format('YYYY-MM-DD'));
    setCheckOutDate(lastDate);
  };
  return (
    <div className='search-engine'>
      <div className='search-form'>
        <div className='date-group'>
          <label htmlFor=''>dzień przyjazdu</label> <br />
          <input
          readOnly
            type='text'
            value={checkInDate}
            onClick={() => setShow(true)}
          />
        </div>
        <div className='date-group'>
          <label htmlFor=''>dzień wyjazdu</label> <br />
          <input
          readOnly
            type='text'
            value={checkOutDate}
            onClick={() => setShow(true)}
          />
        </div>
        {show && (
          <div className='datepicker-modal'>
            <div className='datepicker-modal-body'>
          <DatePicker
          className='modal-content'
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            selectsRange
            inline
          >
            <div className='small-info'>wybierz przedział dat</div>
          </DatePicker>
          </div>
          </div>
        )}

        <div className='date-group'>
          <label htmlFor=''>liczba osób</label> <br />
          <input
            className='number-input'
            defaultValue={visitorsNumber && visitorsNumber}
            type='number'
            min='1'
            max='4'
            onChange={event => {
              setVisitorsNumber(Number(event.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchEngine;
