var express = require('express');
var router = express.Router();
var conn = require('../lib/db');


router.get('/update_sal', function(req, res, next) {
    

    if(req.session.loggedin == true && req.session.is_authorised == 2) {
        console.log(req.session)
        conn.query('SELECT ps.*, ps.id as payId, em.*, dp.* FROM employee_payroll.payslip ps, employee_payroll.employees em, employee_payroll.departments dp WHERE em.emply_id = ps.emply_id AND em.department = ' + req.session.from_department + ' AND dp.department_id = ' + req.session.from_department, function(err,row) {
            // console.log(err);     
            
                if(err){ 
                    console.log(err)
                      
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

    }else{
        res.redirect('/login')
    }
       
});


router.get('/edit_workSheet/edit/:id', function(req,res) {
    if(req.session.loggedin == true ) {

    conn.query('SELECT * FROM employee_payroll.payslip WHERE id = ' + req.params.id, function(err,rows) {
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
}else{
    res.redirect('/login')
}

});

router.post('/edit_workSheet/update/:id', function(req,res) {

    // if(req.session.loggedin == true ) {

    var regSal= parseInt(req.params.hourly_rate) * parseInt(req.body.reg_hrs_wrkd);
    var otRate = parseInt(req.body.basic_hours) * 1.5;
    var otSal =+ otRate * parseInt(req.body.ot_hrs);
    var totalSal = regSal + otSal;

    
        let sqlQuery = "UPDATE employee_payroll.payslip SET emply_id ='" + req.body.emply_id +  
        "', basic_hrs ='" +  req.body.basic_hrs + 
        "', date_from ='" +  req.body.date_from + 
        "', date_to ='" +  req.body.date_to + 
        "', days_absent ='" + req.body.days_absent + 
        "', absent_id ='" + req.body.absent_id +
        "', reg_hrs_wrkd ='" + req.body.reg_hrs_wrkd +
        "', ot_hrs ='" + req.body.ot_hrs +
        "' WHERE id = " + req.params.id;
    
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
        conn.query('DELETE FROM employee_payroll.payslip WHERE id =' + req.params.id, function(err, row){
            if(err)  throw err;
            
                res.redirect('/update_sal');
            
        });
    // }else {
    //     res.redirect('/login')
    // } 
});
module.exports = router