const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { response } = require('express')

const employeeSchema = mongoose.Schema({
    employeeName: String,
    departmentName: String,
    emailId: String,
    dob: String,
    address: String
})
let Employee = mongoose.model('employessdatas', employeeSchema)

const departmentSchema = mongoose.Schema({
    departmentName: String
})
let Department = mongoose.model('departmentdata', departmentSchema)

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Mohan:mh123@cluster0.aklutkh.mongodb.net/?retryWrites=true&w=majority')



const app = express()
app.use(cors())
app.use(express.json())

// Employee Post Method 
app.post('/emppost', (req, res) => {
    let employee = new Employee({
        employeeName: req.body.employeeName,
        departmentName: req.body.departmentName,
        emailId: req.body.emailId,
        dob: req.body.dob,
        address: req.body.address

    })
    res.json({
        message: 'Employee Added Successfully'
    })
    employee.save()
.then(res => {
 })
 .catch(err => {
            message: "An error occured"
        })
})


// Department Post method
app.post('/deptpost', (req, res, next) => {
    let department = new Department({
        departmentName: req.body.departmentName
    })
    res.json({
        message: 'Department Added Successfully'
    })
    department.save()
        .then(res => {
            
         })
        .catch(err => {
            message: "An error occured"
        })
})


// EMployee GET method
app.get('/empget', (async (req, res, next) => {
    let data = await Employee.find()
    res.send(data)
}))

//employye get by id
app.get('/empget/:id', (async (req, res, next) => {
    let id=(req.params.id);
    let data = await Employee.findOne({_id:id})
    res.send(data)
}))


// Department GET method
app.get('/deptget', (async (req, res, next) => {
    let data = await Department.find()
    res.send(data)
}))


// Employee DELETE method
app.delete("/delete/:id", async (req, res) => {
    let data = await Employee.deleteOne({ _id: req.params.id })
    res.send("Deleted successfully")
})


//Department DELETE method
app.delete("/deletedept/:id", async (req, res) => {
    let data = await Department.deleteOne(req.params);
    res.send("Deleted successfully")
})


// Employee UPDATE method
app.put("/updateemp/:id", async (req, res) => {
    let data = await Employee.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.send("updated successfully");
})


// Department UPDATE method
app.put("/updatedept/:id", async (req, res) => {
    let data = await Department.updateOne(
        req.params,
        { $set: req.body }
    );
    res.send("updated successfully");
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is Running on port http://localhost:${PORT}`)
})

