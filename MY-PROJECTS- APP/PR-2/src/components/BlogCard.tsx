type Props = {
  title: string;
  desc: string;
  img: string;
  category?: string;
  date?: string;
  readTime?: string;
};

const BlogCard = ({ title, desc, img, category = "Technology", date = "Dec 12, 2024", readTime = "5 min read" }: Props) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <div className="relative overflow-hidden">
        <img 
          src={img} 
          className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
        
        <div className="mt-4 flex items-center text-purple-600 text-sm font-semibold">
          Read article 
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;