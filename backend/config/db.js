import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MondoDB conectado en: ${url}`);

  } catch (err) {
    console.log(`Error: ${err.message}`);
    console.log('Ale')
    process.exit(1);
  }
}

export default conectarDB;
