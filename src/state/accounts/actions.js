import { createRoutine } from "redux-saga-routines";
import actionBuilder from "../actionBuilder";
import emoji from "../../utils/emoji";
const build = actionBuilder("accounts", emoji.cardIndexDividers);

export const load = build("load");
export const unload = build("unload");
