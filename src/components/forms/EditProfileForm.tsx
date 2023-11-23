import { useUpdateUser } from '@/lib/react-query/queries';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { ProfileUpdateValidationScheme } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useEffect, useState } from 'react';
import { Models } from 'appwrite';
import { useToast } from '../ui/use-toast';
import Loader from '../shared/Loader';

type EditProfileFormType = {
    user: Models.Document;
}

const EditProfileForm = ({user}: EditProfileFormType) => {

    const navigate = useNavigate();
    const {toast} = useToast()
    const {mutateAsync: updateProfile, isPending: isUpdating} = useUpdateUser();
    const [selectedFile, setSelectedFile] = useState('');

    const form = useForm<z.infer<typeof ProfileUpdateValidationScheme>>({
        resolver: zodResolver(ProfileUpdateValidationScheme),
        defaultValues: {
            username: user ? user.username : '',
            name: user ? user.name : '',
            bio: user ? user?.bio : '',
            imageUrl: user ? user?.imageUrl : '',
            imageId: user ? user?.imageId: '',
            file: [],
        },
    });
    

    useEffect(() => {        
        if(user) {
            setSelectedFile(user.imageUrl || '/assets/icons/profile-placeholder.svg');
        }
    }, [user])

    const handleFileSelect = (e: any) => {
        e.preventDefault();
        form.setValue('file', e.target.files);
        setSelectedFile(URL.createObjectURL(form.getValues().file?.[0]))
    }

    const onSubmit = async (values: z.infer<typeof ProfileUpdateValidationScheme>) => {        
        const updatedProfile = await updateProfile({...values, userId: user.$id});
        if(!updatedProfile) {
            toast({
                title: 'Profile could not be updated, please try again!',
            });
        } else {
            toast({
                title: 'Profile updated successfully!',
            });
            navigate(`/profile/${user.$id}`);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full sm:w-1/2 flex flex-col justify-start gap-4'>
                <div className="flex justify-start items-center gap-3">
                    <img 
                        src={selectedFile}
                        alt="creator"
                        className='w-12 lg:h-12 rounded-full' 
                    />
                    <input type="file" onChange={handleFileSelect} />
                </div>
                
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='shad-form_label'>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='Enter '
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='shad-form_label'>Username</FormLabel>
                            <FormControl>
                                <Input 
                                    type='text' 
                                    placeholder='eg. johndoe0123'
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
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='shad-form_label'>Bio</FormLabel>
                            <FormControl>
                                <Textarea 
                                    className='shad-textarea custom-scrollbar'
                                    placeholder="Enter a bio for your profile" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage className='shad-form_message' />
                        </FormItem>
                    )}
                />
                <div className='flex gap-4 items-center justify-end'>
                    <Button 
                        type="submit" 
                        className='shad-button_primary whitespace-nowrap'
                        disabled={isUpdating} 
                        onClick={(_) => onSubmit(form.getValues())}
                    >
                        {
                            isUpdating && <Loader thickness={1} size={16} />
                        }
                        Update Profile
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EditProfileForm