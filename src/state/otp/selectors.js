import { createSelector } from 'reselect';
import * as cache from './cache';
import * as themeSelectors from '../theme/selectors';

const slice = ({ otp = {} } = {}) => otp;

export const secret = createSelector(slice, ({ secret }) => secret);
export const isSettingUp = createSelector(
  slice,
  ({ isSettingUp }) => !!isSettingUp
);
export const isVerified = createSelector(
  slice,
  ({ isVerified }) => !!isVerified
);

export const isEnabled = createSelector(
  secret,
  isSettingUp,
  (secret, isSettingUp) => (isSettingUp ? false : !!secret)
);

export const imageOptions = createSelector(
  themeSelectors.palette,
  (palette) => {
    return {
      margin: 0,
      color: {
        light: ensureColorAsHex(palette.background.paper),
        dark: ensureColorAsHex(palette.primary.main),
      },
    };
  }
);

const ensureColorAsHex = (color) => {
  const RGBA_PATTERN = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(1|0|0?\.\d+)\)/i;
  if (RGBA_PATTERN.test(color)) {
    let [, r, g, b, a] = color.match(RGBA_PATTERN);
    const bytes = [r, g, b].map((v) => Number(v));
    bytes.push(Math.floor(Number(a) * 256));
    return bytes.reduce(
      (hex, v) => `${hex}${v.toString(16).padStart(2, '0')}`,
      '#'
    );
  }
  return color;
};

export const setupImage = createSelector(
  secret,
  isSettingUp,
  imageOptions,
  (secret, isSettingUp) =>
    isSettingUp && !!secret ? cache.getCode() : undefined
);

export const timeout = createSelector(
  slice,
  ({ timeout: { seconds, percent, color } = {} }) => ({
    seconds,
    percent,
    color,
  })
);
