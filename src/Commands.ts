import {Stats} from "./commands/stats";
import {Command} from "./commands/Command";
import {CreateReactionRole} from "./commands/createReactionRole";
import {AddRole} from "./commands/addRole";
import {SetChannel} from "./commands/setChannel";

export const Commands: Command[] = [Stats, CreateReactionRole, AddRole, SetChannel];
