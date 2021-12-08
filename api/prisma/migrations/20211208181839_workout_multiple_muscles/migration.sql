/*
  Warnings:

  - You are about to drop the column `muscleId` on the `Workout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_muscleId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "muscleId";

-- CreateTable
CREATE TABLE "_MuscleToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MuscleToWorkout_AB_unique" ON "_MuscleToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_MuscleToWorkout_B_index" ON "_MuscleToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_MuscleToWorkout" ADD FOREIGN KEY ("A") REFERENCES "Muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MuscleToWorkout" ADD FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
