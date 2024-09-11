const express = require('express')
const app = express()
app.listen(7777)
app.use(express.json())

let db = new Map()
var id = 1

app
    .route('/channels')
    .get((req, res) => {
        if (db.size) {
            var channels = []
            db.forEach(function(value, key) {
                channels.push(value)
            })
            res.status(200).json(channels)
        } else {
            res.status(404).json({
                message : "no channel"
            })
        }
    })
    .post((req, res) => {
        if (req.body.channelTitle) {
            db.set(id++, req.body)
            res.status(201).json({
                message : `${db.get(id-1).channelTitle} created`
            })
        } else {
            res.status(404).json({
                message : "error"
            })
        }
    
    })

app
    .route('/channels/:id')
    .get((req, res) => {
        let {id} = req.params
        id = parseInt(id)
        var channel = db.get(id)
        if (channel) {
            res.status(200).json(channel)
        } else {
            res.status(404).json({
                message : "no such channel"
            })
        }
    })
    .put((req, res) => {
        let {id} = req.params
        id = parseInt(id)
        var channel = db.get(id)
        var oldTitle = channel.channelTitle
        if (channel) {
            var newTitle = req.body.channelTitle
            channel.channelTitle = newTitle
            db.set(id, channel)
            res.json({
                message : `${oldTitle} -> ${newTitle} updated`
            })
        } else {
            res.status(404).json({
                message : "no such channel"
            })
        }
    })
    .delete((req, res) => {
        let {id} = req.params
        id = parseInt(id)
        var channel = db.get(id)
        if (channel) {
            db.delete(id)
            res.status(200).json({
                message : `${channel.channelTitle} deleted`
            })
        } else {
            res.status(404).json({
                message : "no such channel"
            })
        }
    })