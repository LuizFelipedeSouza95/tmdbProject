import { Request, Response } from "express";
import { DestroyCommentsServices } from "../../services/comments/DestroyCommentsServices";

export class DestroyCommentsController {
  async handle(req: Request, res: Response) {
    const idComment = req.query.idComment as string;

    if (!idComment || idComment === "")
      return res.status(400).json("Id comment is required");

    const destroyCommentsServices = new DestroyCommentsServices();

    const comment = await destroyCommentsServices.execute({
      idComment,
    });

    if (!comment)
      return res.status(500).json({ error: "Internal server error" });

    return res.status(200).send(comment);
  }
}
