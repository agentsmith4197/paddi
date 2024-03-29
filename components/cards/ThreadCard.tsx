// "use client"
// "use client"
import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
// import { useState } from "react";


interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  // images: string[];
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  // images,
}: Props) {
  // const [showAllImages, setShowAllImages] = useState(false);
  // const displayedImages = images.slice(0, 4);
  // const displayedImages = showAllImages ? images : images.slice(0, 4);
  return (
    <article
      className={`flex w-full h-auto flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author.name}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            {/* <div className="grid grid-cols-2">
        {/* Render displayed images
        {displayedImages.map((imageUrl, index) => (
          <div key={index} className="image-box">
            <Image
              src={imageUrl}
              alt={`Image ${index + 1}`}
              layout="responsive"
              width={200}
              height={200}
              objectFit="cover"
              className="file_uploader-img" 
            />
          </div>
        ))}
         Add more button if there are more than 4 images 
        {images && images.length > 4 && (
          <div className="relative">
            <button
            
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none"
            >
              <span className="text-3xl">+</span>
            </button>
          </div> */}

      {/* //    <div className="flex flex-1 justify-center h-10 w-auto p-3 lg:p-7 col-2 gap-4">
      //    {images && images.slice(0, 4).map((imageUrl, index) => (
      //      <div key={index}  className="image-box">
      //        <Image
      //          src={imageUrl}
      //          alt={`Image ${index + 1}`}
      //          layout="cover"
      //          width={isComment ? 400 : 200} 
      //          height={isComment ? 300 : 10}
      //          objectFit="cover"
      //          className="file_uploader-img" 
      //        />
      //      </div>
      //    ))}
      //    {images && images.length > 4 && (
      //      <div className="flex items-center justify-center w-24 h-24 rounded-md bg-gray-200">
      //        <p className="text-xs text-gray-600">+{images.length - 4}</p>
      //      </div> 
          )}
       </div> */}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2'>
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
