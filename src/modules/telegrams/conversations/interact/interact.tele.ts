
import { EnvConfig } from '../../../../configs/env.config'
import { Contracts } from '../../../../dbs/entities/contracts.entity'
import * as contractOps from '../../../../dbs/operations/contracts.operation'
import * as icons from '../../../../resources/icons.rs'
import { BotContext, ConversationContext } from '../../configs/context.tele';
import * as btnInteractive from '../../interactives'
import * as constants from '../../../../utils/constants'

const env: EnvConfig = new EnvConfig();

export const interactConversation = async (
    conversation: ConversationContext,
    ctx: BotContext,
) => {
    try {
        ctx.reply(`${icons.IBook} Interacting Mode ${icons.IBook}`)
        const isExistedContract = await conversation.external(async () => {
            return (await contractOps.countRecord()) == 0 ? false : true
        })
        if (!isExistedContract) {
            ctx.reply(`${icons.IWarning} Haven't Been Contract Before. Please add new contract. ${icons.IWarning}`, {
                reply_markup: await btnInteractive.addContractButton(),
            });
        } else {
            ctx.reply(`${icons.IBook} Choosing contract`)
        }
    } catch (error) {
        console.log(error);
        ctx.reply(`${icons.ISomethingWentWrong} Sorry, Something went wrong!`);
    } finally {
        conversation._deactivate();
    }
};

export const addContractConversation = async (
    conversation: ConversationContext,
    ctx: BotContext,
) => {
    try {
        let abi;
        console.log("Session data: ", ctx.session.data);

        if (!ctx.session.data) {
            await ctx.reply(
                'Enter abi or push abi JSON file',
                {
                    reply_markup: await btnInteractive.optionAddContractButton(),
                },
            )
        }
        if (ctx.session.data == constants.BTN_UPLOAD_FILE) {
            // Handle file upload
            await ctx.reply('Please send the ABI JSON file.');
            const { message } = await conversation.waitFrom(ctx.from);

            if (message.document) {
                // await ctx.reply(
                //     'Push abi JSON file',
                //     {
                //         reply_markup: await btnInteractive.optionAddContractButton()
                //     },
                // )
                const fileId = message.document.file_id;
                // const file = await ctx.getFile(fileId);
                // console.log(file.file_path);

                // const buffer = await ctx.downloadFile(file.file_path);
                // abi = JSON.parse(buffer.toString())
            } else {
                await ctx.reply('Invalid file. Please send a JSON file.');
                return;
            }
        } else if (ctx.session.data == constants.BTN_ENTER_JSON) {
            while (true) {
                await ctx.reply('Enter the ABI as JSON string: ');
                const { message } = await conversation.waitFrom(ctx.from);
                try {
                    abi = await JSON.parse(message.text);
                    break;
                } catch (error) {
                    console.log(error);

                    await ctx.reply('Invalid JSON string. Please enter a valid JSON string.');
                    continue; // Exit the function
                }
            }
        } else {
            // await ctx.reply('Invalid option. Please choose "Upload File" or "Enter JSON".');
            return; // Exit the function
        }

        await ctx.reply('Enter the contract address (optional):');
        const { message } = await conversation.waitFrom(ctx.from);
        const address = message.text || null;

        const contract = new Contracts({
            abi: abi,
            address: address,
        })
        console.log(contract);

        await conversation.external(async () => {
            return await contractOps.saveContract(contract);
        });
        await ctx.reply(
            'Adding new contract successfully!!!'
        )
    } catch (error) {

    }
}