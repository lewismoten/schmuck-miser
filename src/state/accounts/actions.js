import { createRoutine } from "redux-saga-routines";
import emoji from "@lewismoten/emoji";
import actionBuilder from "../actionBuilder";
const build = actionBuilder("accounts", emoji.cardIndexDividers);

export const load = build("load");
export const unload = build("unload");
