import { Hono } from 'hono';
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono();

const corsOptions = {
    origin: 'http://localhost:5173',  // Replace with your React frontend URL
    credentials: true,  // If your React app uses cookies or other credentials
};

app.use('/*', cors(corsOptions))
// Use /api/v1/user/* for user routes
app.route('/api/v1/user', userRouter);

// Use /api/v1/blog/* for blog routes
app.route('/api/v1/blog', blogRouter);

// Root route
app.get('/api/v1', (c: any) => {
    return c.text('Welcome to blog app');
});

export default app;