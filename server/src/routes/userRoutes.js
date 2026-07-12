/**
 * @file userRoutes.js
 * @description Express router for user-related endpoints.
 */

const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/users — Get all users except current user (requires auth)
router.get('/', authMiddleware, getUsers);

module.exports = router;
