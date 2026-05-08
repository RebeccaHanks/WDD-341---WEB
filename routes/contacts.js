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

module.exports = router;
