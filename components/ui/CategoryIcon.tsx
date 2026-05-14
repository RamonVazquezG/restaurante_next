import { Category } from '../../generated/prisma/client'
import Image from "next/image"
import Link from "next/link"

type CategoryIconProps = {
  category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
  return (
    // Make the whole category container a link for better UX
    <Link
      href={`/order/${category.slug}`}
      aria-label={`Ver ${category.name}`}
      className="flex items-center gap-4 border-t border-gray-200 last-of-type:border-b p-4 transform transition-transform duration-150 ease-in-out hover:translate-x-1 hover:bg-gray-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-md">

      <div className="w-16 h-16 relative ">
        <Image
          fill
          src={`/icon_${category.slug}.svg`}
          alt={`Icono de ${category.name}`}
        />

      </div>

      <span className='text-xl font-bold'>
        {category.name}
      </span>

    </Link>
  )
}