const mongoose = require('mongoose');

const Company = new mongoose.Schema({
    name:{type: String, trim:true, default:''},
    yearFounded:{type: Number, default: 0},
    revenue:{type: Number, default: 0}
});

module.exports = mongoose.model('Company', Company);