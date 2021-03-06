/**
 * OPM Shapes Library for JointJS
 * Developed by:
 * Nadav Oved, Aviv Sugarman, Oleg Zendel, Itamar Shafran and Or Keren
 * for the OPCloud Project
 */

const joint = require('rappid');
export const _ = require('lodash');
import { basicDefinitions } from './basicDefinitions';

export const opmShapes = {
  //OPM Links definitions

  Link: joint.dia.Link.extend(basicDefinitions.defineLink()),
  Object: joint.dia.Element.extend(basicDefinitions.defineShape('rect')),
  Process: joint.dia.Element.extend(basicDefinitions.defineShape('ellipse')),
  StateNorm: joint.dia.Element.extend(basicDefinitions.defineState()),
  TriangleAgg: joint.shapes.devs.Model.extend({
    markup: '<image/>',
    defaults: _.defaultsDeep({
      type: 'opm.TriangleAgg',
      size: {width: 40, height: 40},
      inPorts: ['in'],
      outPorts: ['out'],
      ports: {
        groups: {
          'in': {
            position: {
              name: 'top'
            },
            attrs: {
              '.port-body': {
                fill: 'black',
                magnet: 'passive',
                r: 1
              }
            },
            label: {markup: '<text class="label-text"/>'}
          },
          'out': {
            position: {
              name: 'bottom'
            },
            attrs: {
              '.port-body': {
                fill: 'black',
                magnet: 'passive',
                r: 1
              }
            },
            label: {markup: '<text class="label-text"/>'}
          }
        }
      },
      attrs: {
        image: { 'xlink:href': '../../assets/OPM_Links/StructuralAgg.png', width: 40, height: 40},
      }
    }, joint.shapes.devs.Model.prototype.defaults)
  }),
  StructLink: joint.shapes.devs.Link.extend({
    defaults: _.defaultsDeep({
      type: 'opm.StructLink',
      router: {name: 'manhattan'},
      attrs: {'.link-tools': {display: 'none'}, '.marker-vertices': {display: 'none'}, '.marker-arrowheads': {display: 'none'}}
    }, joint.shapes.devs.Link.prototype.defaults)
  })
};

joint.shapes.opm = opmShapes;

