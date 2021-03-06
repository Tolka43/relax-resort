import express, { Router } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const appPath =
  process.env.APP_PATH ||
  path.join(fileURLToPath(import.meta.url), '../../../');


const app = express();

const port = process.env.PORT || 4000;
const router = Router();
const reservationsRouter = Router();

const options = { encoding: 'utf8' };

const roomsJson = fs.readFileSync(
  path.resolve(appPath, './build/rooms.json'),
  options
);

const roomsData = JSON.parse(roomsJson);

const updateData = () => {
  const stringifiedData = JSON.stringify(roomsData);
  fs.writeFile(
    path.resolve(appPath, './build/rooms.json'),
    stringifiedData,
    () => console.log('zapisano')
  );
};

reservationsRouter.get('/', (req, res) => {
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

reservationsRouter.post('/', (req, res) => {
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
  res.sendFile(path.join(appPath, './build/images', req.url));
});

const pathToBuild = path.resolve(appPath, './build');
const opt = { extensions: ['html'] };

app
  .use(cors())
  .use(express.json())
  .use('/', express.static(pathToBuild, opt))
  .use('/api', router)
  .use('/api/reservations', reservationsRouter)
  .use('*', express.static(pathToBuild, opt));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
