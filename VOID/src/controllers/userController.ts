import { Router } from "express";
import { prisma } from '../provider/prisma';

const userRouter = Router();


 /**
  * Route to find all users or that matches specified id
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
 * Route to find all posts of the specified user
 */

userRouter.get('/users/posts/:userId', async (request, response) => {
    try {
        const { userId } = request.params
        const posts = await prisma.posts.findMany({
            where: {
                userId: userId
            }
        });
        response.status(201).json(posts)
    } catch (error) {
        response.status(500).json({ error: 'Failed to retrieve posts.' });
    }
})

/**
 * Route to create a users
 */


userRouter.post('/users', async (request, response) => {

    const { name, email } = request.body;

    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists) {
        return response.status(400).json({ error: 'User already exists for this email: ' + email });
    }

    try {
        
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
 * Route to update a user that matches specified id
 */
userRouter.put('/users/:userId', async (request, response) => {
    try {
        const { userId } = request.params;
        const { name, email } = request.body;
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: name,
                email: email
            }
        })
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
userRouter.delete('/users/:userId', async (request, response) => {
    try {
        const userId = request.params.userId;
        const user = await prisma.user.delete({
            where: {
                id: userId
             }
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