import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";

function HeroSection() {
  return (
    <div className="flex items-center bg-gradient-to-r from-background via-background to-primary h-screen">
      <div className="flex-1 px-16 py-12 flex flex-col gap-12">
        <p className="font-bold text-white text-4xl">
          Organize your tasks, Boost your{" "}
          <span className="text-primary">productivity</span>
        </p>
        <p className="text-white text-xl">
          Smart task management to keep you organized and productive
        </p>
        <div>
          <Link href="/dashboard" passHref>
            <Button>
              <SparklesIcon /> Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Image src="/hero.png" alt="Hero Image" width={300} height={300} />
      </div>
    </div>
  );
}

export default HeroSection;
