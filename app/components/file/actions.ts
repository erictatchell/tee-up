"use server"

/**
 * The AWS S3 Interactions File -- actions.ts --
 * 
 * @author erictatchell
 */

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { prisma } from "@/prisma"

const s3Client = new S3Client({
    //useAccelerateEndpoint: true,
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

const maxFileSize = 104857600 // 100 MB

type SignedURLSuccess = { url: string; id: string };
type SignedURLResponse =
    | { failure?: undefined; success: SignedURLSuccess }
    | { failure: string; success?: undefined };

type GetSignedURLParams = {
    fileType: string;
    fileSize: number;
    key: string;
    userId: string;
};

/**
 * Generate a pre-signed S3 upload URL for a user's profile photo
 */
export const getSignedURL = async ({
    fileType,
    fileSize,
    key,
    userId,
}: GetSignedURLParams): Promise<SignedURLResponse> => {
    if (fileSize > maxFileSize) {
        return { failure: "File size too large" }
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        ContentType: fileType,
        ContentLength: fileSize,
    })

    const url = await getSignedUrl(
        s3Client,
        putObjectCommand,
        { expiresIn: 60 } // 60 seconds
    )

    return { success: { url, id: userId } }
}

/**
 * Extract S3 key from a full URL
 */
const getKey = (url: string) => {
    const parts = url.split('/');
    let fileNameWithExtension = parts[parts.length - 1];
    fileNameWithExtension = fileNameWithExtension.replace(/"$/, '');
    return fileNameWithExtension;
}

/**
 * Delete user's profile photo from S3 and clear DB reference
 */
export const deleteObject = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user || !user.profilePhoto) return;

    const key = getKey(user.profilePhoto);

    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
    });

    try {
        await s3Client.send(command);
        await prisma.user.update({
            where: { id: userId },
            data: { profilePhoto: null }
        });
    } catch (err) {
        console.error("Error deleting S3 object:", err);
    }
}

export const addToDB = async (userId: string, objectUrl: string) => {
    console.log(userId)

    const update = await prisma.user.update({
        where: { id: userId },
        data: { profilePhoto: objectUrl}
    })
    console.log(update)
};


export const deleteFromDB = async () => {
    throw new Error("Not implemented. Use deleteObject to remove profilePhoto.");
};
