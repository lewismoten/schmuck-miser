import emoji from '@lewismoten/emoji';
import actionBuilder from '../actionBuilder';
const build = actionBuilder('otp', emoji.timerClock);

export const setup = build('setup');
export const cancelSetup = build('cancel setup');
export const disable = build('disable');
export const initialize = build('initialize');
export const uninitialize = build('uninitialize');
export const verify = build('verify');
export const copySecret = build('copy secret');
export const changeTimeout = build('change timeout');
