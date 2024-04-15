import SeasonSelection from "~/components/SeasonSelection";
import { getAllSeasonData } from "~/services/getSeasonData";
import { seasonOptions } from "~/types";

const Page = async () => {
  const allSeasonData = await getAllSeasonData(seasonOptions);

  return (
    <main className="flex w-max">
      <div className="flex max-w-5xl flex-col gap-10 px-8 py-16 pb-24 md:px-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
              Unskew the League
            </h1>
            <h5 className="text-lg font-medium tracking-tight text-gray-800">
              Conference-Adjusted NBA Rankings
            </h5>
          </div>

          <text className="max-w-xl text-base text-gray-700">
            Our goal is to offer NBA league-wide rankings that have been adjusted to reflect the
            differences in conference difficulty. This website was inspired by the March 8, 2024
            episode of the{" "}
            <a
              href="https://greatestofalltalk.com/"
              className="font-medium underline"
              target="_blank"
            >
              Greatest Of All Talk
            </a>{" "}
            podcast. For more information on these conference adjustments, review our{" "}
            <a href="#methodology" className="font-medium underline">
              methodology
            </a>
            .
          </text>
        </div>

        <SeasonSelection allSeasonData={allSeasonData} />

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold leading-6 text-gray-900">Methodology</h3>

          <text id="methodology" className="text-base text-gray-700">
            To account for the difference in skill levels across conferences, we analyze all games
            played between teams from the Eastern and Western Conferences throughout the season.
            From this inter-conference data, we determine the adjusted weight for a win against each
            conference, referred to as the &quot;Win Value.&quot; The stronger conference will have
            a Win Value greater than one, indicating that a victory against teams from this
            conference will carry more weight in our adjusted rankings. Conversely, wins against the
            weaker conference will contribute less to the adjusted rankings. Losses are also
            considered but are not weighted as heavily as wins, so losing to a weaker conference
            opponent is slightly more favorable than losing to a stronger conference opponent. You
            have the option to manually adjust the extent to which conference adjustments influence
            the rankings.
          </text>
        </div>

        <footer className="flex flex-col items-center justify-center gap-2 text-center text-sm md:flex-row">
          <span>
            Data from{" "}
            <a href="https://www.basketball-reference.com/" className="underline" target="_blank">
              Sports Reference
            </a>
            .
          </span>
          <span>
            Send any feeback to{" "}
            <a href="mailto:feedback@unskewtheleague.com" className="underline">
              feedback@unskewtheleague.com
            </a>
            .
          </span>
        </footer>
      </div>
    </main>
  );
};

export default Page;
