const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Your bot token and application ID
const TOKEN = 'PLACE-DISCORD-TOKEN-HERE';
const CLIENT_ID = 'PLACE-CLIENT-ID-HERE'; // 
const GUILD_ID = 'PLACE-GUILD-ID-HERE'; // The ID of the guild (server) where you want to test the bot

const client = new Client({ intents: [1] });

// Slash command definition
const commands = [
  {
    name: 'saabr',
    description: 'Replies with team!',
  },
];

// Register slash commands
(async () => {
  try {
    const rest = new REST({ version: '9' }).setToken(TOKEN);

    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { // Use Routes here
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// Event listener for slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'saabr') {
    await interaction.reply('team!');
  }
});

// Log in to Discord
client.login(TOKEN);