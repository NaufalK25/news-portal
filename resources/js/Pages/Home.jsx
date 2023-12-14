import NewsLists from '@/Components/Home/NewsLists';
import Pagination from '@/Components/Home/Pagination';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';

export default function Home({ auth, title, newsLists }) {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Head title={title} />
      <div className='flex flex-col gap-4'>
        <Navbar user={auth.user} />
        <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap items-center lg:items-stretch gap-4 px-4'>
          <NewsLists newsLists={newsLists.data} allowEdit={false} />
        </div>
        <div className='flex justify-center items-center p-4'>
          <Pagination meta={newsLists.meta} />
        </div>
      </div>
    </div>
  );
}
