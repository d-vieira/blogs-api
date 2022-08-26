require('dotenv').config();
const app = require('./api');
const routes = require('./database/routes');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use('/login', routes.loginRouter);

app.listen(port, () => console.log('ouvindo porta', port));
