interface WelcomeComponentProps {
  fullname?: string;
  currentDay?: number;
}

export const WelcomeComponent = ({ fullname = "Learner", currentDay }: WelcomeComponentProps) => {
  return (
    <div className="space-y-2 mb-10">
      <h1 className="text-4xl font-semibold ">Welcome {fullname} !!</h1>
      <p className="text-neutral">
        {currentDay !== undefined && currentDay !== null ? (
          <>
            <span className="text-primary text-lg">Day {currentDay} </span>of your web dev
            journey
          </>
        ) : (
          "Ready to start your web dev journey?"
        )}
      </p>
    </div>
  );
};