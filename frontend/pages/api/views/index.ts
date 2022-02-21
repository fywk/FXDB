import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/firebase";
import { Error, AllTimeViews } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllTimeViews | Error>
) {
  try {
    const snapshot = await db.ref("views").once("value");
    const views = snapshot.val();

    const sumViews = (obj): number =>
      Number(Object.values(obj).reduce((a: number, b: number) => a + b));

    const cameraViews = sumViews(views.cameras);
    const lensViews = sumViews(views.lenses);
    const totalViews = cameraViews + lensViews;

    return res.status(200).json({
      views: {
        cameras: cameraViews,
        lenses: lensViews,
        total: totalViews,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
