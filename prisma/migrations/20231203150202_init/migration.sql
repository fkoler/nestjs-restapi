-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Vocal', 'Guitar', 'Drums', 'Keyboards', 'Bass');

-- CreateTable
CREATE TABLE "Empoyee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instrument" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empoyee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empoyee_name_key" ON "Empoyee"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Empoyee_email_key" ON "Empoyee"("email");
