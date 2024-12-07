import express from 'express';

const router = express.Router();

// GET маршрут для /about
router.get('/about', (req, res) => {
  res.json({
    message: 'About this server',
  });
});

// POST маршрут для /data
router.post('/data', (req, res) => {
  const { name, age } = req.body;
  res.json({
    message: 'Данные получены!',
    data: {
      name,
      age,
    },
  });
});

// Маршрут для тестовой ошибки
router.get('/error', (req, res, next) => {
  const error = new Error('This is a test error!');
  next(error);
});

export default router;
