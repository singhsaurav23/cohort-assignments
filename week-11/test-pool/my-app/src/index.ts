import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import type { Context } from 'hono';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

// Root route
app.get('/api/v1', (c: Context) => {
	return c.text('Welcome to blog app');
});

app.post('/api/v1/signup', async (c: Context) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	console.log(body);
		const user = await prisma.user.create({
			data: {
				username: body.username,
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	
	/*catch (e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}*/
})

export default app;
