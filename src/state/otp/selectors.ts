import { createSelector } from 'reselect';
import * as themeSelectors from '../theme/selectors';

const WARN_SECONDS = 4;
const SECONDS_PER_TOKEN = 30;
const MS_PER_SECOND = 1000;

const slice = ({ otp = {} } = {}) => otp;

export const secret = createSelector(slice, ({ secret }) => secret);
const user = createSelector(slice, ({ user }) => encodeURIComponent(user));
const service = createSelector(slice, ({ service }) =>
  encodeURIComponent(service)
);

export const isSettingUp = createSelector(
  slice,
  ({ isSettingUp }) => !!isSettingUp
);
export const isEnabled = createSelector(
  secret,
  isSettingUp,
  (secret, isSettingUp) => (isSettingUp ? false : !!secret)
);

export const canShowSecret = createSelector(
  isSettingUp,
  secret,
  (isSettingUp, secret) => isSettingUp && !!secret
);

export const qrData = createSelector(
  secret,
  user,
  service,
  canShowSecret,
  (secret, user, service, canShowSecret) => {
    if (!canShowSecret) return;
    return `otpauth://totp/${service}:${user}?secret=${secret}&period=30&digits=6&algorithm=SHA1&issuer=${service}`;
  }
);

export const isVerified = createSelector(
  slice,
  ({ isVerified }) => !!isVerified
);

export const qrOptions = createSelector(themeSelectors.palette, (palette) => {
  return {
    margin: 0,
    color: {
      light: ensureColorAsHex(palette.background.paper),
      dark: ensureColorAsHex(palette.primary.main),
    },
  };
});

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

export const timeout = createSelector(
  slice,
  ({ seconds: s, milliseconds: ms }) => {
    const secondsPassed = s % SECONDS_PER_TOKEN;
    const secondsRemaining = SECONDS_PER_TOKEN - secondsPassed;

    const percent =
      (secondsPassed * MS_PER_SECOND + ms) /
      (SECONDS_PER_TOKEN * MS_PER_SECOND);

    const isHalfPast = s >= SECONDS_PER_TOKEN;
    const isExpiring = percent > 1 - WARN_SECONDS / SECONDS_PER_TOKEN;

    return {
      seconds: secondsRemaining,
      percent,
      isHalfPast,
      isExpiring,
    };
  }
);
