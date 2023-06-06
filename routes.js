const express = require('express');
const router = express.Router();
const db = require('./database');
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Token no proporcionado o en formato incorrecto");
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'mi_secreto', (error, decodedToken) => {
    if (error) {
      console.log("Error en la verificación del token:", error.message);
      return res.sendStatus(401);
    }

    console.log("Token verificado correctamente");
    req.user = decodedToken;
    next();
  });
}


//-----------------------RESTAURANTES--------------------------------------------------

// Obtener todos los restaurantes
router.get('/restaurantes', (req, res) => {
  db.all('SELECT * FROM restaurant', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});


// Obtener un registro por ID
router.get('/restaurante/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM restaurant WHERE id = ?', [id], (error, row) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener el registro.');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send('Registro no encontrado.');
    }
  });
});

// Crear un nuevo registro
router.post('/restaurantes', authMiddleware, (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11 } = req.body;
  db.run('INSERT INTO restaurant (name,address,telephone,idu,gradesAverage,city,minPrice,contactemail,maxPrice,bikeFriendly,available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11], (error) => {
      if (error) {
        console.log("Insertando");
        res.status(500).send('Error al crear el registro.');
      } else {
        res.send('Registro creado correctamente.');
      }
    });
});

// Actualizar un registro existente
router.put('/restaurante/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  const { campo1, campo2, campo3, campo4, campo5, campo6, campo7} = req.body;
  db.run('UPDATE restaurant SET name = ?, address = ?, telephone = ?, city = ?, contactemail = ?, bikeFriendly = ?, available = ? WHERE id = ?',
    [campo1, campo2, campo3, campo4, campo5, campo6, campo7, id], (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el registro.');
      } else {
        res.json('Registro actualizado correctamente.');
      }
    });
});

// Eliminar un registro existente
router.delete('/restaurante/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM restaurant WHERE id = ?', [id], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.send('Registro eliminado correctamente.');
    }
  });
});


//----------------------------------USUARIOS-----------------------------------

// Obtener todos los usuarios
router.get('/usuarios', authMiddleware, (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});

// Obtener un usuario por ID
router.get('/usuario/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [id], (error, row) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener el registro.');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send('Registro no encontrado.');
    }
  });
});

// Crear un nuevo registro
router.post('/usuarios', authMiddleware, (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11 } = req.body;
  db.run('INSERT INTO users (email, password, name, surname) VALUES (?, ?, ?, ?)',
    [campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11], (error, row) => {
      if (error) {
      console.log(error);
      res.status(500).send('Error al obtener el registro.');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send('Registro no encontrado.');
    }
    });
});

// Actualizar un registro existente
router.put('/usuario/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  const { campo1, campo2, campo3} = req.body;
  db.run('UPDATE users SET password = ?, name = ?, surname = ? WHERE id = ?',
    [campo1, campo2, campo3, id], (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el registro.');
      } else {
        console.log(campo2 + " " + campo3);
        res.json({name: campo2, surname: campo3 });
      }
    });
});

// Eliminar un registro existente
router.delete('/usuario/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.json('Registro eliminado correctamente.');
    }
  });
});



//----------------------------------ORDERS-----------------------------------

// Obtener todos los pedidos
router.get('/pedidos/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM orders WHERE idu = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});

// Obtener un pedido por ID
router.get('/pedido/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM orders WHERE id = ?', [id], (error, row) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener el registro.');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send('Registro no encontrado.');
    }
  });
});

// Crear un nuevo registro
router.post('/pedidos', authMiddleware, (req, res) => {
  const { campo1, campo2 } = req.body;
  db.run('INSERT INTO orders (idu, totalPrice) VALUES (?, ?)',
    [campo1, campo2], function(error) {
      if (error) {
        console.log("Mal insercion de pedido");
        res.status(500).send('Error al crear el registro.');
      } else {
        console.log("Insertando pedido");
        const lastID = this.lastID;
        console.log(lastID);
        res.status(201).json(lastID);
      }
    });
});



// Actualizar un registro existente
router.put('/pedido/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  const { campo1, campo2, campo3, campo4 } = req.body;
  db.run('UPDATE orders SET idu = ?, totalPrice = ? WHERE id = ?',
    [campo1, campo2, campo3, campo4, id], (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el registro.');
      } else {
        res.send('Registro actualizado correctamente.');
      }
    });
});

// Eliminar un registro existente
router.delete('/pedido/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM orders WHERE id = ?', [id], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.json('Registro eliminado correctamente.');
    }
  });
});



//----------------------------------Platos-----------------------------------

// Obtener todos los platos
router.get('/platos', (req, res) => {
  db.all('SELECT * FROM dishes', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});

router.get('/platos/:id', (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM dishes WHERE idr = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});

// Obtener un plato por ID
router.get('/plato/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM dishes WHERE id = ?', [id], (error, row) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener el registro.');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send('Registro no encontrado.');
    }
  });
});

