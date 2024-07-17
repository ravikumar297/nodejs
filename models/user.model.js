const db = require('../config/db.config');

class User {
    
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.mail = user.mail;
        this.password = user.password;
        this.address = user.address;
        this.state = user.state;
        this.city = user.city;
    }

    static create(newUser, result) {
        db.query('INSERT INTO users SET ?', newUser, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            result(null, { id: res.insertId, ...newUser });
        });
    }
    static findById(userId, result) {
        db.query('SELECT * FROM users WHERE id = ?', [userId], (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            if (res.length) {
                result(null, res[0]);
                return;
            }

            result({ kind: 'not_found' }, null);
        });
    }
    static getAll(result) {
        db.query('SELECT * FROM users', (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            result(null, res);
        });
    }
    static updateById(id, user, result) {
        db.query(
            'UPDATE users SET first_name = ?, last_name = ?, mail = ?, password = ?, address = ?, state = ?, city = ? WHERE id = ?',
            [user.first_name, user.last_name, user.mail, user.password, user.address, user.state, user.city, id],
            (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    result(err, null);
                    return;
                }

                if (res.affectedRows == 0) {
                    result({ kind: 'not_found' }, null);
                    return;
                }

                result(null, { id: id, ...user });
            }
        );
    }
    static remove(id, result) {
        db.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            result(null, res);
        });
    }
}


module.exports = User;
