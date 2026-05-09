const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDatabase } = require('../data/database');

router.get('/', async (req, res) => {
  const database = getDatabase();

  const contacts = await database.collection('contacts').find().toArray();

  res.json(contacts);
});

router.get('/:id', async (req, res) => {
  const database = getDatabase();

  const contact = await database
    .collection('contacts')
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json(contact);
});


router.post('/', async(req,res) => {
  const database = getDatabase();

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

   if (
    !contact.firstName ||
    !contact.lastName ||
    !contact.email ||
    !contact.favoriteColor ||
    !contact.birthday
   ) {
    return res.status(400).json({ message: 'All feilds are required' });
   }

   const response = await database.collection('contacts').insertOne(contact);

   res.status(201).json({ id: response.insertedId });
   

});

router.put('/:id', async (req, res) => {
  const database = getDatabase();
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  if (
    !contact.firstName ||
    !contact.lastName ||
    !contact.email ||
    !contact.favoriteColor ||
    !contact.birthday
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  await database.collection('contacts').replaceOne({ _id: contactId }, contact);

  res.sendStatus(204);

});

router.delete('/:id', async (req, res) => {
  const database = getDatabase();
  const contactId = new ObjectId(req.params.id);

  await database.collection('contacts').deleteOne({ _id: contactId });

  res.sendStatus(200);

});

module.exports = router;
