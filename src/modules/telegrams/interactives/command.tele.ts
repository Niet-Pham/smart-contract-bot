import { EnvConfig } from '../../../configs/env.config';
import * as constants from '../../../utils/constants'

// Environment
const env: EnvConfig = new EnvConfig();
// Interactive logics
interface Commands {
  command: string;
  description: string;
}

const COMMANDS: Commands[] = [
  {
    command: constants.START,
    description: `Start interacting with the ${env.get('botName')}`,
  },
  { command: constants.ADD_CONTRACT, description: 'Adding contract' },
  { command: constants.INTERACT, description: 'Interacting to contract' },
  // { command: 'help', description: 'Tutorial & Help' },
];
// Export
export { Commands, COMMANDS };
