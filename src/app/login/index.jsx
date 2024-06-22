import React, { useEffect }  from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from 'react-router-dom';
import useNavigation from 'src/libs/navigate';
import Link from 'src/libs/Link';
import { cn } from 'src/libs/utils';
import { Button, buttonVariants } from "@/components/ui/button"
import { LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"



import {useLogin} from "src/libs/useLogin"

export default function LoginPage(){

  return (
    // You could have a loading skeleton as the `fallback` too
    <>
      <div className="lg:max-w-none container relative hidden h-[90vh] flex-col items-center justify-center md:grid lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Signup
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Your gateway to building powerful,
                scalable, and engaging applications!&rdquo;
              </p>
              <footer className="text-sm">Sandeep Yadav</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[480px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to SignIn into your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}



const loginSchema =  z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
  
});



function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [googleOAuthLoading, setGoogleOAuthLoading] = React.useState(false)
  const [githubOAuthLoading, setGithubOAuthLoading] = React.useState(false)
  const [nextUrl, setNextUrl] = React.useState("/")

  const [loginUser] = useLogin()

  const [searchParams] = useSearchParams();
  const navigate = useNavigation();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues:{
        email:"",
        password:"",
    },
    mode: "onChange",
  })

  const onSubmit = async (payload) => {

    setIsLoading(true)
    console.log({payload})
    // sendPostRequest("/oAuth/credentials",payload)
    loginUser("credentials",payload)
    setIsLoading(false)
    
  };

  useEffect(()=>{
    setNextUrl(searchParams.get("next_url")||"/")
  },[searchParams])

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="abc@xyz.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button className='w-full mt-4' type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
          <p className='text-center'>OR</p>
          <Button onClick={()=>{setGoogleOAuthLoading(true);loginUser("google")}} className='w-full mt-4' type="submit" disabled={googleOAuthLoading}>
            {googleOAuthLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            <a >Sign In with Google</a>
          </Button>
          <Button onClick={()=>{setGithubOAuthLoading(true);loginUser("github")}} className='w-full mt-4' type="submit" disabled={githubOAuthLoading}>
            {githubOAuthLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            <a >Sign In with Github</a>
          </Button>
        </form>
      </Form>
    </div>
  );
}