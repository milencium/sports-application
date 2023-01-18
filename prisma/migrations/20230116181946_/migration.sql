-- CreateTable
CREATE TABLE "Sports" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sports_id_key" ON "Sports"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sports_name_key" ON "Sports"("name");
