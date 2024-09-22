import { Hono } from 'hono';
import type { Context } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { hashPassword } from './utils';
import { signupInput } from '@srv_s29/medium-common'
import { signinInput } from '@srv_s29/medium-common'

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
    const { success } = signupInput.safeParse(body);
    if (!success) { c.status(411); return c.json({ message: 'Invalid input' }) }
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

    try {

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

    } catch (error) {
        return c.json({
            message: "Internal Server Error"
        })
    }
})

router.post('/signin', async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL, // if env exist then access database_url , won't throw an error
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if (!success) { c.status(411); return c.json({ message: 'Invalid input' }) }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "User not found" });
    }

    const hashedPassword = await hashPassword(body.password);

    if (user.password != hashedPassword) {
        c.status(403);
        return c.json({ error: "Incorrect Password" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
        jwt: token
    })
})

export default router