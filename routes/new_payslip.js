var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/new_payslip', function(req,res,next){
 
    if(req.session.loggedin ==true) {
    conn.query ("SELECT * FROM payslip", function(err, rows) {
        if(err){
            console.log(err);
        } else {
            res.render('../views/new_payslip', {
                it: rows
            }); 
             next();
        }
    })
    } else{
        res.redirect('/login')
    }

});

router.post('/new_payslip/add', async function(req,res,){
  
    if(req.session.loggedin ==true) {

    let data = {emply_id:   req.body.emply_id,
        date:               req.body.date,
        regular_pay:        req.body.regular_pay,
        overtime:           req.body.overtime,
        gross_pay:          req.body.gross_pay, 
        tax_id:             req.body.tax_id,
        net_pay:            req.body.net_pay, 
    };

    let sqlQuery = "INSERT INTO employee_payroll.payslip SET ?";

    conn.query(sqlQuery, data,(err, results) => {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/employee_payslip_list')
    }
    // res.send(JSONResponse(results));
    });

}else{
    res.redirect('/login')
}
   
})

module.exports = router;