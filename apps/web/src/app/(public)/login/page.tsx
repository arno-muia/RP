export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl text-stone-900">Sign in</h1>
        <p className="text-sm text-stone-600">
          NextAuth credentials provider (Phase 1, Week 2). Staff and members
          sign in here; role-based redirect to dashboard or ops.
        </p>
      </div>
    </div>
  );
}
