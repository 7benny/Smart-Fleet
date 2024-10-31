const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
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

  app.post('/vehicles', authMiddleware, async (req, res) => {
    const { make, model, year, status, batteryLevel, location } = req.body;
  
    // Simple validation
    if (!make || !model || !year) {
      return res.status(400).json({ msg: 'Please provide make, model, and year' });
    }
  
    try {
      const newVehicle = await Vehicle.create({
        make,
        model,
        year,
        status: status || 'active',
        batteryLevel: batteryLevel !== undefined ? batteryLevel : 100.0,
        location: location || null,
        ownerId: req.user.id, // Associate with the authenticated user
      });
  
      res.status(201).json(newVehicle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Get All Vehicles for Authenticated User
app.get('/vehicles', authMiddleware, async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll({ where: { ownerId: req.user.id } });
      res.json(vehicles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Get Single Vehicle by ID
app.get('/vehicles/:id', authMiddleware, async (req, res) => {
    try {
      const vehicle = await Vehicle.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
  
      if (!vehicle) {
        return res.status(404).json({ msg: 'Vehicle not found' });
      }
  
      res.json(vehicle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Update Vehicle by ID
app.put('/vehicles/:id', authMiddleware, async (req, res) => {
    const { make, model, year, status, batteryLevel, location } = req.body;
  
    try {
      let vehicle = await Vehicle.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
      if (!vehicle) {
        return res.status(404).json({ msg: 'Vehicle not found' });
      }
  
      // Update fields if provided
      vehicle.make = make || vehicle.make;
      vehicle.model = model || vehicle.model;
      vehicle.year = year || vehicle.year;
      vehicle.status = status || vehicle.status;
      vehicle.batteryLevel = batteryLevel !== undefined ? batteryLevel : vehicle.batteryLevel;
      vehicle.location = location || vehicle.location;
  
      await vehicle.save();
  
      res.json(vehicle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Delete Vehicle by ID
app.delete('/vehicles/:id', authMiddleware, async (req, res) => {
    try {
      const vehicle = await Vehicle.findOne({ where: { id: req.params.id, ownerId: req.user.id } });
      if (!vehicle) {
        return res.status(404).json({ msg: 'Vehicle not found' });
      }
  
      await vehicle.destroy();
  
      res.json({ msg: 'Vehicle removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  