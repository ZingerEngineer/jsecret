import mongoose from 'mongoose'

export async function connect() {
  const dbURL = process.env.MONGODB_URL_SECRET

  if (!dbURL) {
    throw new Error('DB URL is not provided')
  }

  try {
    await mongoose.connect(dbURL)

    console.log('Connected to the database')
  } catch (error) {
    console.error(
      'Error connecting to the database. Exiting the process',
      error
    )
  }
}
