import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { User } from "../pages/api/next/user";

interface UseUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
}: UseUserProps = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/user/api/user", fetcher);

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}

async function fetcher(url: string) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}