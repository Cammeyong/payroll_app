var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

function getSum(oRow, oColumn) {
    var total = 0;
    for (i=0; i<oRow.length; i++) {
        total += parseInt(oRow[i][oColumn]);
        console.log(total)
    }
    return total;
}

// router.get('/employee_payslip_list', function(req, res, next) {
//      if(req.session.loggedin == true ) {
//     conn.query('SELECT * FROM payslip', function(err,row)     {
//         console.log(err);
            
    
//         if(err){ 
//             res.render('../views/employee_payslip_list',
//             {
//                 page_title: "Employees Payslip",
//                 payslip: ''
//             });   
//         }
//         else{ 
//             // console.log(row)
//             // var retVal = getSum(row, 7);
//             var totalNet = 0;
//             for (i=0; i<row.length; i++) {
//                 // totalNet += parseInt(row[i].net_pay);
//                 totalNet = totalNet + parseInt(row[i].net_pay);
//                 console.log(totalNet)
//     }
//             res.render('../views/employee_payslip_list',
//             {
//                 page_title: "Employees Payslip",
//                 payslip: row,
//                 my_session: req.session,
//                 net_pay: totalNet
//             });
//         }
                            
//     });
    
//      }else {
//      res.redirect('/login')
//  }
    
// });

router.get('/employee_payslip_list', function(req, res, next) {
    
    let aggQuery =`select count(emply_id) as Total_Employees, sum(net_pay) as Total_Payments, avg(net_pay) as Average_Payments, min(net_pay) as Minimum_Outgoing_Payment, max(net_pay) as Maximum_Outgoing_Payment from payslip`

    if(req.session.loggedin == true ) {
        
   conn.query('SELECT * FROM payslip', function(err,row) {
       console.log(err);
           
   
       if(err){ 
           res.render('../views/employee_payslip_list',
           {
               page_title: "Employees Payslip",
               payslip: ''
           });   
       }
       conn.query(aggQuery, (err, aggRow) => {
        if(err) throw err

        res.render('../views/employee_payslip_list',
           {
               page_title: "Employees Payslip",
               payslip: row,
               my_session: req.session,
               net_pay: aggRow

           });
       })
                          
   });
   
    }else {
    res.redirect('/login')
}
   
});


router.get('/employee_payslip/edit/:id', function(req, res, next) {
    if(req.session.loggedin == true ) {
    conn.query('SELECT * FROM payslip WHERE id='+ req.params.id, function(err,row)     {
    
        if(err){
            //req.flash('error', err); 
            res.render('../views/employee_payslip_update',
            {
                page_title: "Edit Payslip Page",
                data: ''
            });   
        }
        else{ 
            res.render('../views/employee_payslip_update',
            {
                page_title: "Edit Payslip Page",
                data: row,
                my_session: req.session
            });
        }
                            
        });
    }else {
        res.redirect('/login')
    }
           
    });

router.post('/employee_payslip/update/:id', function (req,res) {
    if(req.session.loggedin == true ) {
    let sqlQuery = "UPDATE employee_payroll.payslip SET emply_id ='" + req.body.emply_id + 
    "', date ='" + req.body.date + 
    "', regular_pay ='" +  req.body.regular_pay + 
    "', overtime ='" + req.body.overtime + 
    "', gross_pay ='" + req.body.gross_pay +
    "', net_pay = '" + req.body.net_pay +
    "' WHERE id = " + req.body.id;

    let query = conn.query(sqlQuery,(err,rows) => {
        if(err) throw err;
        console.log(err)
        //req.flash('error', err); 
        res.redirect('/employee_payslip_list');                  
    });
    
}else {
    res.redirect('/login')
} 
});




router.get('/employee_payslip/delete/:id', function(req, res){
    if(req.session.loggedin == true ) {
    conn.query('DELETE FROM employee_payroll.payslip WHERE id =' + req.params.id, function(err, row){
        if(err)  throw err;
        //req.flash('error', err); //must install additionals 'flash messages and others from to do list for these to work;

       //req.flash('success', 'Deleted Successfully') 
            // alert('Delete Successful');
            res.redirect('/employee_payslip_list');
           
    });
        }else {
            res.redirect('/login')
        } 
});


module.exports = router;