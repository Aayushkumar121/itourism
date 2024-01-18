const mongoose=require('mongoose')
const placeschema =new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            unique: true,
        },
        desc:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        region:
        {
            type: String,
            required: true,
        },
        photo: 
        {
            type: String,            
        },
        rating:
        {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        NotAvailableDate:
        {
          type: [Number],
          default: [],
        }
    }, {timestamps: true}
)
module.exports = mongoose.model("Place",placeschema)