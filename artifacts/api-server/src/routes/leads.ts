import { Router, type IRouter } from "express";
import { db, leadsTable, insertLeadSchema } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const validatedInsert = insertLeadSchema.safeParse(parsed.data);
  if (!validatedInsert.success) {
    res.status(400).json({ error: validatedInsert.error.message });
    return;
  }

  try {
    const [lead] = await db.insert(leadsTable).values(validatedInsert.data).returning({ id: leadsTable.id });
    res.status(201).json({ id: lead.id, message: "Thank you — we will be in touch shortly." });
  } catch (err) {
    req.log.error({ err }, "Failed to insert lead");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
