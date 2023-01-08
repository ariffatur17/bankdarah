const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config({path: '../env'});

// const db = mysql.createConnection({
//     host : 'localhost',
//     database : 'auth_db',
//     user : 'root',
//     password : ''
// });

// exports.register = (req, res) => {
//     console.log(req.body);
    
//     const { name, email, username, password, passwordconfirm } = req.body;
    
//     db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
//         if(error){
//             throw error;
//         }

//         if( results.length > 0 ) {
//             return res.render('register', {
//                 message: 'That email is already in use'
//             });
//         } else if( password !== passwordconfirm ) {
//             return res.render('register', {
//                 message: 'Passwords do not match'
//             });
//         };

//         let hashedPassword = await bcrypt.hash(password, 8);
//         console.log(hashedPassword);

//         db.query('INSERT INTO users SET ?', {name: name, email: email, username: username, password:hashedPassword }, (error, results) => {
//             if(error) {
//                 throw error;
//             } else {
//                 return res.render('register', {
//                     message: 'User registered'
//                 });
//             }
//         })
//     });

// };

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).render('login', {
                message: "Please Provide an username and password"
            })
        }
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            console.log(results);
            if (!results || !await bcrypt.compare(password, results[0].password)) {
                res.status(401).render('login', {
                    message: 'Username or Password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE_IN
                });

                console.log("the token is " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('userSave', token, cookieOptions);
                res.status(200).redirect("/profile");
            }
        })
    } catch (err) {
        console.log(err);
    }
}
exports.register = (req, res) => {
    console.log(req.body);
    const { name, email, username, date, password, passwordconfirm } = req.body;
    db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.render('register', {
                    message: 'The email is already in use'
                })
            } else if (password != passwordconfirm) {
                return res.render('register', {
                    message: 'Password dont match'
                });
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, username: username, date: date, password: hashedPassword }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.render('register', {
                    message: 'User registered'
                });
            }
        })
        res.status(200).redirect("/login");
    })
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.userSave) {
        try {
            // 1. Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave,
                process.env.JWT_SECRET
            );
            console.log(decoded);

            // 2. Check if the user still exist
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
                console.log(results);
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        next();
    }
}
exports.logout = (req, res) => {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
}