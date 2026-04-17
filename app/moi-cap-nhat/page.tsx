import { NovelListPage } from "@/components/NovelListPage";
import { NOVELS } from "@/lib/novels";

type UpdatedNovelsPageProps = {
  searchParams: Promise<{
    page?: string;
    genre?: string;
    sort?: string;
  }>;
};

export default async function UpdatedNovelsPage({
  searchParams,
}: UpdatedNovelsPageProps) {
  const { page, genre, sort } = await searchParams;
  const currentPage = Number(page) > 0 ? Number(page) : 1;

  return (
    <NovelListPage
      title="Truyện mới cập nhật"
      description="Danh sách truyện vừa có chương mới."
      novels={NOVELS}
      basePath="/moi-cap-nhat"
      currentPage={currentPage}
      selectedGenre={genre}
      selectedSort={sort}
    />
  );
}
