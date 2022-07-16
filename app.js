const port = process.env.PORT || 8080;
var path = require('path');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var app = express();
var bcrypt = require('bcrypt');

var conn = require('./lib/db');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));


var indexRoute = require('./routes/index');
var employee_registerRoute = require('./routes/employee_register');
var new_payslipRoute = require('./routes/new_payslip');
var view_payslipRoute = require('./routes/view_payslip');
var new_reg_salRoute = require('./routes/new_reg_sal');
var employee_payslip_listRoute = require('./routes/employee_payslip_list');
var employee_payslip_viewRoute = require('./routes/employee_payslip_view');
var loginRoute = require('./routes/login');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({ 
    secret: 'secREt$#code$%3245',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6*60*10000 }
}))

app.use(flash());

// routing middleware
app.use(employee_registerRoute);
app.use(new_reg_salRoute);
app.use(loginRoute);
app.use(view_payslipRoute);
app.use(employee_payslip_listRoute);
app.use(new_payslipRoute);
app.use(employee_payslip_viewRoute),
app.use('/', indexRoute);

app.listen(port, () => console.log(`Listening on port ${port}..`));
