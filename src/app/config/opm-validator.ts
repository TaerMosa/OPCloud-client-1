const joint = require('rappid');

export function opmRuleSet(validator, graph) {
  validator.validate(
    "change:target change:source",
    function (err, command, next) {
      if (command.data.type === 'opm.Link') {
        const link = graph.getCell(command.data.id);
        if ((null === link.getTargetElement())) {
          link.attributes.target.type = null;
          return next('A link must connect to a target element!');
        }
        else if(link.getTargetElement().id == link.getSourceElement().get('parent')){
          link.attributes.target.type = null;
          return next('A state cannot be connected to his object!');
        }
        if ((link.getSourceElement().attributes.type == 'basic.Rect') && (link.getTargetElement().attributes.type == 'basic.Rect')) {
          link.attributes.target.type = null;
          return next('A link cannot connect between two states!');
        }
      }
      return next();
    },
    function (err, command, next) {
      const errorMessage = new joint.ui.FlashMessage({
        title: 'Validation Error!',
        type: 'alert',
        content: err
      });
      if (err) errorMessage.open();
      return next(err);
    })
}
