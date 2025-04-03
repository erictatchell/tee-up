import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
 import { S3Client } from '@aws-sdk/client-s3'
 import { v4 as uuidv4 } from 'uuid'
 
 export async function POST(request: Request) {
     const { filename, contentType } = await request.json()
 
     try {
         const client = new S3Client({
             region: process.env.AWS_REGION!,
             credentials: {
                 accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
             },
             //useAccelerateEndpoint: true,
         })
         
         const { url, fields } = await createPresignedPost(client, {
             Bucket: process.env.AWS_BUCKET as string,
             Key: uuidv4().substring(0, 7) + "_" + filename,
             Conditions: [
                 ['content-length-range', 0, 1048576000], // up to 10 MB
                 ['starts-with', '$Content-Type', contentType],
             ],
             Fields: {
                 acl: 'public-read',
                 'Content-Type': contentType,
             },
             Expires: 600, // 10 minutes
         })
 
         return new Response(JSON.stringify({ url, fields }), { status: 200 })
     } catch (error: any) {
         return new Response(JSON.stringify({ error: error.message }), { status: 500 })
     }
 }