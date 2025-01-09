const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(path.join(__dirname, '../public.key'), 'utf-8');

exports.protect = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);

  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    req.user = decoded; // Attach user data to request
    console.log('Decoded Token:', decoded);
    next();
  } catch (error) {
    console.error('Token verification error:', error.name, error.message);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};