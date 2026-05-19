import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import env from "@/env";
import { getAllSeasonData, getSeasonData } from "@/services/getSeasonData";
import { seasonSchema } from "@/types";

const router = new Hono();

router.get("/", serveStatic({ path: `${env.UI_FOLDER_PATH}/index.html` }));
router.get("/favicon.ico", serveStatic({ path: `${env.UI_FOLDER_PATH}/favicon.ico` }));
router.get("/assets/*", serveStatic({ root: env.UI_FOLDER_PATH }));

router.get("/api/seasons", async (context) => {
  const seasonData = await getAllSeasonData();
  return context.json(seasonData);
});

router.get("/api/seasons/:season", async (context) => {
  const seasonResult = seasonSchema.safeParse(context.req.param("season"));
  if (!seasonResult.success) {
    return context.json({ error: "Invalid season" }, 400);
  }

  const data = await getSeasonData(seasonResult.data);
  if (!data) {
    return context.json({ error: "Season data not found" }, 404);
  }

  return context.json(data);
});

router.get("/*", serveStatic({ path: `${env.UI_FOLDER_PATH}/index.html` }));

export default router;
