import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Routing.jsx";
import { DataContext } from "./component/DataProvider/DataProvider.jsx";
import { auth } from "./utility/fireBase.js";
import { Type } from "./utility/action.type.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
