
import User from '@/types/user/User'
import React from 'react'
import Image from "next/image"
import defaultImage from "../../public/images/profile.png"
import Link from "next/link"
import Button from './Button'
import useFollow from '@/hook/useFollow'

type Props = {
    user: User
}

const UserSummaryCard = (props: Props) => {
    const { user: { bio, email, image, username, userId } } = props;

    const { isFollowing, toggleFollow } = useFollow(userId);

    return (
        <div className='w-full flex justify-between items-center my-4'>
            <div className="left h-full  flex  justify-between w-[60%]">
                <div className="w-[15%] h-full">
                    <Image
                        src={defaultImage ?? image}
                        width={50}
                        height={50}
                        alt='resim'
                        className='flex-shrink-0 rounded-full'
                    />
                </div>
                <div className="detail flex flex-col w-[80%] ">
                    <Link href={`users/${username}`}>
                        <p className='text-[#292929] text-base'>{username}</p>
                    </Link>
                    <p className='text-[#757575] text-sm '>{bio}</p>
                </div>
            </div>
            <div className="right">
                <Button label={isFollowing ? "Following" : "Follow"} onClick={toggleFollow} secondary={!isFollowing}
                />
            </div>
        </div>
    )
}

export default UserSummaryCard
