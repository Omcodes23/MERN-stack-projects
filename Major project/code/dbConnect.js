// const mongoose=require('mongoose');

// module.exports=async()=>{
//     // const mongoUri='mongodb+srv://yashrastogi2904:FzH4N3zvjfmCYmWD@cluster0.xudutjw.mongodb.net/';
//     const mongoUri='mongodb+srv://omvataliya23:omega23@cluster0.phuhotd.mongodb.net/';
//     try{
//         const connect=await mongoose.connect(mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("mongoDB connected ",connect.connection.host);
//     }catch(e){
//         console.log(e);
//         process.exit(1);
//     }
// }
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const mongoUri = 'mongodb+srv://omvataliya23:omega23@cluster0.phuhotd.mongodb.net/'; // Replace with your MongoDB URI
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = dbConnect;

