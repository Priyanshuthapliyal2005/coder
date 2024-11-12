import React, { useState } from 'react';
import { useUserId } from './UserIdContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SiCodeforces } from 'react-icons/si';
import { Checkbox } from '@/components/ui/checkbox';

export default function Component() {
  const [form, setForm] = useState({
    input: "",
    agreement: false,
  });
  const [loading, setLoading] = useState(false);
  const { setUserId } = useUserId();

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked) => {
    setForm((prevForm) => ({
      ...prevForm,
      agreement: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setUserId(form.input);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md h-auto border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md hover:border-gray-500 dark:hover:border-gray-500">
        <CardHeader>
          <div className="flex items-center justify-center">
            <SiCodeforces className="mr-2" />
            <CardTitle className="text-xl">Codeforces</CardTitle>
          </div>
        </CardHeader>
        <div className="text-center p-4">
          <p className="text-md text-gray-600">Enter your Codeforces user ID to fetch your stats.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4">
              <Label htmlFor="userId" className="text-lg">User ID</Label>
              <Input
                id="input"
                type="text"
                placeholder="Enter User ID"
                value={form.input}
                onChange={handleChange}
                className="text-lg p-2 text-center w-full border-2 border-gray-300 dark:border-gray-700"
                aria-label="User ID"
                required
              />
            </div>
            <div className="items-top flex space-x-2 mt-4">
              <Checkbox
                id="agreement"
                checked={form.agreement}
                onCheckedChange={handleCheckboxChange}
                required
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="agreement"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree to our{' '}
                  <a 
                    href="/terms-and-conditions" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-blue-600 hover:text-blue-800 underline"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a 
                    href="/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-blue-600 hover:text-blue-800 underline"
                  >
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full py-2 text-lg"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
