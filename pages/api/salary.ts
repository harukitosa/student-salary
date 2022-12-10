// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const salary = async (req: NextApiRequest, res: NextApiResponse) => {
  const salaryList = await prisma.job_salaries.findMany({
    take: 30,
    orderBy: [
      {
        created_at: "desc",
      },
    ],
  });
  const response = JSON.stringify(
    salaryList,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
  res.status(200).send(response);
};

export default salary;
