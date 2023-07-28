// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function ServerAction() {
  const addTodo = async (formData: FormData) => {
    'use server'
    const name = formData.get('title')
    const description = formData.get('desc')

    if (name && description) {
      // Create a Supabase client configured to use cookies
      const supabase = createServerActionClient({ cookies })

      try {
        const { data, error } = await supabase.functions.invoke('create_room', {
          body: JSON.stringify({ name: name, description: description }),
        })
        console.log(error)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <form className='flex gap-4 flex-col' action={addTodo}>
      <input name='title' />
      <input name='desc' />
      <input className='text-red-100' type='submit' />
    </form>
  )
}
