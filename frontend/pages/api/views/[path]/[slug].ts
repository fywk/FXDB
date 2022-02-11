import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/firebase";
import { Error, Views } from "../../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Views | Error>
) {
  try {
    const path = req.query.path.toString();
    const slug = req.query.slug.toString();

    // Increase total views by one
    if (req.method === "POST") {
      const ref = db.ref("views").child(path).child(slug);
      const { snapshot } = await ref.transaction((currentViews: number) => {
        if (currentViews === null) {
          return 1;
        }
        return currentViews + 1;
      });

      return res.status(200).json({
        total: snapshot.val(),
      });
    }

    // Get total number of views
    if (req.method === "GET") {
      const snapshot = await db
        .ref("views")
        .child(path)
        .child(slug)
        .once("value");
      const views = snapshot.val();

      return res.status(200).json({ total: views });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
