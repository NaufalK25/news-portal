import { Link } from '@inertiajs/react';

const Pagination = ({ meta }) => {
  const prev = meta.links[0].url;
  const next = meta.links[meta.links.length - 1].url;
  const current = meta.current_page;
  const total = meta.last_page;

  return (
    <div className='join'>
      <Link
        href={prev}
        className={`${!prev ? 'hidden' : ''} join-item btn`}
      >
        «
      </Link>
      <button className='join-item btn'>
        Page {current} / {total}
      </button>
      <Link
        href={next}
        className={`${!next ? 'hidden' : ''} join-item btn`}
      >
        »
      </Link>
    </div>
  );
};

export default Pagination;
