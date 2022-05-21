// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const hello = async (req: NextApiRequest, res: NextApiResponse) => {
  const r = await prisma.job_salaries.findMany();
  const response = JSON.stringify(
    r,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
  )
  res.status(200).send(response);
};

export default hello;
