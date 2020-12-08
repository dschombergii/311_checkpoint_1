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
    let newUser = {
        ...sampleUser
    }
    newUser.id = lastUser[0].id + 1
    Users.push(newUser)
    res.json(Users)
}

// Update existing user (to hardcoded sampleUser)
const updateUser = (req, res) => {
    const foundUser = Users.some(user => user.id === parseInt(req.params.id))

    if (foundUser) {
        Users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = sampleUser.name ? sampleUser.name : user.name
                user.username = sampleUser.username ? sampleUser.username : user.username
                user.email = sampleUser.email ? sampleUser.email : user.email
                user.address = sampleUser.address ? sampleUser.address : user.address
                user.phone = sampleUser.phone ? sampleUser.phone : user.phone
                user.website = sampleUser.website ? sampleUser.website : user.website
                user.company = sampleUser.company ? sampleUser.company : user.company
            }
        })
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
    console.log(foundUser)

    if (foundUser) {
        Users.splice(Users.findIndex(user => user.id === parseInt(req.params.id)), 1)
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