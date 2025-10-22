import 'reflect-metadata';
import { createApp } from './app.js';
import { connectToDatabase } from '@infrastructure/database/connection.js';
import { configureDependencyInjection } from '@config/container.js';
import { config } from '@config/index.js';

const startServer = async (): Promise<void> => {
  try {
    console.log('🚀 Starting Cat Breeds API...');
    configureDependencyInjection();
    await connectToDatabase();
    const app = createApp();

    const server = app.listen(config.server.port, config.server.host, () => {
      console.log(`
        🎉 Server is running successfully!
        📍 Environment: ${config.server.nodeEnv}
        🌐 Server: http://${config.server.host}:${config.server.port}
        📚 API Docs: http://${config.server.host}:${config.server.port}/api-docs
        🔍 Health Check: http://${config.server.host}:${config.server.port}/health
        Ready to accept requests! 🐱
      `);
    });

    const gracefulShutdown = (signal: string) => {
      console.log(`\n📦 Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async (err) => {
        if (err) {
          console.error('❌ Error during server shutdown:', err);
          process.exit(1);
        }

        console.log('✅ Server closed successfully');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();