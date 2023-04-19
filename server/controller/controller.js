var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
//validate req
if(!req.body){
    res.status(404).send({message:"Content can not be empty"});
    return;
}
//new user
const user=new Userdb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})

//save use in the database
user
 .save(user)
 .then(data=>{
    res.redirect('/add-user');
})
.catch(err=>{
    res.status(500).send({
        message:err.message||"Some error occured while crating a create operation"
    });
});
}

//retrive and return all user /single user
exports.find=(req,res)=>{

    if(req.query.id){
      const id=req.query.id;

      Userdb.findById(id)
      .then(data=>{
        if(!data){
            res.status(404).send({message:"Not found user with id"+id})
        }
        else{
            res.send(data)
        }
      })
      .catch(err=>{
        res.status(500).send({message:"Error retrieveng user with id"+id})
      })
    }
    else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message||"Error Occured"})
         })
        }
    }

//update a new identify user by user id

exports.update=(req,res)=>{
if(!req.body){
    return res
    .status(400)
    .send({message:"Data to update can not be empty"})
}
const id=req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot Update user with ${id}.maybe user not found`})
    }
    else{
        res.send(data)
    }
})
.catch(err=>{
 res.status(500).send({message:"Error Update user information"})
})
}

//delete a user with specified user id in the request
exports.delete=(req,res)=>{
const id=req.params.id;

Userdb.findByIdAndDelete(id)
.then(data=>{
    if(!data){
        res.status(404).send({message:`Cannot delete with ${id}.Maybe id is wrong`})
    }
    else{
        res.send({
            message:"User was deleted Succesfully!"
        })
    }
})
.catch(err=>{
    res.status(500).send({
        message:"Could not deleted User with id="+id
    });
});
}