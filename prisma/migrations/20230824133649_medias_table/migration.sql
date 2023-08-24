-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- -- CreateIndex
-- CREATE UNIQUE INDEX "medias_username_key" ON "medias"("username");
