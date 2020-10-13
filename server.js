const express=require('express');
const connectDB=require('./config/db');
const users=require('./router/api/users');
const posts=require('./router/api/posts');
const auth=require('./router/api/auth');
const profile=require('./router/api/profile');

const app=express();
 connectDB();
app.use(express.json({extended:false}));
app.get('/',(req,res)=>
    res.send('api running')
);

app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/auth',auth);
app.use('/api/profile',profile);


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));