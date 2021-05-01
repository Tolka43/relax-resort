import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.static('../front/build'));

const options = { encoding: 'utf8' };

const roomsJson = fs.readFileSync(path.resolve('./rooms.json'), options);

const roomsData = JSON.parse(roomsJson);

const updateData = () => {
  const stringifiedData = JSON.stringify(roomsData);
  fs.writeFile('./rooms.json', stringifiedData, () => console.log('zapisano'));
};

app.use(express.json());

app.get('/api', (req, res) => {
  const startDate = req.query.checkInDate;
  const endDate = req.query.checkOutDate;
  const visitorsNumber = req.query.visitorsNumber;
  const roomsFilteredByCapacity = roomsData.rooms.filter(
    room => room.capacity == visitorsNumber
  );

  const roomsFilteredByDate = roomsFilteredByCapacity.filter(room =>
    room.reservations.every(
      reservation =>
        new Date(reservation.checkInDate) >= new Date(endDate) ||
        new Date(reservation.checkOutDate) <= new Date(startDate)
    )
  );

  const filteredRooms =
    startDate && endDate ? roomsFilteredByDate : roomsFilteredByCapacity;

  res.status(200).send({ filteredRooms, roomsFilteredByCapacity });
});

app.post('/api', (req, res) => {
  const startDate = req.body.checkInDate;
  const endDate = req.body.checkOutDate;
  const roomId = req.body.choosedRoomId;
  const email = req.body.email;

  const choosedRoom = roomsData.rooms.find(room => room.id === roomId);
  choosedRoom.reservations.push({
    checkInDate: startDate,
    checkOutDate: endDate,
    email,
  });
  updateData();
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
