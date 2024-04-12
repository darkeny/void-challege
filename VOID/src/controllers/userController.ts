import { Router } from "express";
import { prisma } from '../database/prisma';

const userRouter = Router();

// Route to find all users in the system
userRouter.get('/allUsers', async (request, response) => {
    try {
        const users = await prisma.user.findMany();
        response.json(users);
    } catch (error) {
        response.status(500).json({ error: 'Failed to retrieve users.' });
    }
});

// Route to create a user
userRouter.post('/createUser', async (request, response) => {
    try {
        const { name, email } = request.body;
        const user = await prisma.user.create({
            data: { name, email }
        });
        response.json({
            message: "User Created",
            payload: user
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to create user.' });
    }
});

// Route to update a user
userRouter.put('/updateUser', async (request, response) => {
    try {
        const { email, name} = request.body;
        const user = await prisma.user.update({
            where: { email: email },
            data: { name: name }
        });
        response.json({
            message: "User Updated",
            payload: user
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to update user.' });
    }
});

// Route to delete a user
userRouter.delete('/deleteUser', async (request, response) => {
    try {
        const { email } = request.body;
        const user = await prisma.user.delete({
            where: { email: email }
        });
        response.json({
            message: "User Deleted",
            payload: user
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to delete user.' });
    }
});

export { userRouter };