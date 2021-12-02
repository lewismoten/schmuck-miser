import emoji from '@lewismoten/emoji';
import actionBuilder from '../actionBuilder';
const build = actionBuilder('io', emoji.floppyDisk);

export const download = build('download');
export const upload = build('upload');
export const replaceState = build('replace state');
export const readAsText = build.fileReaderStages('read as text');
