import { mongooseDbConnection } from './dbs/connection.db';
import { botStarted } from './modules/telegrams/bot.tele';

const main = async () => {
  // DB Connection
  console.log("Connecting to db....");  
  await mongooseDbConnection();
  console.log("Connected");
  // Bot
  console.log("Start service");
  botStarted();
  
};

main().catch((err) => {
  console.error('Process exit with error: ', JSON.stringify(err));
  return process.exit(1);
});
