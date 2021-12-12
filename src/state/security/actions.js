import emoji from '@lewismoten/emoji';
import actionBuilder from '../actionBuilder';
const build = actionBuilder('security', emoji.locked);

export const setup2FA = build('setup 2FA');
export const cancelSetup2FA = build('cancel 2FA setup');
export const remove2FA = build('remove 2FA');
export const initialize = build('initialize');
export const uninitialize = build('uninitialize');
export const verifyOtp = build('verifyOtp');
