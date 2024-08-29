import dotenv from 'dotenv';

dotenv.config();

export class EnvConfig {
  private readonly env: { [key: string]: any } = {};

  constructor() {
    this.envInit();
  }

  private envInit() {
    // Application
    this.env.botName = process.env.BOT_NAME || '';
    // Database
    this.env.dbUser = process.env.DB_USER || '';
    this.env.dbPass = process.env.DB_PASS || '';
    this.env.dbName = process.env.DB_NAME || '';
    this.env.dbUri = process.env.DB_URI || '';
    // Blockchain
    // Telegram
    this.env.telegramToken = process.env.TELEGRAM_TOKEN || '';
  }

  public get(key: string): any {
    return this.env[key];
  }
}
