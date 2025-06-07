export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full bg-slate-700 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
