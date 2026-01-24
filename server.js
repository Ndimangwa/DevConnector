const path = require('path'); //for production usage
const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connectDB
connectDB();

//Middleware
app.use(express.json({ extended: false }));

//Testing route
/*app.get('/', (req, res) => {
    res.send('App is Running!!!!!');
});*/

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

//Begin -- Configure for production
    //Server React build
if (process.env.NODE_ENV === 'production')  {
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
//End -- Configure for production

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
});