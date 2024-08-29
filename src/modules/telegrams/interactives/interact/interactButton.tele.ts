import { InlineKeyboard } from 'grammy';
import * as icon from '../../../../resources/icons.rs';
import * as constants from '../../../../utils/constants'

export const interactButton = async (): Promise<InlineKeyboard> => {
  try {
    return new InlineKeyboard()
      .text(`${icon.IAdd} Decode`, constants.BTN_DECODE)
      .row()
      .text(`${icon.IBook} zzzzzz`, constants.BTN_DECODE)
      .row()
  } catch (error) {
    throw new Error(error);
  }
};
