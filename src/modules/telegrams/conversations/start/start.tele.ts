import { EnvConfig } from '../../../../configs/env.config';
import * as icons from '../../../../resources/icons.rs';
import { BotContext, ConversationContext } from '../../configs/context.tele';
import * as btnInteractive from '../../interactives';

// Environment variables
const env: EnvConfig = new EnvConfig();
// Logic functions
const startConversation = async (
  conversation: ConversationContext,
  ctx: BotContext,
) => {
  try {
    const { user } = await ctx.getAuthor();
    ctx.reply(
      `${icons.IWelcome} Welcome ${user.first_name} ${user.last_name}, Now you are using ${env.get('botName')}! ${icons.IRocket}`,
      {
        reply_markup: await btnInteractive.startButton(),
      },
    );

  } catch (error) {
    console.log(error);
    ctx.reply(`${icons.ISomethingWentWrong} Sorry, Something went wrong!`);
  } finally {
    conversation._deactivate();
  }
};
// Exported
export { startConversation };
