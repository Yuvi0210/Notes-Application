const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE;
// const mongoURI = "mongodb+srv://Dr_Legend:IFUckcELIqJhqURu@siddhartapi.k3yanvh.mongodb.net/?retryWrites=true&w=majority&appName=SiddhartAPI";


mongoose.set('strictQuery', true);

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log('Connection to db successful')
    } catch (error) {
        console.log(error)
    }
};

module.exports = connectToMongo;
