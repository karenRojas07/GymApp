import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });
        res.status(201).json({
            message: 'Usuario registrado',
            user: { id: user.id, email: user.email },
        });
    }
    catch {
        res.status(400).json({ error: 'Error al registrar usuario' });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET no está definido' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
};
export const profile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'No autenticado' });
    }
    const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
    });
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
};
export const logout = (req, res) => {
    res.json({ message: 'Sesión cerrada' });
};
//# sourceMappingURL=authController.js.map