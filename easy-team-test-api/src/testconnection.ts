import { createConnection } from 'typeorm';

async function testConnection() {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.ENV !== 'PRODUCTION',
    });
    console.log('Database connection successful!');
    await connection.close();
  } catch (error) {
    console.error('Database connection failed', error);
  }
}

testConnection();
