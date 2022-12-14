import {
  findAllProductPdao,
  createProductPdao,
  deleteProductPdao,
  findOneProductPdao,
  findProductByNamePdao,
} from "../../Dao/ProductsDao.js";
import { findOneUserUdao } from "../../Dao/UserDao.js";
import authenticate from "../../Middleware/authenticate.js";


const ProductController = (app) => {
  app.get('/api/product/status', (req, res) => {
    res.json({"status": 'Products Controller API is up and running!'})
  });

  app.post("/api/product", async (req, res) => {
    const out = await findOneProductPdao(req.body.id);
    res.json({ success: true, products: out });
  });

  app.post("/api/products", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user.type !== "Dealer") {
      res.json({ success: false, products: {} });
      return;
    }
    const out = await findAllProductPdao();
    res.json({ success: true, products: out });
  });

  app.post("/api/add-product", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user.type !== "Dealer") {
      res.json({ success: false, products: {} });
      return;
    }
    const out = await createProductPdao(req.body.product);
    res.json({ success: true, products: out });
  });

  app.post("/api/remove-product", authenticate, async (req, res) => {
    const user = await findOneUserUdao(req.body.id);
    if (user.type !== "Dealer") {
      res.json({ success: false, products: {} });
      return;
    }
    const out = await deleteProductPdao(req.body.pid);
    res.json({ success: true, products: out });
  });

  app.post("/api/search-products", async (req, res) => {
    const out = await findProductByNamePdao(req.body.name);
    res.json({ success: true, products: out });
  });
};
export default ProductController;
