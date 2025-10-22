import { Router } from 'express';
import breedRoutes from './breed.routes';
import authRoutes from './auth.routes';
import imageRoutes from './image.routes';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Breed:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         temperament:
 *           type: string
 *         origin:
 *           type: string
 *         lifeSpan:
 *           type: string
 *         weight:
 *           type: object
 *           properties:
 *             imperial:
 *               type: string
 *             metric:
 *               type: string
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         url:
 *           type: string
 *         width:
 *           type: integer
 *         height:
 *           type: integer
 *         breeds:
 *           type: array
 *           items:
 *             type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         isActive:
 *           type: boolean
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         message:
 *           type: string
 *         details:
 *           type: object
 */

// API Routes
router.use('/breeds', breedRoutes);
router.use('/auth', authRoutes);
router.use('/images', imageRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Cat Breeds API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default router;