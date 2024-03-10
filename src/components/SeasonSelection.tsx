"use client";

import { useState } from "react";
import Season from "./Season";
import type { ChangeEvent } from "react";

const SeasonSelection = () => {
  const [seasonSelection, setSeasonSelection] = useState<number>(2023);

  const options = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

  const handleSeasonSelection = (event: ChangeEvent<HTMLSelectElement>) =>
    setSeasonSelection(parseInt(event.target.value));

  return (
    <div className="flex flex-col gap-6">
      <select
        id="season"
        name="season"
        className="block w-full max-w-[11rem] rounded-md border-0 py-2 pl-3 pr-10 text-lg font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-600 sm:text-sm sm:leading-6"
        defaultValue="2023"
        onChange={handleSeasonSelection}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}-{(option + 1) % 100} Season
          </option>
        ))}
      </select>

      <Season season={seasonSelection} />
    </div>
  );
};

export default SeasonSelection;
