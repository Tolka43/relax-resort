import { useContext } from 'react';
import { ChoosedRoomContext } from './Reservation';
import './OfferCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const OfferCard = ({
  room,
  availabilityButton,
  setReservationFormActive,
}: any) => {
  const { setChoosedRoomId } = useContext(ChoosedRoomContext);
  const [startDate, setStartDate] = useState<any>()
  return (
    <div className='card'>
      <img src={`http://localhost:4000${room.image}`} alt=""/>
      <div className='card-body'>
        <h5 className='card-title'>{room.title}</h5>
        <div className='card-text'>
          <p><FontAwesomeIcon icon={faBed} className='icon fa-sm'/> {room.beds}</p>
          <p><FontAwesomeIcon icon={faCheck} className='icon fa-sm'/> {room.equipment}</p>
         <p>cena/noc: {room.price}zł</p> 
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
        
        {/* <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)} /> */}
      </div>
    </div>
  );
};

export default OfferCard;
