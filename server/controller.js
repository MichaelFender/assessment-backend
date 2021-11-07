const profiles = require('./db.json');
let globalId = 4

module.exports = {
    getProfiles: (req, res) => res.status(200).send(profiles),
    deleteProfile: (req, res) => {
        let index = profiles.findIndex(elem => elem.id === +req.params.id)
        profiles.splice(index, 1)
        res.status(200).send(profiles)
    },
     createProfile: (req, res) => {
         let { name, salary, imageURL } = req.body
         let newProfile = {
             id: globalId, 
             name, 
             salary,
             imageURL
         }
         profiles.push(newProfile)
         res.status(200).send(profiles)
         globalId++
     },

    updateProfile: (req, res) => {
        let { id } = req.params
        // console.log(id)
        let {type} = req.body
        // console.log(type)
        let index = profiles.findIndex(elem => +elem.id === +id)
        // console.log(index)
        if (profiles[index].salary === 500000 && type === 'plus'){
            res.status(400).send('cannot go above $50000')
        } else if (profiles[index].salary === 0 && type === 'minus'){
            res.status(400).send('cannot go below zero dollars')
        } else
         if (type === 'plus'){
            profiles[index].salary += 10000;
            res.status(200).send(profiles)
        } else if (type === 'minus') {
            profiles[index].salary -= 10000;
            res.status(200).send(profiles)
        } else {
            res.sendStatus(400)
        }
    }


}