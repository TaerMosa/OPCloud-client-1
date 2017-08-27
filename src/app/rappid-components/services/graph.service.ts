import { Injectable } from '@angular/core';
import { ModelObject } from '../../services/storage/model-object.class';
import { ModelStorageInterface } from '../../services/storage/model-storage.interface';
import {cellsObject} from "../../models/Json.model/Json.cell.object.model";
import {cellsProcess} from "../../models/Json.model/Json.cell.process.model";
import {OPXModel} from "../../models/controllers/OPX.controller";
import {cellsLink} from "../../models/Json.model/Json.cell.Link.model";
import {linkDrawing,DictOfLinksValue} from "../../link-operating/linkDrawing";
import {toArray} from "rxjs/operator/toArray";


const joint = require('rappid');
const rootId="SD";
const firebaseKeyEncode = require('firebase-key-encode');


@Injectable()
export class GraphService {
  graph;
  graphLinks;
  currentGraphId;
  modelObject;
  modelStorage;
  private JSON;
  private modelToSync;
  private opxModel :OPXModel;
  // private OPL;
  // private modelName;


  constructor(modelStorage: ModelStorageInterface) {
    this.modelStorage = modelStorage;
    this.graph = new joint.dia.Graph;
    this.JSON = this.graph.toJSON();
    localStorage.setItem(rootId, JSON.stringify(this.graph.toJSON()));
    this.currentGraphId = rootId;
    // this.initializeDatabase();
    // TODO: change:position emits on mousemove, find a better event - when drag stopped
    this.graph.on(`
                  remove`,
      () => this.updateJSON());

     this.modelObject = new ModelObject(null, null);
  }

  getGraph(name?: string) {

    return name ? this.loadGraph(name) : this.graph;
  }

  /**
   *
   * @Import OPX Model
   *
   */

  importOpxGraph(opxJson){
    this.opxModel = new OPXModel(opxJson);
    let opx_objects = this.opxModel.LogicalObjects;
    let opx_processes = this.opxModel.LogicalProcesses;
    let opx_Links = this.opxModel.LogicalLinks;
    let counter:number = 0;
    let Cells:Array<string> = [];
    for(let obj in opx_objects){
      Cells.push(new cellsObject(0,opx_objects[obj].name,opx_objects[obj].id,
        opx_objects[obj].width,
        opx_objects[obj].height,
        opx_objects[obj].x,
        opx_objects[obj].y,
        0,0,'opm.Object',counter++,opx_objects[obj].physical,opx_objects[obj].enviromental).cells);
    }
    for(let proc in opx_processes){
     Cells.push(
       new cellsProcess(0,opx_processes[proc].name,opx_processes[proc].id,
         opx_processes[proc].width,
         opx_processes[proc].height,
         opx_processes[proc].x,
         opx_processes[proc].y,
         0,0,'opm.Process',counter++,opx_processes[proc].physical,opx_processes[proc].enviromental).cells
     );
    }

    for(let link in opx_Links){
      let linkname = opx_Links[link].name;
      let attrs = DictOfLinksValue[linkname];
      Cells.push(
        new cellsLink(opx_Links[link].id,linkname,
          opx_Links[link].source_id,
          opx_Links[link].destination_id,
        attrs.src ? attrs.value.fill:'',attrs.dst ? attrs.value.fill:'',
          attrs.src ? attrs.value.d:'',attrs.dst ? attrs.value.d:'',counter++).cells
      );
    }
    this.graph.addCells(Cells);
  }


  saveGraph(modelName, firstSave) {
    console.log('inside saveModel func');
    // TODO: work on this.graph.modelObject - might be JSON
    this.JSON = this.graph.toJSON();
    this.modelObject.saveModelParam(modelName, this.JSON);
    firebaseKeyEncode.deepEncode(this.modelObject.modelData);
    this.modelStorage.save(this.modelObject);
    if(firstSave)     //if saveAs and not only save
      this.modelStorage.listen(modelName, this.graph);
    console.log(this.JSON);

  }

  loadGraph(name) {
    this.modelStorage.get(name).then((res) => {
      this.modelObject = res;
      firebaseKeyEncode.deepDecode(this.modelObject.modelData);

      this.graph.fromJSON(this.modelObject.modelData);
    });
    this.modelStorage.listen(name, this.graph);
  }

  updateJSON() {
    if (this.modelObject.name !== null) {
      this.saveGraph(this.modelObject.name, false);
    }
    else {
      localStorage.setItem(this.modelObject.name, this.modelToSync);
    }
  }


//   this.fireDB.ref('/models/' + this.modelName).on('value', function (snapshot) {
//   getModel(snapshot.val());
// });

/*

   this.graph.listen = function () {
   function getModel(model) {
   if (this.graph.myChangeLock) {
   //console.log('my change');
   this.graph.myChangeLock = false;
   return;
   }
   this.graph.JSON_string = model.graph;
   this.graph.JSON = JSON.parse(this.graph.JSON_string);
   this.graph.fromJSON(JSON.parse(this.graph.JSON_string));
   this.graph.OPL = model.opl;
   document.getElementById("opl").innerHTML = this.graph.OPL;
   };
   if (this.modelName !== 'undefined') {
   this.fireDB.ref('/models/' + this.modelName).on('value', function (snapshot) {
   getModel(snapshot.val());
   });
   }
   };
   _.bind(this.graph.listen, this.graph);
   this.graph.listen();
   }
*/

  getGraphById(ElementId: string) {
    this.graph.fromJSON(JSON.parse(localStorage.getItem(ElementId)));
  }

  removeGraphById(ElementId: string,ParentId: string) {
     this.changeGraphModel(ParentId);
    localStorage.removeItem(ElementId);
  }

  graphSetUpdate(ElementId: string) {
    localStorage.setItem(this.currentGraphId, JSON.stringify(this.graph.toJSON()));
    var newGraph = new joint.dia.Graph;
    this.copyConntectedGraphElements(newGraph,ElementId);
    newGraph=newGraph.toJSON();
    localStorage.setItem(ElementId, JSON.stringify(newGraph));
    this.graph.fromJSON(newGraph);
    this.currentGraphId = ElementId;
  }

  //star

  private copyConntectedGraphElements(newGraph,elementId)
  {
    let gCell=this.graph.getCell(elementId);
    let connctedCells=this.graph.getNeighbors(gCell);
    newGraph.addCells(connctedCells);
    this.graphLinks = this.graph.getConnectedLinks(gCell);
  }

  changeGraphModel(elementId) {
    if (elementId == this.currentGraphId)
      return 0;
    localStorage.setItem(this.currentGraphId, JSON.stringify(this.graph.toJSON()));
    this.graph.fromJSON(JSON.parse(localStorage.getItem(elementId)));
    this.currentGraphId = elementId;
  }




}
