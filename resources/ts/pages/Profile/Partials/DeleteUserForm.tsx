import { FormEventHandler, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import InputError from '@/components/InputError';

export default function DeleteUserForm({
  className = '',
}: {
  className?: string;
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);

    reset();
  };

  const cancel: FormEventHandler = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <section className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog
            open={confirmingUserDeletion}
            onOpenChange={setConfirmingUserDeletion}
          >
            <DialogTrigger asChild>
              <Button variant="destructive" onClick={confirmUserDeletion}>
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete your account ?
                </DialogTitle>
                <DialogDescription>
                  Once your account is deleted, all of its resources and data
                  will be permanently deleted. Please enter your password to
                  confirm you would like to permanently delete your account.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={deleteUser}>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
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
                  placeholder="Password"
                />
                <InputError message={errors.password} className="mt-2" />
                <DialogFooter className="mt-4">
                  <Button
                    className="mt-2 sm:mt-0"
                    variant="outline"
                    onClick={cancel}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" disabled={processing}>
                    Delete Account
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </section>
  );
}
