export default function noIndexMiddleware(req, res, next) {
    res.setHeader('X-Robots-Tag', 'noindex');
    next();
  }