
import { NextApiRequest, NextApiResponse } from 'next';

export default function noIndexMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    res.setHeader('X-Robots-Tag', 'noindex');
    next();
}