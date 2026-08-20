import bcrypt from 'bcrypt';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const existingStaff = await knex('staff')
    .where({ email: 'staff@example.com' })
    .first();

  if (existingStaff) {
    return;
  }

  const password_hash = await bcrypt.hash('staff', 10);

  await knex('staff').insert({
    name: 'Ashiful Islam',
    email: 'staff@example.com',
    password_hash,
  });
}
