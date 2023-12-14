import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/core';
import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';

export default function EditNews({ auth, myNews }) {
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
      id: myNews.id,
      title,
      description,
      category
    };
    router.patch(route('news.update'), data);

    titleRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Edit News #{myNews.id}
        </h2>
      }
    >
      <Head title='Dashboard' />

      <div className='py-12 flex flex-col gap-4'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <Link
              href={route('dashboard')}
              className='link'
            >
              Back
            </Link>
            <input
              type='text'
              placeholder='Title'
              className='m-2 input input-bordered w-full'
              ref={titleRef}
              defaultValue={myNews.title}
            />
            <input
              type='text'
              placeholder='Description'
              className='m-2 input input-bordered w-full'
              ref={descriptionRef}
              defaultValue={myNews.description}
            />
            <input
              type='text'
              placeholder='Category'
              className='m-2 input input-bordered w-full'
              ref={categoryRef}
              defaultValue={myNews.category}
            />
            <button
              className='btn btn-primary m-2'
              onClick={handleSubmit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
