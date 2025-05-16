const Product = require("../models/product.model");
const { Op } = require("sequelize");

// CREATE (Buat Produk Baru)
exports.create = async (req, res) => {
  try {
    const { ID, Nama, Deskripsi, Harga, Kategori } = req.body;
    if (!ID || !Nama || !Deskripsi || !Harga || !Kategori) {
      return res.status(400).json({ message: "Semua field wajib diisi kecuali CreatedAt & UpdatedAt" });
    }
    const exists = await Product.findByPk(ID);
    if (exists) return res.status(400).json({ message: "ID sudah ada (tidak bisa duplikat)" });

    const newProduct = await Product.create({ ID, Nama, Deskripsi, Harga, Kategori, CreatedAt: new Date() });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ (Tampilkan Semua Produk)
exports.findAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    // Buat kondisi where
    const whereCondition = { DeletedAt: null };
    if (search) {
      whereCondition.Nama = { [Op.like]: `%${search}%` };
    }

    const result = await Product.findAndCountAll({
      where: whereCondition,
      order: [["CreatedAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      total: result.count,
      pages: Math.ceil(result.count / limit),
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (Perbarui Produk)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nama, Deskripsi, Harga, Kategori } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    if (product.DeletedAt) return res.status(400).json({ message: "Produk telah di-soft delete" });

    await product.update({ Nama, Deskripsi, Harga, Kategori, UpdatedAt: new Date() });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (Soft Delete Produk)
exports.softDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    if (product.DeletedAt) return res.status(400).json({ message: "Produk sudah di-soft delete" });

    await product.update({ DeletedAt: new Date() });
    res.json({ message: "Soft delete berhasil" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};