import { InlineKeyboard } from 'grammy';
import * as icon from '../../../../resources/icons.rs';
import * as constants from '../../../../utils/constants'


const startButton = async (): Promise<InlineKeyboard> => {
  try {
    return new InlineKeyboard()
      .text(`${icon.IAdd} Add contract`, constants.BTN_ADD_CONTRACT)
      .text(`${icon.IBook} Interact to contract`, constants.BTN_INTERACT)
      .row()
  } catch (error) {
    throw new Error(error);
  }
};

export { startButton };
