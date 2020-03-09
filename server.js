const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const myRouter = require('./routers/index');

const app = express();
// console.log(process.env.NODE_ENV);
mongoose.connect(config.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB connect'))
.catch(console.log)

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//server static folder
app.use('/uploads', express.static('./uploads'))

//Allow core
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/', express.static('./public/'))
app.use('/api', myRouter);
app.use('/docs', require('./routers/doc'));

const port = process.env.PORT || config.PORT;
app.listen(port, () => {
    console.log('App running on port: ', port)
});
