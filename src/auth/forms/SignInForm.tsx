import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { SigninValidationSchema } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
  const {toast} = useToast();
  const navigate = useNavigate();

  const {mutateAsync: signInAccount} = useSignInAccount();

  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  const form = useForm<z.infer<typeof SigninValidationSchema>>({
    resolver: zodResolver(SigninValidationSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof SigninValidationSchema>) {
    const session = await signInAccount(values);

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
      toast({title: 'Sign in failed, please try again later'});
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" className="w-20 h-20 mb-2" alt="logo" />
        <h2 className="h2-bold md:h3-bold pt-5 sm:pt-2">
          Welcome back
        </h2>
        <p className="text-light-3 small-medium md:nase-regular mt-2">
          To resume socializing, please sign in
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
                  <Input 
                    type="password" 
                    placeholder="enter your password" 
                    className="shad-input" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <Button type="submit" className="shad-button_primary">
            { 
              isUserLoading ? (
                <Loader size={16} />
              ) : "Sign in" 
            }
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account ? 
            <Link 
              to='/sign-up' 
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignInForm