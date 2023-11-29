import prismaClient from "../../prisma/index";

interface CommentRequest {
  idMovie: number;
  name: string;
  comment: string;
}

export class CreateCommentsServices {
  async execute({ comment, idMovie, name }: CommentRequest) {
    const createComments = await prismaClient.comments.create({
      data: {
        idMovie,
        name,
        comment,
      },
      select: {
        id: true,
        idMovie: true,
        name: true,
        comment: true,
      },
    });

    return createComments;
  }
}
