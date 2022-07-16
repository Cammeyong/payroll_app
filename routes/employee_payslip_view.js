var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/employee_payslip_view/:emply_id', function(req, res) {

    if(req.session.loggedin == true ) {

    conn.query(`SELECT * FROM payslip WHERE emply_id = "${req.params.emply_id}"`, function(err,row) {
        if(err){ 
        console.log(err)  
        }
        else{             
            res.render('../views/employee_payslip_view',
            {
                page_title: "Employees Payslip",
                data: row,
                my_session: req.session
            });
        }
                            
    });
   }else {
    res.redirect('/login')
 } 
});

module.exports = router;