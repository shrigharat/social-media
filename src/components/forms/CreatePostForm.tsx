import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'
import { PostValidationSchema } from '@/lib/validation'
import { Models } from 'appwrite'
import { useCreatePost, useUpdatePost } from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'
import { toast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import { POST_FORM_ACTIONS } from '@/constants'
import Loader from '../shared/Loader'

type PostFormProps = {
    mode?: string,
    post?: Models.Document
}

const CreatePostForm = ({post, mode = POST_FORM_ACTIONS.CREATE_MODE}: PostFormProps) => {

    const navigate = useNavigate();
    const {mutateAsync: createPost, isPending: isCreating} = useCreatePost();
    const {mutateAsync: updatePost, isPending: isUpdating} = useUpdatePost();
    const {user} = useUserContext();

    const form = useForm<z.infer<typeof PostValidationSchema>>({
        resolver: zodResolver(PostValidationSchema),
        defaultValues: {
            caption: post ? post?.caption : '',
            file: [],
            location: post ? post?.location : "",
            tags: post ? post.tags.join(',') : ''
        },
    })

    async function onSubmit(values: z.infer<typeof PostValidationSchema>) {
        if(mode === POST_FORM_ACTIONS.CREATE_MODE) {
            const newPost = await createPost({...values, userId: user.id});
            if(!newPost) {
                return toast({
                    title: 'Could not create post. Please try again!',
                })
            }
            navigate('/');
        } else if(mode === POST_FORM_ACTIONS.EDIT_MODE && post) {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post.imageId,
                imageUrl: post.imageUrl,
            });
            if(!updatedPost) {
                toast({
                    title: 'Could not update post. Please try again!',
                });
                return navigate(`/posts/${post.$id}`);
            }
            toast({
                title: 'Post created successfully 🎊'
            })
        }

    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-5xl flex flex-col gap-9">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='shad-form_label'>Add photos</FormLabel>
                            <FormControl>
                                <FileUploader 
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className='shad-form_message' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='shad-form_label'>Caption</FormLabel>
                            <FormControl>
                                <Textarea 
                                    className='shad-textarea custom-scrollbar'
                                    placeholder="Enter a caption for your post" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage className='shad-form_message' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='shad-form_label'>Add location</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='Add a city, street, shop name'
                                    type='text' 
                                    className='shad-input' 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='shad-form_message' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='shad-form_label'>Add tags (separated by comma ,)</FormLabel>
                            <FormControl>
                                <Input 
                                    type='text' 
                                    placeholder='Sports, Drawing, Business'
                                    className='shad-input' 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='shad-form_message' />
                        </FormItem>
                    )}
                />
                <div className='flex gap-4 items-center justify-end'>
                    <Button 
                        type='button' 
                        className='shad-button_dark_4'
                        onClick={() => navigate('/')}
                    >
                        Clear
                    </Button>
                    <Button 
                        type="submit" 
                        className='shad-button_primary whitespace-nowrap'
                        disabled={isCreating || isUpdating} 
                    >
                        {
                            (isCreating || isUpdating) && <Loader size={18} />
                        }
                        { mode[0].toUpperCase() + mode.slice(1) } Post
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreatePostForm