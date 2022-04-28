import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/firebase";
import { ErrorMessage } from "../../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorMessage>
) {
  try {
    const path = String(req.query.path);
    const snapshot = await db.ref("views").child(path).once("value");
    const views = Object.fromEntries(
      Object.entries(snapshot.val())
        .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
        .slice(0, 5)
    );

    return res.status(200).json({ views });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
