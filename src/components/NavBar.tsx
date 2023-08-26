import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "./generic/ButtonComponent";
import Wrapper from "./handling/Wrapper";
import Skeleton from "react-loading-skeleton";
import AvatarComponent from "./generic/AvatarComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAtom } from "jotai";
import { imageHelper } from "../config/images";
import { iconHelper } from "../config/icons";
import { themeAtom } from "../App";
import { currentURLPathAtom, loadingBarProgress, mediaTypeAtom } from "../App";
export default function NavBar() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [currentPath, setCurrentURLPath] = useAtom(currentURLPathAtom);
  const [mediaType, setMediaType] = useAtom(mediaTypeAtom);

  const [____, setProgress] = useAtom(loadingBarProgress); // eslint-disable-line @typescript-eslint/no-unused-vars
  return (
    <nav className="grid lg:grid-cols-6 grid-cols-4 w-11/12 max-w-[1920px] min-w-[300px] ">
      <Link
        className="flex col-span-1 lg:col-span-2 justify-start items-center font-poppins font-extrabold text-3xl gap-4"
        to="/"
        onClick={() => {
          setProgress(100);
          setCurrentURLPath("home");
          setMediaType("movie");
        }}
      >
        <img
          src={imageHelper.logo_md}
          className=" overflow-hidden object-full h-[3.2rem] rounded-full min-w-[3.2rem]"
        />
        <span className="dark:text-yellow-400 text-stone-900 font-extrabold tracking-wider text-2xl font-serif">
          Muvize
        </span>
      </Link>
      <div className="grid grid-cols-4 lg:col-start-3 col-span-2 place-items-center">
        <Link
          className={`col-span-1 h-full w-3/4 whitespace-nowrap grid place-items-center tracking-wider font-poppins text-xl transition-full duration-100 ${
            currentPath === "home" && mediaType === "movie"
              ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold"
              : "text-yellow-500 text-xl"
          }`}
          to="/"
          onClick={() => {
            setProgress(100);
            setCurrentURLPath("home");
            setMediaType("movie");
          }}
        >
          Movies
        </Link>
        <Link
          className={`col-span-1 h-full w-3/4 whitespace-nowrap grid place-items-center tracking-wider font-poppins text-xl transition-full duration-100 ${
            currentPath === "home" && mediaType === "tv"
              ? "text-yellow-400 border-b-2 border-yellow-500 font-semibold"
              : "text-yellow-500 text-xl"
          }`}
          to="/"
          onClick={() => {
            setProgress(100);
            setCurrentURLPath("home");
            setMediaType("tv");
          }}
        >
          TVs
        </Link>
        <Wrapper
          suspenseComponent={
            <div className="col-span-1 h-3/4 w-12 max-w-[2.8rem] whitespace-nowrap grid place-items-center rounded-full">
              <Skeleton className="h-full w-full" />
            </div>
          }
          errorComponent={() => (
            <div className="col-span-1 h-full group flex justify-center items-center w-full overflow-hidden">
              <div className="rounded-full grid place-items-center w-12  group-hover:max-w-0 transition-all duration-500 overflow-hidden opacity-100 group-hover:opacity-0">
                {theme === "light" ? (
                  <LazyLoadImage
                    src={imageHelper.logo}
                    alt="default_avatar"
                    effect="blur"
                  />
                ) : (
                  <LazyLoadImage
                    src={imageHelper.logo_better}
                    alt="default_avatar"
                    effect="blur"
                  />
                )}
              </div>
              <Link
                className="h-0 max-w-0 group-hover:max-w-full overflow-hidden group-hover:h-3/4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-500 grid place-items-center  font-poppins text-base px-3 py-[2px] rounded-lg bg-slate-500 hover:bg-slate-600 dark:bg-yellow-400
                dark:text-stone-900 text-white dark:hover:bg-yellow-500 shadow-lg font-bold  whitespace-nowrap"
                to="/profile"
                onClick={() => {
                  setProgress(100);
                  setCurrentURLPath("profile");
                }}
              >
                Sign In
              </Link>
            </div>
          )}
        >
          <Link
            className={`col-span-1 h-3/4 w-12 max-w-[2.8rem] whitespace-nowrap grid place-items-center rounded-full`}
            onClick={() => {
              setProgress(100);
              setCurrentURLPath("profile");
            }}
            to="/profile"
          >
            <AvatarComponent
              styles={{
                image: `rounded-full overflow-hidden grid w-12 place-items-center object-cover aspect-square ${
                  currentPath === "profile"
                    ? "border-b-4 border-yellow-500"
                    : ""
                }`,
              }}
            />
          </Link>
        </Wrapper>
        <div
          className={`h-1/2 rounded-lg my-auto w-full whitespace-nowrap flex items-center col-span-1 justify-center dark:bg-stone-700 bg-slate-200 gap-4 bg-opacity-70 z-10 ${
            currentPath === "discover" && "opacity-0 z-0"
          }`}
        >
          <ButtonComponent
            className={`w-4 h-4 rounded-full grid place-items-center  ${
              theme === "light" ? "text-yellow-600" : "text-stone-800 "
            }`}
            onClick={() => setTheme("light")}
          >
            {iconHelper.light("text-lg")}
          </ButtonComponent>
          <ButtonComponent
            className={`w-4 h-4 rounded-full grid place-items-center   ${
              theme === "dark" ? "text-yellow-600" : "text-stone-800"
            }`}
            onClick={() => setTheme("dark")}
          >
            {iconHelper.dark("text-base")}
          </ButtonComponent>
        </div>
      </div>
    </nav>
  );
}