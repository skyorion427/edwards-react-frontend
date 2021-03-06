const models = require('../../../models');
const Selection = models.Selection;
const Sequelize = require('sequelize');

module.exports = (req, res) => {
  const step = {
    id: req.body.id,
    type: req.body.type,
    value: req.body.value
  };

  Selection.findById(req.params.id)
           .then(selection => {
             if (!selection) {
               return res.sendStatus(404);
             }

             selection.updateSteps(step)
                      .then(selection => selection.getData())
                      .then(selectionData => res.json(selectionData))
                      .catch(Sequelize.ValidationError, error => {
                        res.status(400).send(error);
                      });
           });
}
