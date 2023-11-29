-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "idMovie" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "coment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);