// Crear un nuevo plato
router.post('/platos', authMiddleware, (req, res) => {
  const { name, price, description, idr } = req.body;
  db.run('INSERT INTO dishes (name, price, description, idr) VALUES (?, ?, ?, ?)',
    [name, price, description, idr], (error) => {
      if (error) {
        console.log("Insertando");
        res.status(500).send('Error al crear el registro.');
      } else {
        res.json('Registro creado correctamente.');
      }
    });
});

// Actualizar un plato existente
router.put('/plato/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  const { name, price, description, idr } = req.body;
  db.run('UPDATE dishes SET name = ?, price = ?, description = ?, idr = ? WHERE id = ?',
    [name, price, description, idr, id], (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el registro.');
      } else {
        res.send('Registro actualizado correctamente.');
      }
    });
});

// Eliminar un plato existente
router.delete('/plato/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM dishes WHERE id = ?', [id], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.json('Registro eliminado correctamente.');
    }
  });
});

router.delete('/platos/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM dishes WHERE idr = ?', [id], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.send('Registro eliminado correctamente.');
    }
  });
});
  
  
  
  //----------------------------------CATEGORIES-----------------------------------
  // Obtener todas las categorías
  router.get('/categorias', (req, res) => {
  db.all('SELECT * FROM categories', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else if (rows) {
      console.log('Todas las categorias obtenidas correctamente');
      res.json(rows);
    } else {
      console.log('Registro no encontrado.');
      res.status(404).send('Registro no encontrado.');
    }
  });
});

// Obtener una categoría por ID
router.get('/categoria/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM categories WHERE id = ?', [id], (error, row) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener el registro.');
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).send('Registro no encontrado.');
    }
  });
});

// Crear una nueva categoría
router.post('/categorias', authMiddleware, (req, res) => {
  const { name, description } = req.body;
  db.run('INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description], (error) => {
      if (error) {
        console.log("Insertando");
        res.status(500).send('Error al crear el registro.');
      } else {
        res.send('Registro creado correctamente.');
      }
    });
});

// Actualizar una categoría existente
router.put('/categoria/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  db.run('UPDATE categories SET name = ?, description = ? WHERE id = ?',
    [name, description, id], (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el registro.');
      } else {
        res.send('Registro actualizado correctamente.');
      }
    });
});

// Eliminar una categoría existente
router.delete('/categoria/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM categories WHERE id = ?', [id], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.send('Registro eliminado correctamente.');
    }
  });
});





//----------------------------------ORDER DISHES-----------------------------------
// Obtener todos los orderDishes
router.get('/orderDishes', authMiddleware, (req, res) => {
  db.all('SELECT * FROM orderDishes', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});

// Obtener un registro por ID
router.get('/orderDishes/:id', authMiddleware, (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM orderDishes WHERE ido = ?', [id], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener los registros.');
    } else if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send('Registros no encontrados.');
    }
  });
});

// Crear un nuevo registro
router.post('/orderDishes', authMiddleware, (req, res) => {
  const { ido, iddi } = req.body;
  db.run('INSERT INTO orderDishes (ido, iddi) VALUES (?, ?)', [ido, iddi], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al insertar los registros.');
    } else{
      console.log("OrderDish insertado correctamente: ");
      const lastID = this.lastID;
      console.log(lastID);
      res.status(201).json(lastID);
    }
  });
});

// Actualizar un registro existente
router.put('/orderDish/:ido/:iddi', authMiddleware, (req, res) => {
  const ido = req.params.ido;
  const iddi = req.params.iddi;
  db.run('UPDATE orderDishes SET iddi = ? WHERE ido = ?', [iddi, ido], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al actualizar el registro.');
    } else {
      res.send('Registro actualizado correctamente.');
    }
  });
});

// Eliminar un registro existente
router.delete('/orderDishes/:ido/:iddi', authMiddleware, (req, res) => {
  const ido = req.params.ido;
  const iddi = req.params.iddi;
  db.run('DELETE FROM orderDishes WHERE ido = ? AND iddi = ?', [ido, iddi], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.send('Registro eliminado correctamente.');
    }
  });
});




//----------------------------------RESTAURANT CATEGORIES-----------------------------------
// Obtener todas las relaciones de restaurantes y categorías
router.get('/restaurantCategories', (req, res) => {
  db.all('SELECT * FROM restaurantCategories', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});

// Obtener las relaciones de un restaurante por ID
router.get('/restaurantCategorie/:id', (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM restaurantCategories WHERE idr = ?', [id], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al obtener los registros.');
    } else if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send('Registros no encontrados.');
    }
  });
});

