import { Request, Response } from "express";
import { CreateCommentsServices } from "../../services/comments/CreateCommentsServices";

export class CreateCommentsController {
  async handle(req: Request, res: Response) {
    try {
      const { idMovie, name, comment } = req.body;

      if (!idMovie || !name || !comment) {
        return res.status(400).json({ error: "Missing mandatory data" });
      }

      const createCommentsServices = new CreateCommentsServices();

      const comments = await createCommentsServices.execute({
        idMovie,
        name,
        comment,
      });

      return res.status(201).json(comments);
    } catch (error) {
      return res.status(404).json("insertion error!");
    }
  }
}
