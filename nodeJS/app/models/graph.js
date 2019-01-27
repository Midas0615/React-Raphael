var mongoose = require('mongoose');

var timestamps = require('mongoose-timestamp');
var GraphSchema = new mongoose.Schema({
    // email: {
    //     type: String,
    //     default: ''
    // },
    // password: {
    //     type: String,
    //     default: ''
    // }
    target: {
        type: String,
        default: ''
    },
    Xaxis: {
        type: Number,
        default: ''
    },
    Yaxis: {
        type: Number,
        default: ''
    },
    Color: {
        type: String,
        default: ''
    }
});
GraphSchema.plugin(timestamps);
mongoose.model('Graph', GraphSchema);
module.exports = mongoose.model('Graph', GraphSchema)
