/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  
  await knex('item').del()
  await knex('item').insert([
    {
      UserId: 1,
      ItemName: 'The One Ring',
      Description: 'A powerful ring created by the Dark Lord Sauron to control Middle-earth, sought after by many and known to corrupt its bearers.',
      Quantity: 1
    },
    {
      UserId: 2,
      ItemName: 'Sting',
      Description: 'A small, ancient Elven blade carried by Bilbo and Frodo Baggins. Glows blue in the presence of orcs.',
      Quantity: 1
    },
    {
      UserId: 3,
      ItemName: 'Andúril',
      Description: 'Reforged from the shards of Narsil, Andúril is the sword of Aragorn, symbolizing the rekindled hope of the Men of the West.',
      Quantity: 1
    },
    {
      UserId: 4,
      ItemName: 'Mithril Shirt',
      Description: 'A precious and lightweight chainmail shirt made from Mithril, given to Frodo Baggins. Provides unparalleled protection.',
      Quantity: 1
    },
    {
      UserId: 1,
      ItemName: 'Phial of Galadriel',
      Description: 'A crystal phial filled with the light of Eärendil\'s star, given to Frodo Baggins by Galadriel. It shines bright in dark places.',
      Quantity: 1
    },
    {
      UserId: 2,
      ItemName: 'Palantír of Orthanc',
      Description: 'A seeing-stone used for communication across vast distances. Possesses great power and peril.',
      Quantity: 1
    },
    {
      UserId: 3,
      ItemName: 'Leaves of Lórien',
      Description: 'Silver brooches in the shape of a Mallorn leaf, given to the members of the Fellowship as a symbol of friendship and loyalty.',
      Quantity: 9
    },
    {
      UserId: 4,
      ItemName: 'Horn of Gondor',
      Description: 'A great horn carried by Boromir of Gondor, used to summon aid or signal the start of battle.',
      Quantity: 1
    }
  ]);
};
