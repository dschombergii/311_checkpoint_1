let Users = require('../data/index')
const sampleUser = require('../data/sampleUser')


// Gets all users. 
const listUsers = (req, res) => {
    res.json(Users)
}

// Gets specific user.
const showUser = (req, res) => {
    const foundUser = Users.some(user => user.id === parseInt(req.params.id))

    if (foundUser) {
        res.json(Users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(404).json({
            status: `404 Not Found`,
            msg: `No user with the ID of ${req.params.id}`
        })
    }
}

// Submit a new user (hardcoded sampleUser)
const createUser = (req, res) => {
    lastUser = Users.slice(-1)
    let newUser = { ...sampleUser }
    newUser.id = lastUser[0].id + 1
    Users.push(newUser)
    res.json(Users)
}

// Update existing user (to hardcoded sampleUser)
const updateUser = (req, res) => {
    const foundUser = Users.some(user => user.id === parseInt(req.params.id))

    if (foundUser) {
        const userID = parseInt(req.params.id)
        let updatedUser = Users.filter(user => user.id === userID);
        updatedUser = { ...sampleUser }
        updatedUser.id = userID
        Users.splice(userID - 1, 1, updatedUser)
        res.json(Users)
    } else {
        res.status(400).json({
            status: `400 Bad Request`,
            msg: `No user with the ID of ${req.params.id}`
        })
    }

    res.json(Users)
}

// Delete specific user
const deleteUser = (req, res) => {
    const foundUser = Users.some(user => user.id === parseInt(req.params.id))

    if (foundUser) {
        const deleteAlert = { alert: `userID: ${parseInt(req.params.id)} has been deleted` }
        Users.splice(Users.findIndex(user => user.id === parseInt(req.params.id)), 1, deleteAlert)
        res.json(Users)
    } else {
        console.log("error")
        res.status(400).send({
            status: `400 Bad Request`,
            msg: `No user with the ID of ${req.params.id}`
        })
    }
}

module.exports = { listUsers, showUser, createUser, updateUser, deleteUser }