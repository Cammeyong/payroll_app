var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/new_reg_sal', function(req,res,next) {

    conn.query('SELECT * FROM employee_hours_worked', function(err, rows) {
        if(err) {
            console.log(err);
        }else {
            res.render('../views/new_reg_sal', {
                it:rows,
                page_title: "New Employees"
            });
            next();
        }
    })
});
router.post('/new_reg_sal/add', function(req,res) {

    let data = {emply_id:   req.body.emply_id,
        first_nm:           req.body.first_nm,
        last_nm:            req.body.last_nm,
        department_id:      req.body.department_id,
        basic_hrs:          req.body.basic_hrs,
        reg_hrs_wrkd:       req.body.reg_hrs_wrkd,
        ot_hrs:             req.body.ot_hrs,
        days_absent:        req.body.days_absent,
        absent_id:          req.body.absent_id,
        // password:     password,    
    };

    let sqlQuery = "INSERT INTO employee_payroll.employee_hours_worked SET ?";

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