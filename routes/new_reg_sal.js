var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/new_reg_sal', function(req,res,next) {

    conn.query('SELECT * FROM employee_payroll.departments WHERE department_id =' + req.session.from_department, function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            res.render('../views/new_reg_sal', {
                // rates:rows,
                page_title: "New Employees",
                my_session: req.session,
                retVal:rows
            });
            next();
        }
    })
});
router.post('/new_reg_sal/add/:hourly_rate/:basic_hours/', function(req,res) {

    var regSal= parseInt(req.params.hourly_rate) * parseInt(req.body.reg_hrs_wrkd);
    var otRate = parseInt(req.params.hourly_rate
        ) * 1.5;
    var otSal = otRate * parseInt(req.body.ot_hrs);
    var totalSal = regSal + otSal; 
    // var tax = parseInt(req.params.tax_id) * totalSal;
    var tax = totalSal * 0.2
    var net = totalSal - tax;

    console.log(tax)

    let data = {emply_id:   req.body.emply_id, 
        cycle_id:           req.body.cycle_id,
        regular_pay:        parseInt(regSal),
        overtime:           parseInt(otSal),
        gross_pay:          parseInt(totalSal),
        tax_rate:           parseInt(tax),
        net_pay:            parseInt(net),
        basic_hrs:          req.body.basic_hrs,
        date_from:          req.body.date_from,
        date_to:            req.body.date_to,
        tax_id:             req.body.tax_id,
        reg_hrs_wrkd:       req.body.reg_hrs_wrkd,
        ot_hrs:             req.body.ot_hrs,
        days_absent:        req.body.days_absent,
        absent_id:          req.body.absent_id,
          
    };
    console.log(tax)

    let sqlQuery = "INSERT INTO employee_payroll.payslip SET ?";

    conn.query(sqlQuery, data,(err, results) => {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/')
    }
    // res.send(JSONResponse(results));
    });
})




module.exports = router;