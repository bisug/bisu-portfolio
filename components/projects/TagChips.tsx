import Link from "next/link";
import { kebabCase } from "@/utils/utils";

function TagChips({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-1.5 list-none ${className ?? ""}`}
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/projects/tag/${kebabCase(tag)}`}
            prefetch={false}
            className="inline-flex min-h-[44px] items-center rounded-md bg-fun-navy/80 hover:bg-fun-accent px-3 py-1.5 text-xs font-medium text-fun-gray-light hover:text-fun-navy-darkest transition-colors duration-150"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagChips;
