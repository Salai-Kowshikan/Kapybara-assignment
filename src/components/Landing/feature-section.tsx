import Image from "next/image";

function FeatureSection() {
  return (
    <div className="bg-primary h-screen px-16 py-12  flex flex-col items-center justify-center">
      <div className="text-black font-bold text-4xl">
        Smart features to supercharge
        <br />
        <span className="text-white"> Your productivity</span>
      </div>
      <div className="w-full flex items-center justify-center my-16">
        <Image
          src="/features.png"
          alt="Features Tab 1"
          width={300}
          height={300}
        />
      </div>
      <div>
        <p className="text-white mx-24 text-xl">
          Our Personal Task Management System simplifies task organization with
          intuitive tools. Easily create, update, and categorize tasks, track
          progress with a calendar view, and stay productive with smart filters
          and insights. Stay on top of your goals
        </p>
      </div>
    </div>
  );
}

export default FeatureSection;
