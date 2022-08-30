const express = require('express');
const routes = require('./database/routes');

// ...

const app = express();

app.use(express.json());
app.use('/user', routes.userRouter);
app.use('/login', routes.loginRouter);
app.use('/categories', routes.categoryRouter);
app.use('/post', routes.postRouter);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
