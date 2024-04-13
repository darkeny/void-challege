import { Router } from "express";
import { prisma } from '../provider/prisma';

const postsRouter = Router();

/**
 * Route to find all posts 
 */
postsRouter.get('/posts/:userId?', async (request, response) => {
    try {
        const userId = request.params.userId
        const post = await prisma.posts.findMany({
            where: {
                userId: userId
            }
        });
        response.json(post);
    } catch (error) {
        response.status(500).json({ error: 'Failed to retrieve post.' });
    }
});



/**
 * Route to create a post
 */
postsRouter.post('/posts', async (request, response) => {
    try {

        if (Array.isArray(request.body)) {
            for (const post of request.body) {
                if (post.category !== 'BUSINESS' && post.category !== 'EDUCATION' && post.category !== 'SPORTS') {
                    return response.status(400).json({ message: 'Invalid Category' })
                }    
            }
            const count = await prisma.posts.createMany({
                skipDuplicates: true,
                data: request.body.map(({ title, content, published, category, userId }) => {
                    return { title, content, published, category, userId }
                })
            })

            response.status(201).json({count})
        }

        else {
            // Verificar se o usuário existe
            const { title, content, published, category, userId } = request.body;

            if (category !== 'BUSINESS' && category !== 'EDUCATION' && category !== 'SPORTS') {
                return response.status(400).json({ message: 'Invalid Category' })
            }
            const userExists = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!userExists) {
                return response.status(404).json({ error: 'User not found.' });
            }
            const existingPost = await prisma.posts.findUnique({
                where: {
                    title_userId: { userId, title },
                }
            });

            if (existingPost) {
                return response.status(400).json({ error: 'Post already exists for this user.' })
            }


            const post = await prisma.posts.create({
                data: {
                    title,
                    content,
                    published,
                    category,
                    User: { connect: { id: userId } }
                }
            });
            response.json({
                message: "Post Created",
                payload: post
            });
        }

    } catch (error: any) {
        response.status(500).json({ error: 'Failed to create post.'  });

    }
});


/**
 * Route to update a post
 */
postsRouter.put('/posts', async (request, response) => {
    try {
        const { title, content, userId } = request.body;
        const post = await prisma.posts.update({
            where: { title_userId: { title, userId } },
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



/**
 * Route to delete a delete
 */
postsRouter.delete('/posts', async (request, response) => {
    try {
        const { title, userId } = request.body;
        const post = await prisma.posts.delete({
            where: { title_userId: { title, userId } }
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