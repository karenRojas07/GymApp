import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.listen(3002, () => console.log('User service corriendo en puerto 3002'));
//# sourceMappingURL=index.js.map