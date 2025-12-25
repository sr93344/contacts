const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.use(require('../middleware/validateTokenHandler').validateTokenHandler);

router.route('/').get(contactController.getContacts)
    .post(contactController.createContact);

router.route('/:id').get(contactController.getContactById)
    .put(contactController.updateContactById)
    .delete(contactController.deleteContactById);

module.exports = router;