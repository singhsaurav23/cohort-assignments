import { Hono } from 'hono';
import userRouter from './routes/user';
import blogRouter from './routes/blog';

const app = new Hono();

// Use /api/v1/user/* for user routes
app.route('/api/v1/user', userRouter);

// Use /api/v1/blog/* for blog routes
app.route('/api/v1/blog', blogRouter);

// Root route
app.get('/api/v1', (c: any) => {
    return c.text('Welcome to blog app');
});

export default app;