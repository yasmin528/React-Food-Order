import { Header } from "./Components/Header";
import { Meals } from "./Components/Meals";
import { MealsContextProvider } from "./store/foodOrderContext";

function App() {
  return (
    <MealsContextProvider>
      <Header/>
      <Meals/>
    </MealsContextProvider>
  );
}

export default App;
