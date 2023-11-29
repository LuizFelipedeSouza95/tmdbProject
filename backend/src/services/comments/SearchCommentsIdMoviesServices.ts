import prismaClient from "../../prisma/index";

interface SearchCommentsIdMoviesRequest {
  idMovie: number;
}

export class SearchCommentsIdMoviesServices {
  async execute({ idMovie }: SearchCommentsIdMoviesRequest) {
    const comment = await prismaClient.comments.findMany({
      where: {
        idMovie: idMovie,
      },
    });

    return comment;
  }
}
