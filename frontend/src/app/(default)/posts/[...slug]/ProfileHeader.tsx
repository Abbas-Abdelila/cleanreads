"use client";
import { formatDate } from "@/util/DateFormat";
import { titleToUrl } from "@/util/titleToUrl";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";
import Link from "next/link";
const ProfileHeader = ({ userId, username, userimage, readingTime, date }: { userId: Number, username: string, date: string, readingTime: number, userimage: string | null | undefined }) => {
  return (
    <>
      <div className="px-2 flex justify-between items-center mb-16">
        <div className="profile date flex justify-start space-x-3 sm:space-x-5">
          <Link href={`/users/${userId}`}>
            <Image
              src={userimage}
              height={48}
              width={48}
              alt="Socials"
              className="rounded-full sm:flex"
            />
          </Link>
          <div className="flex flex-col gap-1">
            <Link href={`/users/${userId}`}>
              <h1>{username}</h1>
            </Link>
            <div className="flex gap-3">
              <p className="text-light text-[#787878] text-[14px]">
                {`${formatDate(date)} · ${readingTime} min read ·`}
              </p>
              <span className="text-blue-400 text-[14px]">Listen</span>
            </div>
          </div>
        </div>
        <div className="socials hidden sm:flex space-x-12">
          <div className="icons flex space-x-4">
            <TwitterIcon
              fontSize="small"
              className="cursor-pointer text-slate-400 grayscale-[90%] hover:text-black"
            />
            <FacebookRoundedIcon
              fontSize="small"
              className="cursor-pointer text-slate-400 grayscale-[90%] hover:text-black"
            />
            <LinkedInIcon
              fontSize="small"
              className="cursor-pointer text-slate-400 grayscale-[90%] hover:text-black"
            />
            <LinkOutlinedIcon
              fontSize="small"
              className="cursor-pointer text-slate-400 hover:text-black"
            />
          </div>
          <div className="bookmark more flex gap-4">
            <BookmarkAddOutlinedIcon
              fontSize="small"
              className="cursor-pointer text-slate-400 text-light hover:text-black"
            />
            <MoreHorizIcon
              fontSize="small"
              className="cursor-pointer text-slate-400 grayscale-[90%] hover:text-black"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;