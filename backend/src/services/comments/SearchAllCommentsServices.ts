import prismaClient from "../../prisma/index";

export class SearchAllCommentsServices {
  async execute() {
    const comment = await prismaClient.comments.findMany({
      select: {
        id: true,
        name: true,
        comment: true,
        idMovie: true,
      },
    });
    return comment;
  }
}
