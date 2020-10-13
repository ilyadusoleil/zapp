import express from 'express';
import router from './routes';

import json from 'body-parser';

const app = express();

const PORT = 3000;

app.use(json()); //TODO use a body-parser that isn't depricated...
app.use('/', router);

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server Listening 👂 on at http://localhost:${PORT}`);
});
