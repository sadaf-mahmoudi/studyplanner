import { useStore } from "../data/store.jsx";

const Header = () => {
  const restartWeek = useStore((state) => state.restartWeek);
  const startNextWeek = useStore((state) => state.startNextWeek);

  return (
    <header>
      <h1>Min vecka</h1>
      <button
        className="restart-week"
        onClick={restartWeek}
        data-cy="restart-week"
      >
        Starta om vecka
      </button>
      <button
        className="start-next-week"
        onClick={startNextWeek}
        data-cy="start-next-week"
      >
        Starta nästa vecka
      </button>
    </header>
  );
};

export default Header;