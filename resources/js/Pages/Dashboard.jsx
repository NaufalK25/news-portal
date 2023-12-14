import NewsLists from '@/Components/Home/NewsLists';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/core';
import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function Dashboard({ auth, flash, myNewsLists }) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);

  const handleSubmit = () => {
    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const category = categoryRef.current.value.trim();

    if (!title || !description || !category) {
      return;
    }

    const data = {
      title,
      description,
      category
    };
    router.post(route('news.store'), data);

    titleRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  };

  useEffect(() => {
    if (!myNewsLists) {
      router.get(route('news.show'));
    }

    return;
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          My News
        </h2>
      }
    >
      <Head title='Dashboard' />

      <div className='py-12 flex flex-col gap-4'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div>
              {flash.message ? (
                <div
                  role='alert'
                  className='alert alert-success'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='stroke-current shrink-0 h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>{flash.message}</span>
                </div>
              ) : null}
            </div>
            <input
              type='text'
              placeholder='Title'
              className='m-2 input input-bordered w-full'
              ref={titleRef}
            />
            <input
              type='text'
              placeholder='Description'
              className='m-2 input input-bordered w-full'
              ref={descriptionRef}
            />
            <input
              type='text'
              placeholder='Category'
              className='m-2 input input-bordered w-full'
              ref={categoryRef}
            />
            <button
              className='m-2 btn btn-primary'
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>

        <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap items-center lg:items-stretch gap-4 px-4'>
          <NewsLists
            allowEdit={true}
            newsLists={myNewsLists}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
