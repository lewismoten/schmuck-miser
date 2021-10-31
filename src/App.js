import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./state/accounts/actions";
import * as selectors from "./state/accounts/selectors";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.isLoading);
  const hasError = useSelector(selectors.hasError);
  const hasLoaded = useSelector(selectors.hasLoaded);

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  return (
    <div className="App">
      This is an app.
      <p>HasLoaded: {hasLoaded.toString()}</p>
      <p>IsLoading: {isLoading.toString()}</p>
      <p>hasError: {hasError.toString()}</p>
    </div>
  );
}

export default App;
