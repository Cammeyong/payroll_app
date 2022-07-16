var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/view_payslip', function(req, res) {

    if(req.session.loggedin == true ) {

    conn.query("SELECT * FROM employees", function(err,row) {
        if(err){ 
        console.log(err)  
        }
        else{ 
            res.send(row)
            // res.render('../views/view_payslip',
            // {
            //     page_title: "Employees Payslip",
            //     view: row,
            //     my_session: req.session
            // });
        }
                            
    });
   }else {
    res.redirect('/login')
 } 
});

module.exports = router;