import { Button } from "@/components/ui/button";
import { UsersIcon } from "lucide-react";

function CTASection() {
  return (
    <div className="bg-background h-screen flex flex-col text-typography items-center justify-center gap-8 px-16 py-8">
      <div className="text-4xl font-bold">
        Join our productivity hub -{" "}
        <span className="text-primary"> Learn, Share, and Grow</span>
      </div>
      <p className="text-2xl">
        Connect, collaborate, and level up your productivity with us and
        community support
      </p>
      <div className="flex items-center">
        <div className="flex-[3] flex justify-center items-center ">
          <Button className="px-12 py-8 text-xl font-bold"> <UsersIcon />  Join now! </Button>
        </div>
        <p className="flex-[4] px-8">
          Be part of a community where task management meets real productivity.
          Get exclusive tips, share insights, and connect with like-minded
          individuals to stay on top of your goals
        </p>
      </div>
    </div>
  );
}

export default CTASection;
