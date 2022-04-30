import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/firebase";
import { Analytics, ErrorMessage } from "../../../lib/types";
import getTotalViews from "../../../lib/utils/getTotalViews";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Analytics | ErrorMessage>
) {
  try {
    const snapshot = await db.ref("views").once("value");
    const views = snapshot.val();

    const camerasViews = getTotalViews(views.cameras);
    const lensesViews = getTotalViews(views.lenses);
    const totalViews = camerasViews + lensesViews;

    return res.status(200).json({
      total: totalViews,
      cameras: camerasViews,
      lenses: lensesViews,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
