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
                it: rows,
                my_session:req.session,
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
        cycle_id:           req.body.cycle_id,
        date_from:          req.body.date_from,
        date_to:            req.body.date_to,
        basic_hrs:          req.body.basic_hrs,
        regular_pay:        req.body.regular_pay,
        overtime:           req.body.overtime,
        gross_pay:          req.body.gross_pay, 
        tax_id:             req.body.tax_id,
        tax_rate:           req.body.tax_rate,
        days_absent:        req.body.days_absent,
        absent_id:          req.body.absent_id,
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