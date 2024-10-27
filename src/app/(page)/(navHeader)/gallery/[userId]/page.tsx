import Image from "next/image";
import { prisma } from "../../../../../../prisma/client";
import { auth } from "@/lib/auth";
import LikeButton from "@/app/components/likeButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";

const UserBookshelf = async ({ params }: { params: { userId: string } }) => {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const currentUserId: string = session.user.id;

  const { userId } = params;

  const userBooks = await prisma.userBook.findMany({
    where: { userid: userId },
    include: {
      Book: true,
      user: true,
    },
  });

  // 各本のIDに関連するレビューを取得
  const bookIds = userBooks.map((book) => book.bookid);
  const reviews = await prisma.review.findMany({
    where: {
      bookid: { in: bookIds },
    },
    include: {
      user: true, // レビューを書いたユーザー情報を取得
    },
  });

  // 型定義
  type ReviewGroupedByBookId = {
    [key: string]: (typeof reviews)[0][];
  };

  // 本ごとに関連するレビューをグループ化
  const reviewsByBookId: ReviewGroupedByBookId = reviews.reduce(
    (acc, review) => {
      if (!acc[review.bookid]) acc[review.bookid] = [];
      acc[review.bookid].push(review);
      return acc;
    },
    {} as ReviewGroupedByBookId
  );

  const myFavoriteBooks = await prisma.userBook.findMany({
    where: { userid: currentUserId },
    select: { bookid: true },
  });

  const myFavoriteBookIds = myFavoriteBooks.map((book) => book.bookid);

  if (userBooks.length === 0) {
    return <p>このユーザーの本棚は空です。</p>;
  }

  const userName = userBooks[0]?.user?.name || "匿名ユーザー";

  return (
    <div className="bg-[url('https://utfs.io/f/lR4Tr45NRivGDEQJoNnRQrlW8K40noxwEp9BImqjkTeOai6L')] bg-cover bg-[rgba(0,0,0,0.60)] bg-blend-overlay bg-fixed">
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="text-5xl text-white mb-4">{userName}さんの本棚</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {userBooks.map((userBook) => {
              const isFavorite = myFavoriteBookIds.includes(userBook.bookid);

              return (
                <div
                  key={userBook.id}
                  className="overflow-y-scroll h-[400px] p-2 rounded bg-stone-600 text-white"
                >
                  <div className="flex justify-end">
                    <LikeButton
                      userId={currentUserId} // 明示的に型が保証された変数を使用
                      bookId={userBook.bookid}
                      bookData={{
                        title: userBook.Book.title,
                        thumbnailURL: userBook.Book.thumbnailURL || "",
                        saleability: userBook.Book.saleability === true,
                        buyLink: userBook.Book.buyLink || "",
                        preview: userBook.Book.preview === true,
                        previewLink: userBook.Book.previewLink,
                        description:
                          userBook.Book.description || "説明がありません。",
                      }}
                      isFavorite={isFavorite}
                    />
                  </div>
                  <h2 className="text-xl font-semibold">
                    {userBook.Book.title}
                  </h2>

                  {userBook.Book.thumbnailURL && (
                    <div className="flex justify-center">
                      <Image
                        src={userBook.Book.thumbnailURL}
                        alt={userBook.Book.title}
                        width={128}
                        height={200}
                        objectFit="cover"
                        className="rounded mt-2 mb-2"
                      />
                    </div>
                  )}
                  <p className="mb-2">
                    {userBook.Book.description.replace(/<wbr>/g, "")}
                  </p>
                  <div className="flex justify-end gap-2 mb-2">
                    {userBook.Book.previewLink && (
                      <Button className="rounded bg-stone-700">
                        <Link
                          href={userBook.Book.previewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <IoMdSearch />
                          プレビュー
                        </Link>
                      </Button>
                    )}
                    {userBook.Book.saleability && userBook.Book.buyLink && (
                      <Button className="rounded bg-stone-700 text-right">
                        <Link
                          href={userBook.Book.buyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white flex items-center gap-1"
                        >
                          <HiOutlineShoppingCart />
                          購入リンク
                        </Link>
                      </Button>
                    )}
                  </div>
                  <hr />
                  <div>
                    <p className="font-semibold">レビュー</p>
                    {reviewsByBookId[userBook.bookid]?.map((review) => (
                      <div key={review.id} className="mt-2 pt-2">
                        <div className="flex items-center mb-1">
                          <Image
                            src={review.user.image || "/default-avatar.png"}
                            alt={review.user.name || "User"}
                            width={32}
                            height={32}
                            className="rounded-full mr-2"
                          />
                          <p className="font-semibold">
                            {review.user.name || "匿名ユーザー"}
                          </p>
                        </div>
                        <p className="text-sm mb-2">{review.content}</p>
                        <p className="text-xs text-gray-200">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookshelf;
