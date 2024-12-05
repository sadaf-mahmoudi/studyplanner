// src/components/Header.jsx
import { useStore } from "../data/store";

const Header = () => {
  const startNextWeek = useStore((state) => state.startNextWeek);
  const restartWeek = useStore((state) => state.restartWeek);

  return (
    <header>
      <h1 data-cy="header-title">Studieplanerare</h1>
      <div className="header-buttons">
        <button 
          onClick={startNextWeek}
          data-cy="next-week-btn"
        >
          Starta nästa vecka
        </button>
        <button 
          onClick={restartWeek}
          data-cy="restart-btn"
        >
          Starta om vecka
        </button>
      </div>
    </header>
  );
};

export default Header;