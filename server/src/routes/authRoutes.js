/**
 * @file authRoutes.js
 * @description Express router for authentication endpoints.
 */

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { loginValidationRules } = require('../validators/authValidator');
const validateRequest = require('../middleware/validationMiddleware');

// POST /api/auth/login — Create or retrieve user by username
router.post('/login', loginValidationRules, validateRequest, login);

module.exports = router;
