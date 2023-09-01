import { FormEventHandler, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

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

export default function UpdatePasswordForm({
  className = '',
}: {
  className?: string;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
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
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Ensure your account is using a long, random password to stay secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={updatePassword} className="max-w-xl space-y-6">
            <div>
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                type="password"
                name="current_password"
                value={data.current_password}
                className="mt-1"
                autoComplete="current-password"
                onChange={(e) => setData('current_password', e.target.value)}
                required
                ref={currentPasswordInput}
              />
              <InputError message={errors.current_password} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1"
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                required
                ref={passwordInput}
              />
              <InputError message={errors.password} className="mt-2" />
            </div>

            <div>
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1"
                autoComplete="new-password"
                onChange={(e) =>
                  setData('password_confirmation', e.target.value)
                }
                required
              />
              <InputError
                message={errors.password_confirmation}
                className="mt-2"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
