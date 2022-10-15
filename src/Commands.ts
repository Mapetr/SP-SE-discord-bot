import {Stats} from "./commands/stats.js";
import {Command} from "./commands/Command.js";
import {CreateReactionRole} from "./commands/createReactionRole.js";
import {AddRole} from "./commands/addRole.js";
import {SetChannel} from "./commands/setChannel.js";

export const Commands: Command[] = [Stats, CreateReactionRole, AddRole, SetChannel];
