import { Bot, session } from 'grammy';
import { EnvConfig } from '../../configs/env.config';
import { hydrateReply, ParseModeFlavor } from '@grammyjs/parse-mode';
import { BotContext } from './configs/context.tele';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { globalConfig, groupConfig, outConfig } from './configs/limit.tele';
import { limit } from '@grammyjs/ratelimiter';
import { ICancel } from '../../resources/icons.rs';
import { conversations, createConversation } from '@grammyjs/conversations';
import { run } from '@grammyjs/runner';
import { COMMANDS } from './interactives/command.tele';
import * as botConversations from './conversations/';
import * as constants from '../../utils/constants';

const env = new EnvConfig();

const bot = new Bot<ParseModeFlavor<BotContext>>(env.get('telegramToken'));

// ==========> Bot configuration <========== //
const throttler = apiThrottler({
  global: globalConfig,
  group: groupConfig,
  out: outConfig,
});

bot.use(hydrateReply);
bot.api.config.use(throttler);

bot.use(
  session({
    initial() {
      return {};
    },
  }),
);

bot.use(
  limit({
    timeFrame: 2000,
    limit: 5,
    onLimitExceeded: async (ctx) => {
      await ctx.reply(
        `${ICancel} Please refrain from sending too many requests!`,
      );
    },
    keyGenerator: (ctx) => {
      return ctx.from?.id.toString();
    },
  }),
);

// ==========> Bot conversation handler <========== //
bot.use(conversations());
bot.use(createConversation(botConversations.startConversation));
bot.use(createConversation(botConversations.addContractConversation));
bot.use(createConversation(botConversations.interactConversation));
// ==========> Bot command handler <========== //
bot.api.setMyCommands(COMMANDS);
bot.command(constants.START, async (ctx) => {
  await ctx.conversation.enter('startConversation');
});
bot.command(constants.ADD_CONTRACT, async (ctx) => {
  await ctx.conversation.enter('addContractConversation');
});
bot.command(constants.INTERACT, async (ctx) => {
  await ctx.conversation.enter('interactConversation');
});

// ==========> Bot click handler (Button Handler) <========== //
bot.on('callback_query', async (ctx) => {
  const [action, parameter] = ctx.callbackQuery?.data.split(':');
  // Save parameter to session
  if (parameter) {
    ctx.session.data = parameter;
  }
  console.log("Action:", action);
  console.log("Parameter:", parameter);
  
  // Handle actions
  if (action === constants.BTN_ADD_CONTRACT) {
    await ctx.conversation.enter('addContractConversation');
  }
  if (action === constants.BTN_INTERACT) {
    await ctx.conversation.enter('interactConversation');
  }
  if (action === constants.BTN_UPLOAD_FILE) {
    ctx.session.data = constants.BTN_UPLOAD_FILE
    await ctx.conversation.enter('addContractConversation');
  }
  if (action === constants.BTN_ENTER_JSON) {
    ctx.session.data = constants.BTN_ENTER_JSON
    await ctx.conversation.enter('addContractConversation');
  }
});

// ==========> Bot crash handler <========== //
bot.catch((err) => {
  console.log(err.error);
  throw err;
});

// ==========> Bot start <========== //
const botStarted = () => {
  if (!bot.isInited()) {
    run(bot);
    console.log(`${env.get('botName')} started successfully!`);
  }
};

export { botStarted };
