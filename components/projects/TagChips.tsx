import Link from "next/link";
import { kebabCase } from "@/utils/utils";

function TagChips({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 list-none ${className ?? ""}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/projects/tag/${kebabCase(tag)}`}
            prefetch={false}
            className="inline-block rounded-md bg-fun-navy/80 hover:bg-fun-accent px-2 py-0.5 text-[11px] font-medium text-fun-gray-light hover:text-fun-navy-darkest transition-colors duration-150"
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default TagChips;
