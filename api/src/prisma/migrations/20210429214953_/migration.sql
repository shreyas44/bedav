-- CreateEnum
CREATE TYPE "Category" AS ENUM ('icu', 'hdu', 'oxygen', 'general', 'ventilator');

-- CreateEnum
CREATE TYPE "HospitalType" AS ENUM ('gov', 'pri', 'dchc', 'dch', 'ccc');

-- CreateEnum
CREATE TYPE "StateAbbreviation" AS ENUM ('AN', 'AP', 'AR', 'AS', 'BR', 'CG', 'CH', 'DN', 'DD', 'DL', 'GA', 'GJ', 'HR', 'HP', 'JK', 'JH', 'KA', 'KL', 'LA', 'LD', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OR', 'PY', 'PB', 'RJ', 'SK', 'TN', 'TS', 'TR', 'UP', 'UK', 'WB');

-- CreateTable
CREATE TABLE "States" (
    "id" "StateAbbreviation" NOT NULL,
    "name" TEXT NOT NULL,
    "lastUpdated" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" "StateAbbreviation" NOT NULL,
    "lastUpdated" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospitals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "address" TEXT,
    "placeId" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "locationId" TEXT NOT NULL,
    "lastUpdated" INTEGER NOT NULL,
    "category" "HospitalType",

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailabilityUpdates" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "available" INTEGER NOT NULL,
    "occupied" INTEGER,
    "total" INTEGER,
    "timestamp" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LatestAvailabilityUpdates" (
    "id" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "available" INTEGER NOT NULL,
    "occupied" INTEGER,
    "total" INTEGER,
    "timestamp" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "States.name_unique" ON "States"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Locations.name_stateId_unique" ON "Locations"("name", "stateId");

-- CreateIndex
CREATE UNIQUE INDEX "Hospitals.name_locationId_unique" ON "Hospitals"("name", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "LatestAvailabilityUpdates.hospitalId_category_unique" ON "LatestAvailabilityUpdates"("hospitalId", "category");

-- AddForeignKey
ALTER TABLE "Locations" ADD FOREIGN KEY ("stateId") REFERENCES "States"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospitals" ADD FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailabilityUpdates" ADD FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LatestAvailabilityUpdates" ADD FOREIGN KEY ("hospitalId") REFERENCES "Hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
