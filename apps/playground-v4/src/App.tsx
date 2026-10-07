import { useState, type FormEvent } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@gw/ui';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Signed in successfully as ${email}`);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Playground with Tailwind v4
        </h1>
      </header>

      {/* Buttons Showcase */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Buttons
        </h2>
        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-lg">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* Login Form (Card + 2 Inputs + Button) */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Sign In Form
        </h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={errorMessage}
              />
            </CardContent>

            <CardFooter className="pt-6 border-t border-slate-800">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={loading}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </div>
  );
}
