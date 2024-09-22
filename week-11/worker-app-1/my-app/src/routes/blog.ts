import { Hono } from 'hono';
import type { Context } from 'hono';
import { PrismaClient, Prisma } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import authMiddleware from './middleware'
import { createPostInput, updatePostInput } from '@srv_s29/medium-common'

const router = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: Number
    }
}>()

router.post('/', authMiddleware, async (c: Context) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();

        const { success } = createPostInput.safeParse(body);
        if (!success) { c.status(411); return c.json({ message: 'Invalid input' }) }

        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                body: body.body,
                userId: c.get('userId')
            }
        })
        return c.json({
            id: blog.id
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            // P2025 is the error code for "Record to update not found."
            return c.json({ error: 'Blog post not found' }, 404);
        } else {
            // Handle other errors
            return c.json({ error: 'Internal Server Error' }, 500);
        }
    }
})


//Todo: pagination -> sent first 10 not all if asks for extra then get next page size
router.get('/bulk', async (c: Context) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());


        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                body: true,
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return c.json({
            blogs
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            // P2025 is the error code for "Record to update not found."
            return c.json({ error: 'Blog post not found' }, 404);
        } else {
            // Handle other errors
            return c.json({ error: 'Internal Server Error' }, 500);
        }
    }
})





router.put('/', authMiddleware, async (c: Context) => {
    try {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    
        const body = await c.req.json();

        const { success } = updatePostInput.safeParse(body);
        if (!success) { c.status(411); return c.json({ message: 'Invalid input' }) }

        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                body: body.body,
            }
        });

        return c.json({
            id: blog.id
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            // P2025 is the error code for "Record to update not found."
            return c.json({ error: 'Blog post not found' }, 404);
        } else {
            // Handle other errors
            return c.json({ error: 'Internal Server Error' }, 500);
        }
    }
})

router.get('/article/:id', async (c: Context) => {
    try {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());


        const id = parseInt(await c.req.param('id'), 10);

        const blog = await prisma.blog.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                body: true,
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return c.json({
            blog
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            // P2025 is the error code for "Record to update not found."
            return c.json({ error: 'Blog post not found' }, 404);
        } else {
            // Handle other errors
            return c.json({ error: 'Internal Server Error' }, 500);
        }
    }
})



export default router