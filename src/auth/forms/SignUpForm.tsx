import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { SignupValidationSchema } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";

const SignUpForm = () => {
  const {toast} = useToast();
  const navigate = useNavigate();

  const {mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  const {checkAuthUser} = useUserContext();

  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    const newUser = await createUserAccount(values);
    if(!newUser) {
      return toast({
        title: "Sign up failed, please try again!"
      });
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if(!session) {
      return toast({
        title: "Sign in failed, please try again!"
      })
    }
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast({title: 'Signup failed, please try again later'});
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h2-bold md:h3-bold pt-5 sm:pt-2">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:nase-regular mt-2">To start using Snapgram, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="johndoe123" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="johndoe@email.com" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="enter a strong password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <Button type="submit" className="shad-button_primary">
            { 
              isCreatingUser || isSigningIn ? (
                <Loader size={18} />
              ) : "Sign up" 
            }
          </Button>
          <p className="text-small-reguar text-light-2 text-center mt-2">
            Already have an account ? 
            <Link 
              to='/sign-in' 
              className="text-primary-500 text-small-semibold ml-1">
                Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm