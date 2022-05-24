// import necessary model here
const { 
  product, 
  user, 
  category, 
  categoryProduct,
  transaction,
  transactionProduct 
} = require('../../models');

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: categoryProduct,
            as: 'bridge',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: transaction,
          as: 'transaction',
          through: {
            model: transactionProduct,
            as: 'bridge',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    // const PATH ='http://localhost:500/uploads';
    // data = data.map((item) => {
    //   item.image = PATH + item.image;
    //   return item;
    // });
    //pemangilan setelah memakai env
    data = data.map((item) => {
      item.image = process.env.PATH_FILE + item.image;
      return item;
    });

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await product.findAll({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: categoryProduct,
            as: 'bridge',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      data: {
        product : data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    let data = req.body;

    data.idUser = req.user.id;
    data.image = req.file.filename;

    const newProduct = await product.create(data);

    const productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: categoryProduct,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    res.send({
      status: 'success',
      data: {
        productData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // code here
    const { id } = req.params;

    await product.update(req.body, {
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: categoryProduct,
            as: 'bridge',
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      message: `Update product id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: 'success',
      message: `Delete product id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};