import express, { Router } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { sendMail } from './mailer.js';

const app = express();
const port = 4000;
const router = Router();

const options = { encoding: 'utf8' };
const opt = {
  extensions: ['htm', 'html'],
  index: 'index.html',
};

const roomsJson = fs.readFileSync(
  path.resolve(__dirname, './rooms.json'),
  options
);

const roomsData = JSON.parse(roomsJson);

const updateData = () => {
  const stringifiedData = JSON.stringify(roomsData);
  fs.writeFile('./rooms.json', stringifiedData, () => console.log('zapisano'));
};

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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

router.get('/*.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'images', req.url));
});

router.post('/mail', (req, res) => {
  console.log(req.body);
  const mail = req.body.email;
  const name = req.body.name;
  sendMail(mail, name)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname, opt));
app.use('*', express.static(__dirname, opt));
app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
