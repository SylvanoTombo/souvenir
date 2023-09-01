import { FormEventHandler, useEffect } from 'react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useToast } from '@/components/ui/Toast';
import InputError from '@/components/InputError';

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;
  const { toast } = useToast();

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('profile.update'), { preserveScroll: true });
  };

  useEffect(() => {
    if (recentlySuccessful) {
      toast({
        description: 'Updated successfully',
      });
    }
  }, [recentlySuccessful]);

  return (
    <section className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account's profile information and email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="max-w-xl space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                className="mt-1"
                autoComplete="name"
                onChange={(e) => setData('name', e.target.value)}
                autoFocus
                required
              />
              <InputError className="mt-2" message={errors.name} />
            </div>

            <div />

            {mustVerifyEmail && user.email_verified_at === null && (
              <div>
                <p className="mt-2 text-sm text-gray-800">
                  Your email address is unverified.
                  <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Click here to re-send the verification email.
                  </Link>
                </p>

                {status === 'verification-link-sent' && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    A new verification link has been sent to your email address.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
