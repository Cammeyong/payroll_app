var express = require('express');
var router = express.Router();
var conn = require('../lib/db');
var bcrypt = require('bcrypt');

router.get('/employee_register', function(req,res,next){

    // if(req.session.loggedin == true ) {
 
        conn.query ("SELECT * FROM employees", function(err, rows) {
            if(err){
                console.log(err);
            } else {
                res.render('../views/employee_register', {
                    it: rows,
                    my_session:req.session,
                }); 
                next();
            }
        })
    // }else {
    //     res.redirect('/login')
    // } 

});

router.post('/employee_register/add', async function(req,res,){
    // if(req.session.loggedin == true ) {
   
    try {
        var password = req.body.password;
        password = await bcrypt.hash(password, 10);

        let data = {emply_id:   req.body.emply_id,
            first_nm:     req.body.first_nm,
            last_nm:      req.body.last_nm,
            email:        req.body.email,
            department:   req.body.department,
            authorised:   req.body.authorised,
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
    
// }else {
//     res.redirect('/login')
// } 
   
})

module.exports = router;