const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json())

let db = new Map()
var id = 1

// login
app.post('/login', function(req, res) {
    console.log(req.body)
    const {userId, password} = req.body
    var loginUser = {}
    db.forEach(function(user, id) {
        if (user.userId === userId) {
            loginUser = user
        }
    })
    if(isExist(loginUser)) {
        console.log("same")
        if (loginUser.password === password) {
            console.log('same password')
        } else {
            console.log('diff password')
        }
    } else {
        console.log("no such id")
    }
})

function isExist(obj) {
    if (Object.keys(obj).length) {
        return true;
    } else {
        return false;
    }
}

// sign up
app.post('/join', function(req, res) {
    console.log(req.body)
    if (Object.keys(req.body).length !== 0) {
        db.set(id++, req.body)
        res.status(201).json({
            message : `welcome, ${db.get(id-1).name}`
        })
    } else {
        res.status(400).json({
            message : `error`
        })
    }
})

// edit
app.get('/users/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    const user = db.get(id)
    if (user == undefined) {
        res.status(404).json({
            message : "error"
        })
    } else {
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
    }
})

// delete
app.delete('/users/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    const user = db.get(id)
    if (user == undefined) {
        res.status(404).json({
            message : "error"
        })
    } else {
        db.delete(id)
        res.status(200).json({
            message : `goodbye, ${user.name}`
        })
    }
})