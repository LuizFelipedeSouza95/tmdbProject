import prismaClient from "../../prisma/index";

interface DestroyCommentRequest {
  idComment: string;
}

export class DestroyCommentsServices {
  async execute({ idComment }: DestroyCommentRequest) {
    const destroyComment = await prismaClient.comments.delete({
      where: {
        id: idComment,
      },
    });
    return destroyComment;
  }
}
