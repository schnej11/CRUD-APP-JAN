/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  
  await knex('userbase').del()
  await knex('userbase').insert([
    { FirstName: 'Frodo', LastName: 'Baggins', UserName: 'RingBearer', Password: 'shire123', Manager: false },
    { FirstName: 'Gandalf', LastName: 'TheGrey', UserName: 'WiseWizard', Password: 'mordorWho', Manager: true },
    { FirstName: 'Aragorn', LastName: 'Elessar', UserName: 'Strider', Password: 'gondorKing', Manager: true },
    { FirstName: 'Legolas', LastName: 'Greenleaf', UserName: 'ElvenArcher', Password: 'mirkwood', Manager: true },
    { FirstName: 'Galadriel', LastName: 'ofLothlorien', UserName: 'LadyOfLight', Password: 'noldor123', Manager: true },
    { FirstName: 'Samwise', LastName: 'Gamgee', UserName: 'SamTheBrave', Password: 'potatoes', Manager: false },
  ]);
};
