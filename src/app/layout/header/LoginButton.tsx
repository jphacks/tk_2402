import { signIn } from "@/lib/auth";
import Image from "next/image";

export default function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/myPage" });
      }}
    >
      <button type="submit" className="w-fit">
        <Image
          src="https://utfs.io/f/lR4Tr45NRivGNCeXjCRc3IzkXCRlpP0ExG8TLBsfwae4Uri2"
          alt="google"
          width={200}
          height={40}
          className="rounded-full"
        ></Image>
      </button>
    </form>
  );
}
