const fs = require('fs')

var test = "Ca marche trop bien"

var myfile = JSON.parse(fs.readFileSync('users.json'))

console.log(myfile.users[0].name)
console.log(myfile.users[0].age)


myfile.users.push({"name": "Joao"})
console.log(myfile)