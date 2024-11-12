import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import React from 'react';
  import {Label} from '@/components/ui/label';
  import {Input} from '@/components/ui/input';
  import {Button} from '@/components/ui/button';
  
  function username() {
    return (
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Leetcode Cheat Detector</CardTitle>
          <CardDescription>this is used to find whether the person is cheater or not.</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="grid gap-2 items-start space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2 items-start space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
        <Button className="w-full">Create account</Button>
        </CardFooter>
      </Card>
    );
  }
  
  export default username;
  