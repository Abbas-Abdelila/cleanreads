"use client"
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { carrotIcon, writeSmallIcon, profileIcon, librabryIcon } from "../../public/icons/icons";
import defaultImage from "../../public/images/profile.png"
import Image from "next/image";
import User from "@/types/user/User";


export default function AvatarMenu() {
    //burası değişicek
    const [loggedInUser, setLoggedInUser] = useState<User | null>({ userId: 1, username: "Ali", email: "ali@gmail.com", image: defaultImage.src, bio: "SDU" });
    const logout = () => {
        setLoggedInUser(null)
    }

    return loggedInUser ? (
        <AuthMenu avatar={loggedInUser?.image} username={loggedInUser?.username} email={loggedInUser!.email} userId={loggedInUser!.userId} logout={logout} />
    ) : (
        <UnAuthMenu />
    )
}


function UnAuthMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (
        event: MouseEvent<HTMLImageElement | HTMLSpanElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="flex items-center gap-3">
            <Image
                onClick={handleClick}
                width={40}
                height={40}
                className="rounded-full border border-gray-300 cursor-pointer"
                src={defaultImage}
                alt="resim"
            />
            <span
                onClick={handleClick}
                className="text-gray-500 cursor-pointer"
            >
                {carrotIcon}
            </span>
            <Menu
                PaperProps={{
                    className: "w-64 py-2 px-4 rounded-md mt-2",
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <GetStarted />
            </Menu>
        </div>


    );
}

function AuthMenu({
    avatar,
    email,
    username,
    userId,
    logout,
}: {
    avatar: string;
    username: string
    email: string;
    userId: number;
    logout(): void;
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLImageElement | HTMLSpanElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="avatar flex flex-row items-center gap-3">
            <Image
                onClick={handleClick}
                className="rounded-full border border-gray-300 cursor-pointer"
                src={avatar ?? defaultImage}
                alt="resim"
                width={40}
                height={40}
            />
            <span
                onClick={handleClick}
                className="text-gray-500 cursor-pointer"
            >
                {carrotIcon}
            </span>

            <Menu
                PaperProps={{
                    style: {
                        width: 240,
                        padding: "10px 0",
                        borderRadius: "4px",
                        marginTop: "10px",
                    },
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Link href={`/users/${username}`}>
                    <MenuItem
                        onClick={handleClose}
                        className="flex flex-row items-center px-4 py-2 hover:bg-transparent"
                    >
                        <span className="text-gray-400">{profileIcon}</span>
                        <p className="ml-2 text-gray-600 text-sm">Profile</p>
                    </MenuItem>
                </Link>
                <Link href="/write">
                    <MenuItem
                        onClick={handleClose}
                        className="flex flex-row items-center px-4 py-2 hover:bg-transparent"
                    >
                        <span className="text-gray-400">{writeSmallIcon}</span>
                        <p className="ml-2 text-gray-600 text-sm">Write Story</p>
                    </MenuItem>
                </Link>
                <Link href={"/"}>
                    <MenuItem
                        onClick={handleClose}
                        className="flex flex-row items-center px-4 py-2 hover:bg-transparent"
                    >
                        <span className="text-gray-400">{librabryIcon}</span>
                        <p className="ml-2 text-gray-600 text-sm">Library</p>
                    </MenuItem>
                </Link>
                <Divider sx={{ margin: "10px 0" }} />
                <MenuItem
                    onClick={() => {
                        handleClose();
                        logout();
                    }}
                    className="flex flex-col items-start px-6"
                >
                    <p className="text-gray-600 text-sm mt-2 mb-1">Sign out</p>
                    <span className="text-gray-400 text-xs">{email}</span>
                </MenuItem>
            </Menu>
        </div>
    );
}




export function GetStarted({
    style,
    topStyle,
}: {
    style?: object;
    topStyle?: object;
}) {
    return (
        <div className="flex flex-col items-center gap-4 pb-4 pt-3" style={style}>
            <p className="mb-5" style={topStyle}>
                Get started on Medium
            </p>
            <Link
                href="/login"
                className="bg-green-600 text-white rounded-lg py-2 px-3 text-sm w-44 text-center"
            >
                Sign up
            </Link>
            <Link
                href="/register"
                className="border-gray-300 border rounded-lg py-2 px-3 text-gray-500 text-sm w-44 text-center"
            >
                Sign In
            </Link>
        </div>
    );
}