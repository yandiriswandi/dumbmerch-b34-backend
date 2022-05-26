const {product,categoryproduct,category} = require('../../models');

exports.getCelana = async (req, res) => {
    // code here
    try {

        // return console.log(req.params);
        const { id } = req.params
        // const id = req.params.id

        const data = await category.findAll({
            where: {
                name: "celana"
            },
            include: {
                model: product,
                as: 'products',
                through: {
                  model: categoryproduct,
                  as: 'bridge',
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt'],
                },
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
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
    exports.getBaju = async (req, res) => {
    // code here
    try {

    // return console.log(req.params);
    const { id } = req.params
    // const id = req.params.id

    const data = await category.findAll({
        where: {
            name: "baju"
        },
        include: {
            model: product,
            as: 'products',
            through: {
                model: categoryproduct,
                as: 'bridge',
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
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


