import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../../../prisma/client";
import { auth } from "@/lib/auth";

const Gallery = async () => {
  const session = await auth();
  if (!session) return null;

  const fetchUsers = await prisma.user.findMany({
    where: {
      public: true,
      userBook: {
        some: {}
      }
    },
  });
  
  return (
    <div>
      <div className="bg-[url('https://utfs.io/f/lR4Tr45NRivGDEQJoNnRQrlW8K40noxwEp9BImqjkTeOai6L')] bg-cover bg-[rgba(0,0,0,0.60)] bg-blend-overlay bg-fixed">
        <div className="flex flex-col min-h-screen">
          <div className="container mx-auto p-4 flex-grow">
            <h1 className="text-5xl mb-4 text-white">本棚ギャラリー</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fetchUsers.map((user, index) => (
                <GalleryCard
                  key={index}
                  userId={user.id}
                  userName={user.name || ""}
                  userPhotoURL={user.image || ""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryCard = async ({
  userId,
  userName,
  userPhotoURL,
}: {
  userId: string;
  userName: string;
  userPhotoURL: string;
}) => {
  const fetchUserBooks = await prisma.userBook.findMany({
    where: {
      userid: userId
    },
    include: {
      Book: true
    },
    take: 3,
  })
  return (
    <Link href={`/gallery/${userId}`}>
      <div className="border p-4 rounded shadow-md cursor-pointer bg-white">
        <div className="flex items-center mb-4">
          <Image
            src={userPhotoURL}
            alt={userName}
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="text-lg font-semibold ml-3">{userName}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {fetchUserBooks.map((book) => (
            <div key={book.id} className="flex justify-center">
              {book && (
                <Image
                  src={book.Book.thumbnailURL}
                  alt={book.Book.title}
                  width={100}
                  height={150}
                  objectFit="cover"
                  className="rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Gallery;
