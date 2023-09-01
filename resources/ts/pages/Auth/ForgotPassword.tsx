import { FormEventHandler } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import InputError from '@/components/InputError';

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <form onSubmit={submit}>
        <Input
          id="email"
          type="email"
          name="email"
          value={data.email}
          className="mt-1"
          autoFocus
          onChange={(e) => setData('email', e.target.value)}
        />
        <InputError message={errors.email} className="mt-2" />

        <div className="mt-4 flex items-center justify-end">
          <Button className="ml-4" disabled={processing}>
            Email Password Reset Link
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
