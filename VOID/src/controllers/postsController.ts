import { Router } from "express";
import { prisma } from '../database/prisma';

const postsRouter = Router();

// Route to find all posts in the system
postsRouter.get('/posts', async (request, response) => {
    try {
        const post = await prisma.posts.findMany();
    response.json(post);
    } catch (error) {
        response.status(500).json({ error: 'Failed to retrieve post.' });
    }
});

// Route to create a post
postsRouter.post('/posts', async (request, response) => {
    try {
        const { title, content, published, userId } = request.body;
        
        // Verificar se o usuário existe
        const userExists = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!userExists) {
            return response.status(404).json({ error: 'User not found.' });
        }
        const existingPost = await prisma.posts.findFirst({
            where:{
                userId: userId,
                title: title,
            }
        });

        if (existingPost){
            return response.status(400).json({ error: 'Post already exists for this user.'})
        }

        
        const post = await prisma.posts.create({
            data: {
                title,
                content,
                published,
                User: { connect: { id: userId } }
            }
        });
        response.json({
            message: "Post Created",
            payload: post
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to create post.'});
        console.log(error);
        
    }
});

// Route to update a post
postsRouter.put('/posts', async (request, response) => {
    try {
        const { title, content, userId } = request.body;
        const post = await prisma.posts.update({
            where: { title_userId: {title, userId} },
            data: { content: content }
        });
        response.json({
            message: "Post Updated",
            payload: post
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to update post.' });
    }
});

// Route to delete a delete
postsRouter.delete('/posts', async (request, response) => {
    try {
        const { title, userId} = request.body;
        const post = await prisma.posts.delete({
            where: { title_userId: {title, userId}}
        });
        response.json({
            message: "Post Deleted",
            payload: post
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to delete post.' });
        console.log(error);
        
    }
});

export { postsRouter };