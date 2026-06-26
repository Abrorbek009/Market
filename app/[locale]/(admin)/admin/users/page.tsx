const users = [
  { id: "u1", name: "Aziza Karimova", role: "BUYER", status: "Faol" },
  { id: "u2", name: "Tech Plaza", role: "SELLER", status: "Tekshiruvda" },
  { id: "u3", name: "Admin Team", role: "ADMIN", status: "Faol" }
];

export default function AdminUsersPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Foydalanuvchilar</h1>
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-soft">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="px-5 py-4">Ism</th>
              <th className="px-5 py-4">Rol</th>
              <th className="px-5 py-4">Holat</th>
              <th className="px-5 py-4">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-5 py-4 font-medium">{user.name}</td>
                <td className="px-5 py-4">{user.role}</td>
                <td className="px-5 py-4">{user.status}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="rounded-full bg-primary px-4 py-2 text-white">Rolni o&apos;zgartirish</button>
                    <button className="rounded-full border px-4 py-2">Bloklash</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
