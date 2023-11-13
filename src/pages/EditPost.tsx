import { useGetPostById } from '@/lib/react-query/queries';
import { useParams } from 'react-router-dom'
import Loader from '@/components/shared/Loader';
import CreatePostForm from '@/components/forms/CreatePostForm';
import { POST_FORM_ACTIONS } from '@/constants';

const EditPost = () => {
  const {id} = useParams();
  const { data: post, isLoading } = useGetPostById(id);

  console.log({post});
  
  return (
    <div className='flex flex-1'>
      <div className="common-container">
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
            <img 
              src="/assets/icons/edit.svg" 
              alt="" 
              width={36}
              height={36}
            />
            <h2 className='h3-bold md:h2-bold text-left w-full'>
              Edit Post
            </h2>
        </div>
        {
          isLoading ? 
            <Loader /> : 
            <CreatePostForm 
              mode={POST_FORM_ACTIONS.EDIT_MODE} 
              post={post} 
            />
        }
      </div>
    </div>
  )
}

export default EditPost