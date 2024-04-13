import { Router } from "express";
import { prisma } from '../provider/prisma';

const userRouter = Router();


 /**
  * Route to find all users in the system
  */
userRouter.get('/users/:id?', async (request, response) => {
    try {
        const id = request.params.id
        const users = await prisma.user.findMany({
            where: {
                id: id
            }
        });
        response.json(users);
    } catch (error) {
        response.status(500).json({ error: 'Failed to retrieve users.' });
    }
});


/**
 * Route to create a users
 */
userRouter.post('/users', async (request, response) => {
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


/**
 * Route to update a user
 */
userRouter.put('/users', async (request, response) => {
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


/**
 * Route to delete a users
 */
userRouter.delete('/users', async (request, response) => {
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