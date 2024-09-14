import type { Context, MiddlewareHandler } from 'hono';
import { verify } from 'hono/jwt';

const authMiddleware: MiddlewareHandler = async (c: Context, next: () => Promise<void>) => {
    const authheader = c.req.header('Authorization');

    if (!authheader || !authheader.startsWith('Bearer ')) {
        return c.text('You don\'t have access');
    }

    const token = authheader.split(' ')[1];

    try {
        const decode = await verify(token, c.env.JWT_SECRET);
        if (decode.id) {
            c.set('userId', decode.id);
          //  console.log(c.get('userId'))
           // await processUser(c);  // Passing `c` to the function
            await next();
        } else {
          c.status(403)
           return c.json({});
        }
    } catch (err) {
        c.status(403)
        return c.json({});
    }
};

export default authMiddleware;