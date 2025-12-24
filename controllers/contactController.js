//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = (req, res) => {
  res.status(200).json({ message: 'Get all contacts' });
};

//@desc Get contact by ID
//@route GET /api/contacts/:id
//@access Public
const getContactById = (req, res) => {
  res.status(200).json({ message: 'Get contact by ID' });
};

//@desc Create a new contact
//@route POST /api/contacts/
//@access Public
const createContact = (req, res) => {
    if(!req.body.name || !req.body.email) {
        res.status(400);
        throw new Error('Name and email are required');
    }
    console.log(req.body);
  res.status(200).json({ message: 'Create a new contact' });
};

//@desc Update contact by ID
//@route PUT /api/contacts/:id
//@access Public
const updateContactById = (req, res) => {
  res.status(200).json({ message: 'Update contact by ID' });
};

//@desc Delete contact by ID
//@route DELETE /api/contacts/:id
//@access Public
const deleteContactById = (req, res) => {
  res.status(200).json({ message: 'Delete contact by ID' });
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
};