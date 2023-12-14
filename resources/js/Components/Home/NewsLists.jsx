import { Link } from '@inertiajs/react';

const NewsLists = ({ newsLists, allowEdit }) => {
  return newsLists ? (
    newsLists.map((news, i) => (
      <div
        className='card w-full lg:w-96 bg-base-100 shadow-xl'
        key={i}
      >
        <figure>
          <img
            src='https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'
            alt={news.title}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{news.title}</h2>
          <p>{news.description}</p>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>{news.category}</div>

            {allowEdit ? (
              <>
                <Link
                  href={route('news.edit')}
                  method='get'
                  data={{ id: news.id }}
                  as='button'
                  className='badge badge-outline'
                >
                  Edit
                </Link>
                <Link
                  href={route('news.destroy')}
                  method='delete'
                  data={{ id: news.id }}
                  as='button'
                  className='badge badge-outline'
                >
                  Delete
                </Link>
              </>
            ) : (
              <div className='badge badge-outline'>{news.author}</div>
            )}
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No News Found For Now!</p>
  );
};

export default NewsLists;
