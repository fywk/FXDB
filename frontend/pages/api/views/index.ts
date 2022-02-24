import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/firebase";
import { AllTimeViews, Error } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllTimeViews | Error>
) {
  try {
    const snapshot = await db.ref("views").once("value");
    const views = snapshot.val();

    const sumViews = (obj): number =>
      Number(Object.values(obj).reduce((a: number, b: number) => a + b));

    const camerasViews = sumViews(views.cameras);
    const lensesViews = sumViews(views.lenses);
    const allTimeViews = camerasViews + lensesViews;

    // Cache is fresh for 900 seconds (15 minutes), but still can be used for 300 seconds (5 minutes) more
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=900, stale-while-revalidate=300"
    );

    return res.status(200).json({
      views: {
        allTime: allTimeViews,
        cameras: camerasViews,
        lenses: lensesViews,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
