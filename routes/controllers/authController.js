const db = require('../db'); // MySQL connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'your_jwt_secret'; // Use .env in production

// REGISTER
const register = async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        await db.query(
            'INSERT INTO users (name,email,phone,password,role) VALUES (?,?,?,?,?)',
            [name,email,phone,hashed,role || 'renter']
        );
        res.status(201).json({message: 'User created'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email=?',[email]);
        if(!rows.length) return res.status(404).json({error:'User not found'});
        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(400).json({error:'Invalid password'});
        const token = jwt.sign({id:user.id, role:user.role}, SECRET,{expiresIn:'7d'});
        res.json({token, user:{id:user.id,name:user.name,email:user.email,role:user.role}});
    } catch(err) {
        res.status(500).json({error:err.message});
    }
};

module.exports = { register, login };
