import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <footer className="bg-black text-typography text-center px-12 py-8 flex flex-col items-center justify-center">
      <Separator className="bg-slate-800 my-4" />
      <div className="flex w-full my-16">
        <Image src="/logo.png" alt="Kapybara" width={100} height={100} />
        <div className="text-left">
          <h1 className="text-2xl font-bold"> Kapybara </h1>
          <p> Your tasks, your way. Get things done without the stress! </p>
          <p> Need help? Contact us at support@kapybara.com </p>
        </div>
        <div className="ml-auto text-left flex flex-col gap-4">
          <Link
            href="https://github.com/Salai-Kowshikan/Kapybara-assignment"
            className=" hover:underline flex items-center justify-center"
            passHref
          >
            <div className="flex gap-4 items-center mr-4 text-lg font-bold w-full">
              <Image
                src="/github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="mr-1"
              />
              GitHub
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com/in/salai-kowshikan-308341293/"
            className=" hover:underline flex items-center justify-center"
          >
            <div className="flex gap-4 items-center mr-4 text-lg font-bold">
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                width={20}
                height={20}
                className="mr-1"
              />
              LinkedIn
            </div>
          </Link>
        </div>
      </div>
      <Separator className="bg-slate-800 my-4" />
      <div className="flex w-full gap-8 text-gray-400">
        <p> About us</p>
        <p> Contact us</p>
        <p> Help</p>
        <p> Privacy Policy</p>
        <p> Disclaimer </p>
        <p className="flex-1 text-right">
          &copy; 2025 Kapybara Personal Task Management. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
