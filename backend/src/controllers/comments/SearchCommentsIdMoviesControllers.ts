import { Request, Response } from "express";
import { SearchCommentsIdMoviesServices } from "../../services/comments/SearchCommentsIdMoviesServices";

export class SearchCommentsIdMoviesControllers {
  async handle(req: Request, res: Response) {
    const idMovie = parseInt(req.query.idMovie as string);

    if (!idMovie) return res.status(400).json("Id movie is required");

    const searchCommentsIdMoviesServices = new SearchCommentsIdMoviesServices();
    const comment = await searchCommentsIdMoviesServices.execute({ idMovie });

    if (!comment || comment.length === 0)
      return res.status(404).json("Selected coment does not exist");

    return res.status(200).json(comment);
  }
}
