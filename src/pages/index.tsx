import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {

  const { data, isLoading: dataLoading } = api.post.getAll.useQuery()

  return (
    <>
      <Head>
        <title>crApp</title>
        <meta name="description" content="Welcome to crApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">

        <AuthShowcase />
        {dataLoading ?
          <div>
            Loading Posts...
          </div>
          :
          <div>
            {data?.map(post => {
              return <div>{post.content}</div>
            })}
          </div>
        }
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession()

  return (
    <div className="">

      {sessionData && <span>Logged in as {sessionData.user?.name}</span>}

      <button
        className=""
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
