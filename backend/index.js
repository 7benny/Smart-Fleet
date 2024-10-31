const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const authMiddleware = require('./middlewares/authMiddleware');

//Initializing the server
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Basic route
app.get('/', (req,res) => {
    res.send('Hello, Fleet Management backend');
});

//Defining the port 
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();

//User registration route

app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields' });
    }

    try {
        //check if user exists 
        let user = await User.findOne( {where: {email}})
        if (user){
            return res.status(400).json({msg: 'User already exists'});
        }
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        //Create and sign JWT
        const payload = {
            user: {
                id: user.id
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// User Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      let user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
  
      // Create and sign JWT
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
// Protected Route Example
app.get('/protected', authMiddleware, async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, { attributes: ['id', 'name', 'email'] });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });