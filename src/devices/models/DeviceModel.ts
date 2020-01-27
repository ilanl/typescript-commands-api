import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    serial: {
        type: String,
        required: 'Serial Number is Missing'
    },
    state: {
        type: String,
        enum: ['on', 'restarting', 'off'],
        required: 'Device State'
    },
    attributes: {}
},{
  timestamps: true
});

export const DeviceModel = mongoose.model('Device', schema, 'devices')
