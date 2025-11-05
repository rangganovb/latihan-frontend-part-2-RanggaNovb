export const users = [];
export let items = [];

export const getNextItemId = () => {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
};

// Data Dummy Yang Ditampilkan Agar Data Tidak Kosong Banget
items.push({
  id: getNextItemId(),
  title: "Tugas Pertama",
  description: "Pelajari koneksi backend dan frontend.",
  userId: "101112131415",
});
items.push({
  id: getNextItemId(),
  title: "Tugas Pertama Backend",
  description: "Implementasi Autentikasi dan CRUD.",
  userId: "101112131416",
});
