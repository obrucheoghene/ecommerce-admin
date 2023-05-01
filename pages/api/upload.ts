import { NextApiRequest, NextApiResponse } from 'next';
import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';

const bucketName = 'ecommerce-image-store';
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_SECRET_KEY as string,
      },
    });

    let links: string[] = [];

    console.log(files.images);
    for (const image of files.images) {
      const ext = image.originalFilename.split('.').pop();
      const newFileName = Date.now() + '.' + ext;
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFileName,
          Body: fs.readFileSync(image.path),
          ACL: 'public-read',
          ContentType: mime.lookup(image.path) as string,
        })
      );
      const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
      links.push(link);
    }

    res.json(links);
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
