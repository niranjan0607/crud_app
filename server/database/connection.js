const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
       // mongodb connection str
        const con=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
            // useFindAndModify:false,
            // useCreateIndex:true
        })

        console.log(`MongoDB connected:${con.connection.host}`);
    }catch(err){
      console.log(err);
      process.exit(1);
    }
   
    // try{
    //    await mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology:true});
    //    console.log('Database connected successfully')
    // }catch(error){
    //   console.log('Error while connecting with the database',error.message)
    // }

}
module.exports=connectDB
