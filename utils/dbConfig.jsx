import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const sql = neon('postgresql://budget-tracker_owner:R40YpLvdKmHS@ep-empty-cloud-a54f1oe1.us-east-2.aws.neon.tech/budget-tracker?sslmode=require');
export const db = drizzle(sql,{schema});