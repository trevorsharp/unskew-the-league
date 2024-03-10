import SeasonSelection from "~/components/SeasonSelection";

const HomePage = () => (
  <main className="flex w-max">
    <div className="flex max-w-5xl flex-col gap-10 px-8 py-16 md:px-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
            Unskew the League
          </h1>
          <h5 className="text-lg font-medium tracking-tight text-gray-800">
            Conference-adjusted rankings for the NBA
          </h5>
        </div>

        <text className="max-w-xl text-base text-gray-700">
          Our goal is to provide insight on how the NBA&apos;s league-wide
          rankings differ after taking conference difficulty into account. This
          site was inspired by an episode of the{" "}
          <a
            href="https://greatestofalltalk.com/"
            className="font-medium underline"
            target="_blank"
          >
            Greatest Of All Talk
          </a>{" "}
          podcast released on March 8, 2024.
        </text>
      </div>

      <SeasonSelection />

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Methodology
        </h3>

        <text className="text-base text-gray-700">
          To account for conference difficulty, we look at all games played
          between an eastern conference team and a western conference team
          during the season. From this cross-conference record, we derive the
          adjusted weight for a win against each conference (&quot;Win
          Value&quot;). The stronger conference will have a win value greater
          than one, meaning that a win against this conference will count for
          more in our adjusted rankings. Inversely, a win to the weaker
          conference will count for less in the adjusted rankings. Losses are
          also weighted, though not as heavily as wins, so a loss to a weaker
          conference opponent is slightly preferred to a loss to a stronger
          conference opponent.
        </text>
      </div>
    </div>
  </main>
);

export default HomePage;
