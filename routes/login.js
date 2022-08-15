var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
var bcrypt = require('bcrypt');

router.get('/login', function(req,res,next){
    res.render('../views/login',{
         messages:req.session?.flash,
         my_session: req.session,
         
        });
    
    next();
});

router.post('/login', async function(req, res) {
    var email = req.body.email;
    // var password = req.body.password;
    

    conn.query(" SELECT * FROM employee_payroll.employees WHERE email = ?" , [email], function (err, rows) {

        // if login is incorrect or not found
        
        if (rows[0].password) {
            bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
             
             if(result) {
                req.session.loggedin = true;
                req.session.first_nm = rows[0].first_nm;
                req.session.last_nm = rows[0].last_nm;
                req.session.emply_id = rows[0].emply_id;
                req.session.is_authorised = rows[0].authorised;
                req.session.from_department = rows[0].department;
                
                if (req.session.is_authorised == 0) {

                    res.redirect('/view_payslip');
                    
                } else if (req.session.is_authorised == 1 ) {
                    res.redirect('/employee_payslip_list'); 
                    
                    
                } else if (req.session.is_authorised == 2 ) {
                    res.redirect('/update_sal');
                }
               return 
             }
             else {
                req.flash('error', 'Incorrect Email or Password, Please try again!');
                res.redirect('/login');
                return
    
            }
            
        });   
        }
    })
    
})


router.get('/logout', function (req, res) {
    req.session.destroy();
    // req.flash('success', 'Enter Your Login email and password');
    res.redirect('/',);
});

module.exports = router;