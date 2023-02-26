-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "public_address" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_address_key" ON "users"("public_address");
