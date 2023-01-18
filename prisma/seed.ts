import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const footballAndClasses = await prisma.sports.upsert({
    where: { name: 'Football' },
    update: {},
    create: {
      name: 'Football',
      Class: {
        createMany: {
          data: [
            {
              name: 'MorningClassForFootball-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForFootball-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForFootball-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForFootball-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '5-9',
            },
            {
              name: 'AfternoonClassForFootball-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForFootball-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForFootball-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForFootball-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '16-21',
            },
          ],
        },
      },
    },
  });
  const fitnessAndClasses = await prisma.sports.upsert({
    where: { name: 'Fitness' },
    update: {},
    create: {
      name: 'Fitness',
      Class: {
        createMany: {
          data: [
            {
              name: 'MorningClassForFitness-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForFitness-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForFitness-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForFitness-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '5-9',
            },
            {
              name: 'AfternoonClassForFitness-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForFitness-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForFitness-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForFitness-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '16-21',
            },
          ],
        },
      },
    },
  });

  const cyclingAndClasses = await prisma.sports.upsert({
    where: { name: 'Cycling' },
    update: {},
    create: {
      name: 'Cycling',
      Class: {
        createMany: {
          data: [
            {
              name: 'MorningClassForCycling-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForCycling-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForCycling-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForCycling-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '5-9',
            },
            {
              name: 'AfternoonClassForCycling-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForCycling-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForCycling-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForCycling-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '16-21',
            },
          ],
        },
      },
    },
  });
  const runningAndClasses = await prisma.sports.upsert({
    where: { name: 'Running' },
    update: {},
    create: {
      name: 'Running',
      Class: {
        createMany: {
          data: [
            {
              name: 'MorningClassForRunning-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForRunning-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForRunning-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForRunning-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '5-9',
            },
            {
              name: 'AfternoonClassForRunning-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForRunning-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForRunning-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForRunning-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '16-21',
            },
          ],
        },
      },
    },
  });

  const boxingAndClasses = await prisma.sports.upsert({
    where: { name: 'Boxing' },
    update: {},
    create: {
      name: 'Boxing',
      Class: {
        createMany: {
          data: [
            {
              name: 'MorningClassForBoxing-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForBoxing-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForBoxing-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '5-9',
            },
            {
              name: 'MorningClassForBoxing-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '5-9',
            },
            {
              name: 'AfternoonClassForBoxing-Children',
              category: 'children',
              description: 'Children Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForBoxing-Youth',
              category: 'youth',
              description: 'Youth Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForBoxing-YoungAdults',
              category: 'youngAdults',
              description: 'YoungAdults Classes',
              termin: '16-21',
            },
            {
              name: 'AfternoonClassForBoxing-Adults',
              category: 'adults',
              description: 'Adults Classes',
              termin: '16-21',
            },
          ],
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
