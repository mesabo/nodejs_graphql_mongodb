/* // models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model('Item', itemSchema);
 */

// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone_number: String,
  role_id: String,
  is_blacklisted: Boolean,
  created_at: Date,
  updated_at: Date,
  deleted_at: Date,
});

module.exports = mongoose.model('Users', itemSchema);
