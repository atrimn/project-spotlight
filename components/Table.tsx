// table that is used to display rows and colums of data
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function CardTable() {
  const supabase = createServerComponentClient({ cookies })
  const { data, error } = await supabase.functions.invoke('get_rooms', {
    body: {},
  })

  console.log(error)

  console.log(data)

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-1'>
      {data.data?.map((room: any) => (
        <div
          key={room.id}
          className='relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400'
        >
          <div className='flex-shrink-0'>
            {/* <img
              className='h-10 w-10 rounded-full'
              src={p.imageUrl}
              alt=''
            /> */}
          </div>
          <div className='min-w-0 flex-1'>
            <a href='#' className='focus:outline-none'>
              <span className='absolute inset-0' aria-hidden='true' />
              <p className='text-sm font-medium text-gray-900'>
                {room.room_name}
              </p>
              <p className='truncate text-sm text-gray-500'>
                {room.room_description}
              </p>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
