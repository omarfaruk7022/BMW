import React, { useEffect, useState } from "react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Link from "next/link";
import auth from "@/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Loading from "../Common/Loading";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

export default function SideMenu() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const email = user?.email;

  const handleSignOut = () => {
    signOut(auth);
  };

  //  create useQuery to fetch data from api

  const { isLoading, error, data } = useQuery({
    queryFn: () =>
      fetch(`http://localhost:5000/api/users/email/${email}`).then((res) =>
        res.json()
      ),
  });
  const [visible, setVisible] = useState(false);

  return (
    <div className="hidden lg:block shadow-2xl   px-6  ">
      <div className="flex h-screen flex-col justify-between ">
        <div className=" py-6 ">
          <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1 ">
            <Link
              href="/dashboard/"
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
            >
              <MdOutlineSpaceDashboard className="text-[20px]" />
              <span className="text-sm font-medium"> Dashboard </span>
            </Link>

            {data?.data[0]?.role === "admin" && (
              <Link
                href="/dashboard/addProduct"
                className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
              >
                <MdOutlineSpaceDashboard className="text-[20px]" />
                <span className="text-sm font-medium"> Add Product </span>
              </Link>
            )}

            {data?.data[0]?.role === "admin" && (
              <Link
                href="/dashboard/manageProduct"
                className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
              >
                <MdOutlineSpaceDashboard className="text-[20px]" />
                <span className="text-sm font-medium"> Manage Product </span>
              </Link>
            )}
            {data?.data[0]?.role === "admin" && (
              <Link
                href="/dashboard/allUsers"
                className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
              >
                <MdOutlineSpaceDashboard className="text-[20px]" />
                <span className="text-sm font-medium"> All Users </span>
              </Link>
            )}

            {/* <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2  ">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>

                  <span className="text-sm font-medium"> Employees </span>
                </div>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
                <Link
                  href="/employees"
                  className="flex items-center gap-2 rounded-lg px-4 py-2  "
                >
                  <MdFormatListNumberedRtl className="text-[20px]" />

                  <span className="text-sm font-medium">List </span>
                </Link>

                <Link
                  href="/addEmployee"
                  className="flex items-center gap-2 rounded-lg px-4 py-2  "
                >
                  <AiOutlineUserAdd />

                  <span className="text-sm font-medium"> Add </span>
                </Link>
              </nav>
            </details> */}

            <Link
              href="/dashboard/myProfile"
              className="flex items-center gap-2 rounded-lg px-2 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>

              <span className="text-sm font-medium"> My Profile </span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-2 py-2  text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>

              <span className="text-sm font-medium"> Invoices </span>
            </Link>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2  text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black ">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>

                  <span className="text-sm font-medium"> Account </span>
                </div>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <nav aria-label="Account Nav" className="mt-2 flex flex-col px-2">
                <Link
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-4 py-2  text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>

                  <span className="text-sm font-medium"> Security </span>
                </Link>

                <button
                  onClick={handleSignOut}
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-2   text-gray-900  hover:bg-gray-200  transition-all dark:text-gray-300 dark:hover:hover:bg-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <span className="text-sm font-medium"> Logout </span>
                </button>
              </nav>
            </details>
          </nav>
        </div>

        <div className="sticky inset-x-0 bottom-0 ">
          <Link href="/" className="flex items-center gap-2  p-4">
            <Image
              alt="Man"
              width={40}
              height={40}
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">
                  {data?.data[0]?.username}
                </strong>

                <span> {data?.data[0]?.email} </span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
