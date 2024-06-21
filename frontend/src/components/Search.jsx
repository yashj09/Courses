import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

const CourseSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <main className="flex-1">
      <section className="py-8 px-4 md:px-6">
        <form className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <CiSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </form>
      </section>
    </main>
  );
};

export default CourseSearch;
