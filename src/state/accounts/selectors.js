import { createSelector } from "reselect";

const slice = ({ accounts = {} } = {}) => accounts;
export const allIds = createSelector(slice, ({ allIds = [] }) => allIds);
export const byId = createSelector(slice, ({ byId = {} }) => byId);
export const isLoading = createSelector(slice, ({ isLoading }) => !!isLoading);
export const hasError = createSelector(slice, ({ hasError }) => !!hasError);
export const hasLoaded = createSelector(slice, ({ hasLoaded }) => !!hasLoaded);
