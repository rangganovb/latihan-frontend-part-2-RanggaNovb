import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Navbar } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Mengambil token dari localStorage dan menambahkannya ke header Authorization
  const getTokenHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Mengambil data dari server (GET /items) dan menangani kasus token tidak valid
  const fetchData = async () => {
    try {
      const res = await api.get("/items", getTokenHeader());
      setItems(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.response);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // Untuk proses tambah dan edit data (POST/PUT)
  const handleSave = async () => {
    try {
      if (editId) {
        await api.put(`/items/${editId}`, form, getTokenHeader());
      } else {
        await api.post("/items", form, getTokenHeader());
      }
      setForm({ title: "", description: "" });
      setEditId(null);
      setShow(false);
      fetchData();
    } catch {
      alert("Gagal menyimpan data.");
    }
  };

  // Menghapus data dari server berdasarkan ID (DELETE /items/:id)
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      await api.delete(`/items/${id}`, getTokenHeader());
      fetchData();
    } catch {
      alert("Gagal menghapus data.");
    }
  };

  useEffect(() => {
    fetchData(); // Memuat data saat komponen pertama kali dirender
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>CRUD Dashboard</Navbar.Brand>
          <Button
            variant="outline-danger"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Daftar Item</h3>
          <Button onClick={() => setShow(true)}>Tambah Data</Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => {
                      setForm({
                        title: item.title,
                        description: item.description,
                      });
                      setEditId(item.id);
                      setShow(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal
          show={show}
          onHide={() => {
            setForm({ title: "", description: "" });
            setEditId(null);
            setShow(false);
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{editId ? "Edit Data" : "Tambah Data"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setForm({ title: "", description: "" });
                setEditId(null);
                setShow(false);
              }}
            >
              Batal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
