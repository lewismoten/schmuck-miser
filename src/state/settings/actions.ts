import emoji from '@lewismoten/emoji';
import actionBuilder from '../actionBuilder';
const build = actionBuilder('settings', emoji.wrench);

export const changeLanguage = build('change language');
