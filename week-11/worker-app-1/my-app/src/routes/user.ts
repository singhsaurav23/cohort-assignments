import { Hono } from 'hono';
import type { Context } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { hashPassword } from './utils';


const router = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:   string
    }
}>()




router.post('/signup', async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

  const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            username: body.username
        }
    });

    if (user) {
        c.status(403);
        return c.json({ error: "user already exist" });
    }

    const hashedPassword = await hashPassword(body.password);

    const userObj = await prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            password: hashedPassword,

        }
    });

    const token = await sign({ id: userObj.id }, c.env.JWT_SECRET);

    return c.json({
        jwt: token
    })
})

router.post('/signin', async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL, // if env exist then access database_url , won't throw an error
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "User not found" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
        jwt: token
    })
})

export default router