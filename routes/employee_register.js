var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
var bcrypt = require('bcrypt');

router.get('/employee_register', function(req,res,next){
 
    conn.query ("SELECT * FROM employees", function(err, rows) {
        if(err){
            console.log(err);
        } else {
            res.render('../views/employee_register', {
                it: rows
            }); 
             next();
        }
    })

});

router.post('/employee_register/add', async function(req,res,){
   
    try {
        var password = req.body.password;
        password = await bcrypt.hash(password, 10);

        let data = {emply_id:   req.body.emply_id,
            first_nm:     req.body.first_nm,
            last_nm:      req.body.last_nm,
            email:        req.body.email,
            password:     password,    
        };
    
        let sqlQuery = "INSERT INTO employee_payroll.employees SET ?";
    
        conn.query(sqlQuery, data,(err, results) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
        // res.send(JSONResponse(results));
        });

    }catch(err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
    
   
})

module.exports = router;