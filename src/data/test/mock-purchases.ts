import { SavePurchases } from "@/domain/usecases";
import { faker } from '@faker-js/faker';

export const mockPurchases = (): Array<SavePurchases.Params> => [
{
  id: faker.datatype.uuid(),
  date: faker.date.past(),
  value: faker.seed()
},
{
  id: faker.datatype.uuid(),
  date: faker.date.past(),
  value: faker.seed()
}
]


