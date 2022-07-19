var express = require('express');
var router = express.Router();
var conn = require('../lib/db');


router.get('/update_sal', function(req, res, next) {
    
    // if(req.session.loggedin == true) {
  
        conn.query('SELECT * FROM employee_hours_worked', function(err,row)     {
            console.log(err);
                
        
            if(err){ 
                res.render('../views/update_sal',
                {
                    page_title: "Employee Work Hours",
                    newSal: ''
                });   
            }
            else{ 
                res.render('../views/update_sal',
                {
                    page_title: "Employee Work Hours",
                    newSal: row,
                    my_session: req.session,
                });
            }
                                
        });
    // }else{
    //     res.redirect('/login')
    // }
       
});


router.get('/edit_workSheet/edit/:id', function(req,res) {

    conn.query('SELECT * FROM employee_payroll.employee_hours_worked WHERE id=' + req.params.id, function(err,rows) {
        if(err){
            console.log(err)
            // res.render('../views/edit_workSheet',
            // {
            //     page_title: "Edit Employee Work Hours",
            //     data: ''
            // }); 
        }else {
            res.render('../views/edit_workSheet',
            {
                page_title: "Edit Employee Work Hours",
                data: rows,
                my_session: req.session
            });
        }
    })

});

router.post('/edit_workSheet/update/:id', function(req,res) {

    // if(req.session.loggedin == true ) {
        let sqlQuery = "UPDATE employee_payroll.employee_hours_worked SET emply_id ='" + req.body.emply_id + 
        "', first_nm ='" + req.body.name +  
        "', basic_hrs ='" +  req.body.basic_hrs + 
        "', date_from ='" +  req.body.date_from + 
        "', date_to ='" +  req.body.date_to + 
        "', days_absent ='" + req.body.days_absent + 
        "', absent_id ='" + req.body.absent_id +
        "', reg_hrs_wrkd ='" + req.body.reg_hrs_wrkd +
        "', ot_hrs ='" + req.body.ot_hrs +
        "' WHERE id = " + req.body.id;
    
       conn.query(sqlQuery,(err,rows) => 
    
       {
            if(err) throw err;
            console.log(err)
            //req.flash('error', err); 
            res.redirect('/update_sal');                  
        });
        
    // }else {
    //     res.redirect('/login')
    // } 

})

router.get('/edit_workSheet/delete/:id', function(req, res){
    // if(req.session.loggedin == true ) {
        conn.query('DELETE FROM employee_payroll.employee_hours_worked WHERE id =' + req.params.id, function(err, row){
            if(err)  throw err;
            
                res.redirect('/update_sal');
            
        });
    // }else {
    //     res.redirect('/login')
    // } 
});
module.exports = router