import dotenv from "dotenv";
import { ShardingManager } from 'discord.js';

dotenv.config();

const manager = new ShardingManager("./app.js", {
  token: process.env.BOT_TOKEN,
});

manager.on("shardCreate", (shard) =>
  console.log(`Launched NeoBot Shard ${shard.id}`)
);

manager.spawn();
