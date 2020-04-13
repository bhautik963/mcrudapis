var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs("mongodb+srv://bhautik:1234567890@angularcurd-hbmz8.mongodb.net/bhautik?retryWrites=true&w=majority"); //db connection

//reading data
router.get('/', function (req, res) {
    res.send("hello from server 1234 !!!!");
});

router.post('/addstud', function (req, res) {
    console.log(req.body);
    db.bhautik.save({
        Enrollment_No: req.body.Enrollmentno,
        Name: req.body.Name,
        Age:req.body.age,
        Birth_Date:req.body.Bod,
        Department:req.body.dept,
        Branch:req.body.branch,
        Result:req.body.result,
        Fees:req.body.fees
    })
    res.status(200).send({
        "message": "data received"
    });
});

// Get single employee
router.get('/read/:id',(req, res) => {
    db.bhautik.findOne({_id: mongoose.ObjectId(req.params.id)}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
		//console.log(data);

        
      }
    })
  })

   // Update employee
router.put('/update/:id',(req, res, next) => {
    db.bhautik.update({_id: mongoose.ObjectId(req.params.id)}, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        
        console.log('Data updated successfully')
      }
    })
  })


// get user

router.get("/getuser",function(req,res){  
    db.bhautik.find(function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{               
                  res.json(data);
		      consol.log(data);
                  }  
          });  
  });


  //delete user
  router.delete('/delete/:id',(req, res, next) => {
    db.bhautik.remove({_id: mongoose.ObjectId(req.params.id)}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: "dele"
        })
      }
    })
  })





module.exports = router;
