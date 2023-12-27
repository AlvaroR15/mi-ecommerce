const fs = require('fs');
const path = require('path');
const User = {
    fileName: path.join(__dirname,'../data/users.json'),
    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    getAll: function() {
        return this.getData();
    },
    getUser: function(id) {
        return this.getAll().find(user => user.id == id);
    },
    getUserByField: function(field,value) {
        return this.getAll().find(fieldValue => fieldValue[field] == value);
    },
    generateId: function() {
        if (this.getAll() != "") {
            return this.getAll()[this.getAll().length - 1].id + 1
        } else {
            return 1;
        }
    },
    create: function(userData) {
        let users = this.getAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        users.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(users,null,' '), 'utf-8');
        return newUser;
    },
    delete: function(id) {
        let users = this.getAll().filter(users => users.id != id);
        fs.writeFileSync(this.fileName, JSON.stringify(users,null,' '), 'utf-8');
        return 'Usuario eliminado';
    }
}


module.exports = User;