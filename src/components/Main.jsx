import { useStore } from "../data/store.jsx";
import Day from "./day/Day";
import PrioList from "./prio-list/PrioList.jsx";
import Summary from "./Summary.jsx";
import { splitTodosIntoDays } from "../utils/list.jsx";

const Main = () => {
  const todos = useStore((state) => state.todos);
  const days = splitTodosIntoDays(todos);

  return (
    <main>
      <Summary />
      <div className="day-view">
        {days.map((d, index) => (
          <Day key={index} dayName={d.name} items={d.items} />
        ))}
      </div>
      <hr />
      <PrioList />
    </main>
  );
};

export default Main;