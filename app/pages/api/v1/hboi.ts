// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { filterBeroepstaken } from "../../../util/filterBeroepstaken";
import { BeroepstakenOrVaardigheden } from "../../../types/BeroepstakenOrVaardigheden";
import { getBeroepstakenOrVaardigheden } from "../../../util/getBeroepstakenOrVaardigheden";
import { Architectuurlaag } from "../../../types/Architectuurlaag";
import { Niveau } from "../../../types/Niveau";
import { Activiteit } from "../../../types/Activiteit";
import { validateBeroepstakenParams } from "../../../util/validateBeroepstakenParams";
import {getBeroepstaken} from "../../../util/getBeroepstaken";
import {BeroepsTaken} from "../../../types/HBOI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<BeroepsTaken> | { error: string }>
) {
  const { architectuurlaag, activiteit, niveau } = req.query as { architectuurlaag?: Architectuurlaag; activiteit?: Activiteit; niveau?: Niveau };

  try {
    validateBeroepstakenParams({ architectuurlaag, activiteit, niveau });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({
        error: error.message,
      });
    else
      return res.status(500).json({
        error: "Unknown error happened during validation of query params.",
      });
  }

  // const locale = req.headers["accept-language"]?.startsWith("en") ? "en" : "nl";

  // if (locale === "en")
  //   // disable english translations whilst there are none
  //   return res.status(501).json({ error: "Locale not implemented yet" });

  return res.status(200).json(
    filterBeroepstaken(await getBeroepstaken("nl"), {
      architectuurlaag,
      activiteit,
    })
  );
}
