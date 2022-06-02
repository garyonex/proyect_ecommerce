import { Router } from 'express';
import multer from 'multer';
const router = Router();
const path = require('path');
import Container from '../container';
const productos = new Container(
    path.join(__dirname, '../dataBase/products.json')
);

//multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/upload'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
//middleware
router.use(
    multer({
        storage: storage,
        dest: path.join(__dirname, '../public/uploads'),
    }).single('imagen')
);

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/add/add-productos', (req, res) => {
    res.render('addProducts');
});
router.get('/login', (req, res) => {
    const user = true;
    if (user === true) {
        res.status(200).render('login', res.redirect('/add/add-productos'));
    } else {
        res.status(404).render('404', {
            titulo: 'error',
            description: 'Pagina no encontrada',
        });
    }
});

//Cargar productos
router.get('/productos', async (req, res) => {
    const product = await productos.getAll();
    res.render('carts', { product: product });
});
router.post('/load-product', async (req, res) => {
    const producto = req.body;
    const img = req.file;
    producto.thumbnail = '../upload/' + img.filename;
    await productos.save(producto);
   
    res.redirect('/add/add-productos');
});

router.get('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productos.getById(id);
    res.json(product);
});
export { router };
