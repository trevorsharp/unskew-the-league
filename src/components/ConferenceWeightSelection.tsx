import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

const weightSelectionOptions = [
  { name: "None", weight: 0 },
  { name: "Low", weight: 1 },
  { name: "Medium", weight: 2 },
  { name: "High", weight: 3 },
] as const;

type ConferenceWeightSelectionProps = {
  onSelectWeight: (weight: number) => void;
};

const ConferenceWeightSelection = ({
  onSelectWeight,
}: ConferenceWeightSelectionProps) => {
  const [weightSelection, setWeightSelection] = useState<
    (typeof weightSelectionOptions)[number]
  >(weightSelectionOptions[1]);

  useEffect(() => {
    onSelectWeight(weightSelection.weight);
  }, [onSelectWeight, weightSelection, weightSelection.weight]);

  return (
    <div className="flex flex-col gap-3 self-start">
      <h2 className="text-sm font-medium leading-6 text-gray-900">
        How much weight should the placed on the conference adjustments?
      </h2>

      <RadioGroup value={weightSelection} onChange={setWeightSelection}>
        <RadioGroup.Label className="sr-only">
          Adjust Conference Weight
        </RadioGroup.Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {weightSelectionOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                clsx(
                  "cursor-pointer focus:outline-none",
                  active || checked
                    ? "bg-gray-600 text-white hover:bg-gray-500"
                    : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
                  "flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold sm:flex-1",
                )
              }
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ConferenceWeightSelection;
