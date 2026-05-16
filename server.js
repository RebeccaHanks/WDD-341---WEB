// express web server
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

const { connectToDatabase } = require('./data/database');

// import routes
const contactsRoutes = require('./routes/contacts');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Konnor Kraft');
});

app.use('/contacts', contactsRoutes);

const PORT = process.env.PORT || 3000;

// starting my server after the database is connected
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Web Server is listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
