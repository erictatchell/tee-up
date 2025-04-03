// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const LOWER_MAINLAND_CITIES = [
  "Vancouver",
  "Surrey",
  "Burnaby",
  "Richmond",
  "Coquitlam",
  "Langley",
  "New Westminster",
  "Delta",
  "Abbotsford",
];

const MUSIC_PREFERENCES = [0, 1, 2, 3, 4, 5];
const TIME_OPTIONS = [0, 1, 2];
const WEATHER_OPTIONS = [0, 1, 2];
const PACE_OPTIONS = [0, 1, 2];
const CONVO_OPTIONS = [0, 1, 2];

async function main() {
  for (let i = 0; i < 50; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email({ firstName: name });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        handicap: parseFloat(faker.number.float({ min: 0, max: 36 }).toFixed(1)),
        age: faker.number.int({ min: 18, max: 65 }),
        gender: faker.number.int({ min: 0, max: 3 }),
        country: "Canada",
        province: "British Columbia",
        city: (faker.helpers as any).arrayElement(LOWER_MAINLAND_CITIES),
        preferenceSet: {
          create: {
            distanceRange: faker.number.int({ min: 50, max: 200 }),
            preferredCourses: (faker.helpers as any).arrayElements(
              ["Morgan Creek", "Mayfair Lakes", "Northview", "Fraserview", "Redwoods", "Pagoda Ridge", "Kings Links"],
              faker.number.int({ min: 1, max: 3 })
            ),
            similarAge: faker.datatype.boolean(),
            sameGender: faker.datatype.boolean(),
            playWithSimilarHandicap: faker.datatype.boolean(),
            teeBoxes: faker.number.int({ min: 0, max: 3 }),
            cart: faker.number.int({ min: 0, max: 2 }),
            timeOfDay: (faker.helpers as any).arrayElements(TIME_OPTIONS, faker.number.int({ min: 1, max: 3 })),
            weatherPreference: (faker.helpers as any).arrayElements(WEATHER_OPTIONS, faker.number.int({ min: 1, max: 3 })),
            paceOfPlay: (faker.helpers as any).arrayElements(PACE_OPTIONS, faker.number.int({ min: 1, max: 3 })),
            conversationLevel: (faker.helpers as any).arrayElements(CONVO_OPTIONS, faker.number.int({ min: 1, max: 3 })),
            drinking: faker.datatype.boolean(),
            okayWithPartnerDrinking: faker.datatype.boolean(),
            smoking: faker.datatype.boolean(),
            okayWithPartnerSmoking: faker.datatype.boolean(),
            music: faker.datatype.boolean(),
            musicPreference: (faker.helpers as any).arrayElements(MUSIC_PREFERENCES, faker.number.int({ min: 1, max: 4 })),
            wager: faker.datatype.boolean(),
            wagerPreference: (faker.helpers as any).arrayElement(["Friendly", "Competitive", "Money", "None"]),
          },
        },
      },
    });

    console.log(`Created user: ${user.name}`);
  }
}

main()
  .then(() => {
    console.log("Dummy user seeding complete!");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error("Error seeding:", err);
    return prisma.$disconnect();
  });
