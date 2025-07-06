import sql from 'mssql';

const config: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
  },
};

let pool: sql.ConnectionPool | null = null;

export async function connectToDatabase(): Promise<sql.ConnectionPool> {
  try {
    if (pool) {
      return pool;
    }
    
    pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('Database connection closed');
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}

export { sql };
