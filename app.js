const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const userRoutes = require('./routes/user.routes.js');
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
