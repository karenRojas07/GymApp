import jwt from 'jsonwebtoken';
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Token requerido' });
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET no está definido en el entorno' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        res.status(403).json({ error: 'Token inválido' });
    }
};
//# sourceMappingURL=auth.js.map