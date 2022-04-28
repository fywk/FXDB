import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../lib/firebase";
import { ErrorMessage, Views } from "../../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Views | ErrorMessage>
) {
  try {
    const path = String(req.query.path);
    const slug = String(req.query.slug);

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
        views: snapshot.val(),
      });
    }

    // Get total number of views
    if (req.method === "GET") {
      const snapshot = await db
        .ref("views")
        .child(path)
        .child(slug)
        .once("value");
      const total = snapshot.val();

      return res.status(200).json({ views: total });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
