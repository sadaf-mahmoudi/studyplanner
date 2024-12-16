import { useStore } from "../data/store.js";

const Footer = () => {
  const todayName = useStore((state) => state.todayName);

  return (
    <footer>
      <p> Idag är det: {todayName} </p>
      <p> studyplanner | 2024 </p>
    </footer>
  );
};

export default Footer;