const { errorHandler, makeErrorObject } = require('../utils/handleError');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signUpUser(req, res) {
    try {
        const { firstName, lastName, username, email, password, phone, address, role } = req.body;
        const allFieldsPresent = [firstName, lastName, username, email, password, phone, address, role].every(
            (item) => item
        );
        if (!allFieldsPresent) throw makeErrorObject('All fields required', 400);
        const emailInUse = await User.findOne({
            email: email
        });
        if (emailInUse) throw makeErrorObject('Email is already in use, try another one', 409);
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUserCreated = await User.create({
            firstName,
            lastName,
            username,
            email,
            password: encryptedPassword,
            phone,
            address,
            role
        });
        const token = jwt.sign(
            {
                _id: newUserCreated._doc._id,
                role: newUserCreated._doc.role
            },
            '3c3496e9de0640d8add7ebd968ce42f441ccfeae4f576b678afc8e25365d86c1'
            // process.env.JWT_SECRET
        );
        const { password: _password, ...passwordExcludedUserDocument } = {
            ...newUserCreated._doc
        };

        res.cookie('token', token, { httpOnly: true });
        return res.status(201).json({
            message: 'User signed up successfully',
            data: passwordExcludedUserDocument,
            success: true
        });
    } catch (error) {
        console.error('Error in signing up user');
        errorHandler(error, res);
    }
}

async function signInUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw makeErrorObject('All fields required', 400);
        const userExists = await User.findOne({
            email: email
        }).select('+password');
        if (!userExists) throw makeErrorObject('User does not exists', 404);
        const isPasswordCorrect = await bcrypt.compare(password, userExists._doc.password);
        if (!isPasswordCorrect) throw makeErrorObject('Incorrect password', 401);
        const token = jwt.sign(
            {
                _id: userExists._doc._id,
                role: userExists._doc.role
            },
            '3c3496e9de0640d8add7ebd968ce42f441ccfeae4f576b678afc8e25365d86c1'
            // process.env.JWT_SECRET
        );
        const { password: _password, ...passwordExcludedUserDocument } = { ...userExists._doc };
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
            message: 'User signed in successfully',
            data: passwordExcludedUserDocument,
            success: true
        });
    } catch (error) {
        console.error('Error in signing user');
        errorHandler(error, res);
    }
}

async function getAllUsers(req, res) {
    try {
        if (req.userData.role !== 'admin') {
            throw makeErrorObject('Only admins are allowd to access this route');
        }
        const allUsers = await User.find({ role: 'user' });
        return res.status(200).json({
            message: 'Users fetched successfully',
            data: allUsers,
            success: true
        });
    } catch (error) {
        console.error('Error in getting users data');
        errorHandler(error, res);
    }
}

async function updateUserStatus(req, res) {
    try {
        if (req.userData.role !== 'admin') {
            throw makeErrorObject('Only admins are allowd to access this route');
        }
        const { userId, status } = req.body;
        if (!userId || !status) throw makeErrorObject('All fields required', 400);
        const userExists = await User.findById(userId);
        if (!userExists) throw makeErrorObject('User does not exists', 404);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { status: status },
            { new: true, runValidators: true }
        );
        return res.status(200).json({
            message: 'User status updated successfully',
            data: updatedUser._doc,
            success: true
        });
    } catch (error) {
        console.error('Error in updating user');
        errorHandler(error, res);
    }
}

async function removeCookie(req, res) {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message: 'Cookie removed successfully',
            success: true
        });
    } catch (error) {
        console.error('Error in removing cookie');
        errorHandler(error, res);
    }
}

module.exports = {
    signUpUser,
    signInUser,
    getAllUsers,
    updateUserStatus,
    removeCookie
};
