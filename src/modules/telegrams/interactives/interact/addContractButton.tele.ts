import * as grammy from 'grammy';
import * as icon from '../../../../resources/icons.rs';
import * as constants from '../../../../utils/constants'

export const addContractButton = async (): Promise<grammy.InlineKeyboard> => {
  try {
    return new grammy.InlineKeyboard()
      .text(`${icon.IAdd} Add contract`, constants.BTN_ADD_CONTRACT)
  } catch (error) {
    throw new Error(error);
  }
};


export const optionAddContractButton = async (): Promise<grammy.InlineKeyboard> => {
  try {
    return new grammy.InlineKeyboard()
      .text(`${icon.IRocket} Upload file`, constants.BTN_UPLOAD_FILE)
      .text(`${icon.IInfo} Enter JSON`, constants.BTN_ENTER_JSON)
      .row()
  } catch (error) {
    throw new Error(error);
  }
};

