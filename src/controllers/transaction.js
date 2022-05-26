const { user, transaction, product,transactionProduct } = require('../../models')

exports.getTransactions = async (req, res) => {
    try {

        const data = await transaction.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idBuyer', 'idSeller', 'idProduct']
            },
            include: [
                {
                    model: product,
                    as: 'product',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                    }
                },
                {
                    model: user,
                    as: 'buyer',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: user,
                    as: 'seller',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'status']
                    }
                },
                {
                    model: product,
                    as: 'products',
                    through: {
                      model: transactionProduct,
                      as: 'bridge',
                    },
                    attributes: {
                      exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ]
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
};

exports.getTransaction = async (req, res) => {
    try {

        const { id } = req.params;

        const data = await transaction.findAll({
          where: {
            id,
          },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'idBuyer', 'idSeller', 'idProduct']
        },
        include: [
            {
                model: product,
                as: 'product',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'idUser', 'qty', 'price']
                }
            },
            {
                model: user,
                as: 'buyer',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'status']
                }
            },
            {
                model: user,
                as: 'seller',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'status']
                }
            },
            ]
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
};

exports.addTransaction = async (req, res) => {
  try {
    let data = req.body;
    let buyer = req.user; 

    const dataproduct = await product.findOne({
        attributes:{
            exclude:['name','desc','image','qty','createdAt','updatedAt']
        },
        where:{
            id: data.idProduct,
        },
      });

      const dataseller = await user.findOne({
        attributes:{
            exclude:['email','password','createdAt','updatedAt','name','status']
        },
        where:{
            id: dataproduct.idUser,
        },
      });

      if(!data.price){
        data = {
            ...data,
            price: dataproduct.price,
            status: "success"
        };
    };

    await transaction.create({
        idProduct: data.idProduct,
        idBuyer: buyer.id,
        idSeller: dataseller.id,
        price: data.price,
        status: data.status
    });

    res.send({
        status: 'success',
        data: {
            transaction: {
                id: data.id,
                idProduct: data.idProduct,
                idBuyer: buyer.id,
                idSeller: dataseller.id,
                price: data.price
            }
        }
    })

} catch (error) {
    console.log(error)
    res.send({
        status: 'failed',
        message: 'Server Error',
    })
}
}
//     try {
//         const data = req.body

//         await transaction.create(data)

//         res.send({
//             status: 'success',
//             message: 'Add transaction finished'
//         })

//     } catch (error) {
//         console.log(error)
//         res.send({
//             status: 'failed',
//             message: 'Server Error'
//         })
//     }
// };

exports.updateTransaction = async (req, res) => {
    try {
      const { id } = req.params;
  
      await transaction.update(req.body, {
        where: {
          id,
        },
      });
  
      res.send({
        status: 'success',
        message: `Update transaction id: ${id} finished`,
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: 'success',
      message: `Delete transaction id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};