const aysncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = aysncHandler( async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

//@desc Get contact by ID
//@route GET /api/contacts/:id
//@access Private
const getContactById = aysncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
});

//@desc Create a new contact
//@route POST /api/contacts/
//@access Private
const createContact = aysncHandler(async (req, res) => {
    if(!req.body.name || !req.body.email) {
        res.status(400);
        throw new Error('Name and email are required');
    }
    const contact = await Contact.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        user_id: req.user.id,
    });

    if(!contact) {
        res.status(400);
        throw new Error('Invalid contact data');
    }
  res.status(200).json(contact);
});

//@desc Update contact by ID
//@route PUT /api/contacts/:id
//@access Private
const updateContactById = aysncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to update this contact');
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contact by ID
//@route DELETE /api/contacts/:id
//@access Private
const deleteContactById = aysncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to delete this contact');
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Delete contact by ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
};