
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      // url: process.env.NEXT_PUBLIC_DATABASE_URL
      url: 'postgresql://budget-tracker_owner:R40YpLvdKmHS@ep-empty-cloud-a54f1oe1.us-east-2.aws.neon.tech/budget-tracker?sslmode=require'
    }
  };