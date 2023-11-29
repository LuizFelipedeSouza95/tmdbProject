import { Request, Response } from "express";
import { SearchAllCommentsServices } from "../../services/comments/SearchAllCommentsServices";

export class SearchAllCommentsController {
  async handle(req: Request, res: Response) {
    const searchAllCommentsServices = new SearchAllCommentsServices();
    const comment = await searchAllCommentsServices.execute();

    if (!comment)
      return res.status(500).json({ error: "Internal server error" });

    return comment.length > 0
      ? res.status(200).json(comment)
      : res.status(204).send();
  }
}
