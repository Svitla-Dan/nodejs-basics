import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import exampleRouter from './routers/exampleRouter.js';
import { getEnvVar } from './utils/getEnvVar.js';

// Получаем порт из переменных окружения
const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  // Логирование запросов (должно быть первым)
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Разрешение CORS и Middleware для обработки JSON
  app.use(express.json());
  app.use(cors());

  // Подключение маршрутов API
  app.use('/api', exampleRouter);

  // GET маршрут для корневого пути
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  // Middleware для обработки несуществующих маршрутов (404)
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Middleware для обработки ошибок (500)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// // Сервер для фильмов
// import express from 'express';
// import cors from 'cors';
// import pino from 'pino-http';

// import { env } from './utils/env.js';

// import * as movieServices from './services/movies.js';

// export const startServer = () => {
//   const app = express();

//   app.use(cors());
//   const logger = pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   });
//   // app.use(logger);

//   app.get('/movies', async (req, res) => {
//     const data = await movieServices.getMovies();

//     res.json({
//       status: 200,
//       message: 'Successfully find movies',
//       data,
//     });
//   });

//   app.get('/movies/:id', async (req, res) => {
//     const { id } = req.params;
//     const data = await movieServices.getMovieById(id);

//     if (!data) {
//       return res.status(404).json({
//         status: 404,
//         message: `Movie with id=${id} not found`,
//       });
//     }

//     res.json({
//       status: 200,
//       message: `Movie successfully find`,
//       data,
//     });
//   });

//   app.use((req, res) => {
//     res.status(404).json({
//       message: `${req.url} not found`,
//     });
//   });

//   app.use((error, req, res, next) => {
//     res.status(500).json({
//       message: error.message,
//     });
//   });

//   const port = Number(env('PORT', 3000));

//   app.listen(port, () => console.log(`Server running on ${port} PORT`));
// };
