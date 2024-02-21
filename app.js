const express = require('express');

const app = express();
const port = 7777;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
// Custom middleware
// app.use((req,res,next)=>{
//     console.log("Custom middleware 1");
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("Custom middleware 2");
//     next();
// })

let students = [
    {
        'id': 1,
        'name': "Himanshu",
        "age": 21,
        "salary": 25000,
    },
    {
        'id': 2,
        'name': "Yogesh",
        "age": 23,
        "salary": 15000,
    },
    {
        'id': 3,
        'name': "Zaki",
        "age": 25,
        "salary": 10000,
    }
]

app.route('/')
.get((req,res)=>{
    return res.json({'message': 'Node js started'});
})

// HTTP methods
// 1) get
app.get('/students', (req,res)=>{
    return res.json({"data": students});
})

app.get('/student/:id', (req, res) => {
    let id = req.params.id
    let student = students.filter((value) => {
        return value.id == id
    })
    return res.json({"data": student});
})
// 2) post
app.post('/addStudent', (req,res)=>{
    let id = req.body.id;
    let student = students.filter((value) => {
        return value.id == id
    })
    if(student.length == 0){
        students.push({...req.body});
        return res.json({'data': students})
    }
    return res.json({'message': 'Student already existed'});
})
app.post('/getStudent', (req,res)=>{
    let id = req.body.id;
    let student = students.filter((value) => {
        return value.id == id
    })
    if (student.length != 0) {
        console.log(student)
        return res.json({ 'data': student })
    }
    return res.json({ 'message': 'Student does not exist!!' });
})
// 3) put
// 4) patch
// 5) delete

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})