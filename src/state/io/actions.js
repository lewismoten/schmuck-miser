import emoji from '@lewismoten/emoji';
import actionBuilder from '../actionBuilder';
const build = actionBuilder('io', emoji.floppyDisk);

export const download = build('download');
export const upload = build.progress('upload');
