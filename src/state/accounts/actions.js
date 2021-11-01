import { createRoutine } from "redux-saga-routines";
import littleEmoji from "little-emoji";
import actionBuilder from "../actionBuilder";
const build = actionBuilder("accounts", littleEmoji.cardIndexDividers);

export const load = build("load");
export const unload = build("unload");
