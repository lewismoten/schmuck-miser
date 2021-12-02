import emoji from '@lewismoten/emoji';
import actionBuilder from './actionBuilder';
const build = actionBuilder('io', emoji.worldMap);

export const restore = build('restore');
