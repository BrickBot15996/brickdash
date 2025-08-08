import { redirect } from "next/navigation";
import Button from "../../_components/brick-button";
import { generatePath } from "../../_utils/redirectPath";
import { useStrictLocale } from "../../_hooks/use-strict-locale";
import { useGlobalContext } from "../../global-context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { login } from "./actions";

export default function LoginPage() {
  const locale = useStrictLocale();
  const { logInState } = useGlobalContext();

  return (
    <AnimatePresence mode="wait">
      {logInState == "login" ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        >
          <LogInScreen />
        </motion.div>
      ) : logInState == "2fa" ? (
        <motion.div
          key="2fa"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        >
          <TwoFAScreen />
        </motion.div>
      ) : (
        redirect(generatePath(locale, "blog"))
      )}
    </AnimatePresence>
  );
}

function LogInScreen() {
  return (
    <form className="flex flex-col items-center justify-center space-y-[var(--sm-space-y)] h-full w-full min-h-screen">
      <h2>BrickDash</h2>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="Enter email..."
        className="border-2 border-[#363636] bg-[#1a1a1a] text-[var(--text)] w-[30rem] h-[4rem] rounded-[1rem] px-[var(--sm-space-x)] text-[1.25rem] outline-none"
      />
      <input
        id="password"
        name="password"
        type="password"
        required
        placeholder="Enter password..."
        className="border-2 border-[#363636] bg-[#1a1a1a] text-[var(--text)] w-[30rem] h-[4rem] rounded-[1rem] px-[var(--sm-space-x)] text-[1.25rem] outline-none"
      />
      <div className="w-[30rem] flex flex-row items-center justify-center">
        <Link
          href=""
          className="text-[var(--primary)] text-[1.25rem] hover:text-[var(--text-alternate)] font-semibold mr-auto"
        >
          Forgot password?
        </Link>
        <button formAction={login}>
          <Button
            text="Log In"
            className="px-[2rem]"
          />
        </button>
      </div>
    </form>
  );
}

function TwoFAScreen() {
  const { setLogInState } = useGlobalContext();

  return (
    <form className="flex flex-col items-center justify-center space-y-[var(--sm-space-y)] h-full w-full min-h-screen">
      <h2>2FA</h2>
      <input
        type="text"
        placeholder="Enter the code..."
        className="border-2 border-[#363636] bg-[#1a1a1a] text-[var(--text)] w-[30rem] h-[4rem] rounded-[1rem] px-[var(--sm-space-x)] text-[1.25rem] outline-none"
      ></input>
      <div className="w-[30rem] flex flex-row items-center justify-center">
        <div className="mr-auto">
          <Button
            text="Resend Code"
            action={() => {}}
          />
        </div>
        <div className="ml-auto">
          <Button
            text="Log In"
            action={() => {
              setLogInState("loggedIn");
            }}
            className="px-[3rem]"
          />
        </div>
      </div>
    </form>
  );
}
