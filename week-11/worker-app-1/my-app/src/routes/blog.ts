import { Hono } from 'hono';
import type { Context } from 'hono';
import { PrismaClient, Prisma } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import authMiddleware from './middleware'

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
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

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
})


//Todo: pagination -> sent first 10 not all if asks for extra then get next page size
router.get('/bulk', async (c: Context) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

   
    const blogs = await prisma.blog.findMany();
   
    return c.json({
        blogs
    });

})





router.put('/', authMiddleware, async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

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

router.get('/:id', async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = parseInt(await c.req.param('id'), 10);

        const blog = await prisma.blog.findUnique({
            where: {
                id
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