// Crear una nueva relación entre restaurante y categoría
router.post('/restaurantCategories', authMiddleware, (req, res) => {
  const { idr, idct } = req.body;
  db.run('INSERT INTO restaurantCategories (idr, idct) VALUES (?, ?)', [idr, idct], (error) => {
    if (error) {
      res.status(500).send('Error al crear el registro.');
    } else {
      res.send('Registro creado correctamente.');
    }
  });
});

// Eliminar una relación entre restaurante y categoría existente
router.delete('/restaurantCategories/:idr/:idct', authMiddleware, (req, res) => {
  const idr = req.params.idr;
  const idct = req.params.idct;
  db.run('DELETE FROM restaurantCategories WHERE idr = ? AND idct = ?', [idr, idct], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.send('Registro eliminado correctamente.');
    }
  });
});




//----------------------------------REVIEWS-----------------------------------
// Obtener todas las reviews
router.get('/reviews', (req, res) => {
  db.all('SELECT * FROM reviews', (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      res.send(rows);
    }
  });
});

// Obtener reviews por id de restaurante y usuario
router.get('/reviews/:idr', (req, res) => {
  const idr = req.params.idr;
  db.all('SELECT * FROM reviews WHERE idr = ?', [idr], (error, row) => {
    if (error) {
      res.status(500).send('Error al obtener el registro.');
    } else if (row) {
      res.json(row);
    } else {
      console.log("registro no encontrado");
      res.status(404).send('Registro no encontrado.');
    }
  });
});

// Crear una nueva review
router.post('/reviews', authMiddleware, (req, res) => {
  const { idr, idu, review, grade } = req.body;
  db.run('INSERT INTO reviews (idr, idu, review, grade) VALUES (?, ?, ?, ?)',
    [idr, idu, review, grade], (error) => {
      if (error) {
        res.status(500).send('Solo una valoracion por cuenta');
      } else {
        res.json('Valoracion creada correctamente.');
      }
    });
});

// Actualizar una review existente
router.put('/reviews/:idr/:idu', authMiddleware, (req, res) => {
  const idr = req.params.idr;
  const idu = req.params.idu;
  const { review, grade } = req.body;
  db.run('UPDATE reviews SET review = ?, grade = ? WHERE idr = ? AND idu = ?',
    [review, grade, idr, idu], (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error al actualizar el registro.');
      } else {
        res.send('Registro actualizado correctamente.');
      }
    });
});

// Eliminar una review existente
router.delete('/reviews/:idr/:idu', authMiddleware, (req, res) => {
  const idr = req.params.idr;
  const idu = req.params.idu;
  db.run('DELETE FROM reviews WHERE idr = ? AND idu = ?', [idr, idu], (error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro.');
    } else {
      res.send('Registro eliminado correctamente.');
    }
  });
});


//----------------------LOGIN------------------------------------
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Realiza la consulta a la base de datos para verificar las credenciales del usuario
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, row) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al autenticar el usuario.');
    } else if (row) {
      // Si las credenciales son válidas, genera un token JWT con los datos del usuario y envía la respuesta
      const token = jwt.sign({ id: row.id, name: row.name, email: row.email, surname: row.surname }, 'mi_secreto', { expiresIn: '1h' });
      console.log("El token verificado es: " + token);
      res.json({ token, user: { id: row.id, name: row.name, email: row.email, surname: row.surname } });
      console.log("Creadenciales válidas");
    } else {
      res.status(401).send('Credenciales inválidas.');
    }
  });
});

router.get('/perfil', authMiddleware, (req, res) => {
  console.log("estoy autenticado");
  // El usuario está autenticado y se puede acceder a req.user para obtener sus datos
  res.json({ user: req.user });
});


//--------------------REGISTRAR-----------------------------------------
router.post('/registro', (req, res) => {
  const {email, password, name, surname } = req.body;
  // Realiza la consulta a la base de datos para verificar si el usuario ya existe
  db.get('SELECT * FROM users WHERE email = ?', [email], (error, row) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al registrar el usuario.');
    } else if (row) {
      // Si el usuario ya existe, envía una respuesta con un mensaje de error
      res.status(409).send('El usuario ya existe.');
    } else {
      // Si el usuario no existe, inserta el nuevo usuario en la base de datos
      db.run('INSERT INTO users (email, password, name, surname) VALUES (?, ?, ?, ?)', [email, password, name, surname], (error) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error al registrar el usuario.');
        } else {
          res.status(201).json({ message: 'El usuario ha sido registrado.' });
          console.log("usuario registrado con exito");
        }
      });
    }
  });
});

//---------------------------RESTAURANTES USUARIOS POR ID---------------------------------
router.get('/perfil/restaurantes/:id', (req, res) => {
  const id = req.params.id;
  db.all('SELECT * FROM restaurant WHERE idu = ?', [id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: 'Error al obtener los registros' });
    } else {
      console.log("Restaurantes obtenidos correctamente");
      res.send(rows);
    }
  });
});

module.exports = router;
