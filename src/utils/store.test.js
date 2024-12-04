import { describe, it, expect } from "vitest";
import { splitTodosIntoDays } from "./list";

describe("splitTodosIntoDays", () => {
  it("should split todos into correct days", () => {
    const todos = [
      {
        id: 1,
        day: "må",
        done: true,
        late: false,
        text: "Göra klart inlämning",
      },
      {
        id: 2,
        day: "ti",
        done: true,
        late: false,
        text: "Lektion i skolan 9-16",
      },
      { id: 3, day: "ti", done: false, late: true, text: "Övning 1" },
      {
        id: 4,
        day: "on",
        done: false,
        late: false,
        text: "Repetera lektionen",
      },
      { id: 5, day: "on", done: true, late: false, text: "Övning 2" },
      {
        id: 6,
        day: "to",
        done: false,
        late: false,
        text: "Distanslektion 9-16",
      },
    ];

    const days = splitTodosIntoDays(todos);

    expect(days[0].name).toBe("Måndag");
    expect(days[0].items.length).toBe(1); // Måndag
    expect(days[1].name).toBe("Tisdag");
    expect(days[1].items.length).toBe(2); // Tisdag
    expect(days[2].name).toBe("Onsdag");
    expect(days[2].items.length).toBe(2); // Onsdag
    expect(days[3].name).toBe("Torsdag");
    expect(days[3].items.length).toBe(1); // Torsdag
    expect(days[4].items.length).toBe(0); // Fredag
    expect(days[5].items.length).toBe(0); // Lördag
    expect(days[6].items.length).toBe(0); // Söndag
  });

  it("should return empty lists for days with no todos", () => {
    const todos = [];

    const days = splitTodosIntoDays(todos);

    days.forEach((day) => {
      expect(day.items.length).toBe(0);
    });
  });
});