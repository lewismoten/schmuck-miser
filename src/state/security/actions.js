import emoji from '@lewismoten/emoji';
import actionBuilder from '../actionBuilder';
const build = actionBuilder('security', emoji.locked);

export const setup2FA = build('setup 2FA');