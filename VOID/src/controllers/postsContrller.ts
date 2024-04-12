import { Router } from "express";
import { prisma } from '../database/prisma';

const postsRouter = Router();

// Route to find all posts in the system
postsRouter.get('/allPosts', async (request, response) => {
    try {
        const post = await prisma.posts.findMany();
    response.json(post);
    } catch (error) {
        response.status(500).json({ error: 'Failed to retrieve post.' });
    }
});

// Route to create a post
postsRouter.post('/createPost', async (request, response) => {
    try {
        const { title, content, published, userId } = request.body;
        const posts = await prisma.posts.create({
            data: { title, content, published, userId}
        });
        response.json({
            message: "Post Created",
            payload: posts
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to create post.' });
    }
});

// Route to update a post
postsRouter.put('/updatePosts', async (request, response) => {
    try {
        const { title, content } = request.body;
        const post = await prisma.posts.update({
            where: { title: title },
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
postsRouter.delete('/deletePosts', async (request, response) => {
    try {
        const { title } = request.body;
        const post = await prisma.posts.delete({
            where: { title: title }
        });
        response.json({
            message: "Post Deleted",
            payload: post
        });
    } catch (error) {
        response.status(500).json({ error: 'Failed to delete post.' });
    }
});

export { postsRouter };