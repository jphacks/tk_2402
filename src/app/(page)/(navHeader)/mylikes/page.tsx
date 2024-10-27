import LikeButton from "@/app/components/likeButton";
import Image from "next/image";
import { prisma } from "../../../../../prisma/client";
import { auth } from "@/lib/auth";
import PublishButton from "@/app/components/publishButton";
import ReviewButton from "@/app/components/mylikes/ReviewButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineShoppingCart } from "react-icons/hi";

const MyLikes = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const likedBooks = await prisma.userBook.findMany({
    where: {
      userid: session.user?.id,
    },
    include: {
      Book: true,
    },
  });

  // 各本のIDに関連するレビューを取得
  const bookIds = likedBooks.map((book) => book.bookid);
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

  return (
    <div>
      <div className="bg-[url('https://utfs.io/f/lR4Tr45NRivGDEQJoNnRQrlW8K40noxwEp9BImqjkTeOai6L')] bg-cover bg-[rgba(0,0,0,0.60)] bg-blend-overlay bg-fixed">
        <div className="flex flex-col min-h-screen">
          <div className="container mx-auto p-4 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl text-white">My本棚</h1>
              <PublishButton userId={session.user?.id || ""} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {likedBooks.map((book) => (
                <div
                  key={book.id}
                  className="p-2 rounded h-[400px] overflow-y-scroll bg-stone-600 text-white"
                >
                  <div className="flex justify-end">
                    <LikeButton
                      userId={session.user?.id || ""}
                      bookId={book.bookid}
                      bookData={{
                        title: book.Book.title,
                        thumbnailURL: book.Book.thumbnailURL || "",
                        saleability: book.Book.saleability === true,
                        buyLink: book.Book.buyLink || "",
                        preview: book.Book.preview === true,
                        previewLink: book.Book.previewLink,
                        description:
                          book.Book.description || "説明がありません。",
                      }}
                      isFavorite={true}
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{book.Book.title}</h2>
                  {book.Book.thumbnailURL && (
                    <div className="flex justify-center">
                      <Image
                        src={book.Book.thumbnailURL}
                        alt={book.Book.title}
                        width={128}
                        height={200}
                        objectFit="cover"
                        className="rounded mt-2 mb-2"
                      />
                    </div>
                  )}
                  <p className="mb-2">
                    {book.Book.description?.replace(/<wbr>/g, "")}
                  </p>
                  {book.Book.saleability === true && book.Book.buyLink && (
                    <div className="text-right">
                      <Button className="rounded bg-stone-700 mb-2">
                        <Link
                          href={book.Book.buyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white flex items-center gap-1"
                        >
                          <HiOutlineShoppingCart />
                          購入リンク
                        </Link>
                      </Button>
                    </div>
                  )}
                  <hr />
                  <div>
                    <p className="font-semibold">レビュー</p>
                    {reviewsByBookId[book.bookid]?.map((review) => (
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
                  <div className="text-right">
                    <ReviewButton
                      bookId={book.bookid}
                      userId={session.user?.id || ""}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLikes;
