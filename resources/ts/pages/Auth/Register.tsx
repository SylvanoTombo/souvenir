import { FormEventHandler, useEffect } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import InputError from '@/components/InputError';

export default function Register() {
  const form = useForm('post', route('register'), {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  useEffect(() => {
    return () => {
      form.reset('password', 'password_confirmation');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    form.submit();
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            value={form.data.name}
            className="mt-1"
            autoComplete="name"
            autoFocus
            onChange={(e) => form.setData('name', e.target.value)}
            onBlur={() => form.validate('name')}
          ></Input>
          <InputError message={form.errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={form.data.email}
            className="mt-1"
            autoComplete="username"
            onChange={(e) => form.setData('email', e.target.value)}
            onBlur={() => form.validate('email')}
          />
          <InputError message={form.errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={form.data.password}
            className="mt-1"
            autoComplete="new-password"
            onChange={(e) => form.setData('password', e.target.value)}
            onBlur={() => form.validate('password')}
            required
          />
          <InputError message={form.errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={form.data.password_confirmation}
            className="mt-1"
            autoComplete="new-password"
            onChange={(e) =>
              form.setData('password_confirmation', e.target.value)
            }
            onBlur={() => form.validate('password_confirmation')}
            required
          />
          <InputError
            message={form.errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Link
            href={route('login')}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Already registered?
          </Link>

          <Button className="ml-4" disabled={form.validating || form.hasErrors}>
            Register
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
