/**
 * Created by ta2er on 8/18/2017.
 */
import {LogicalEntity} from "../opx.model/LogicalEntity";
import {RelationLinks} from "../opx.model/RelationLinks";


export class OPXModel{
  private LogicalStructure : string;
  private VisualPart : string;
  private ThingSection:string;
  private OPD:string;
  private VisualLinkSection:string;
  private Unfolded:string;
  private InZoomed:string;
  private _LogicalObjects: Array<LogicalEntity> = [];
  private _LogicalProcesses: Array<LogicalEntity> = [];
  private _LogicalLinks: Array<RelationLinks> = [];
  private size:number = 0;

  constructor(json_opx : string){
    json_opx = JSON.stringify(json_opx);
    let json  = JSON.parse(json_opx);
    this.LogicalStructure = json.OPX.OPMSystem[0].LogicalStructure;
    this.VisualPart = json.OPX.OPMSystem[0].VisualPart[0];
    this.OPD= json.OPX.OPMSystem[0].VisualPart[0].OPD[0];
    this.ThingSection = json.OPX.OPMSystem[0].VisualPart[0].OPD[0].ThingSection[0];
    this.VisualLinkSection =  json.OPX.OPMSystem[0].VisualPart[0].OPD[0].VisualLinkSection[0];
    this.Unfolded =  json.OPX.OPMSystem[0].VisualPart[0].OPD[0].Unfolded; //JsonArray[0]
    this.InZoomed = json.OPX.OPMSystem[0].VisualPart[0].OPD[0].InZoomed; //JsonArray[0]
    this.load_object_section(this.LogicalStructure);
    this.load_Process_section(this.LogicalStructure);
    this.load_Link_section(this.LogicalStructure);
  }

  private load_object_section(LogicalStructure){
    this.size = parseInt(LogicalStructure[0].ObjectSection[0].LogicalObject.length);
    let EntityAttr;
    let OPMProperties;
    let visualprobs ;
    if(OPXModel.CheckSize(this.size)) {
      for (let i = 0; i < this.size; i++) {
        EntityAttr = LogicalStructure[0].ObjectSection[0].LogicalObject[i].EntityAttr[0].$;
        OPMProperties = LogicalStructure[0].ObjectSection[0].LogicalObject[i].EntityAttr[0].OPMProperties[0].Property;
        visualprobs = OPXModel.thingSectionObject(this.ThingSection,EntityAttr.id);
      if(visualprobs != ''){
        this._LogicalObjects.push(new LogicalEntity(EntityAttr.id, EntityAttr.uuid,
          OPMProperties[0].$.value, OPMProperties[1].$.value, OPMProperties[2].$.value,
          parseInt(visualprobs.x),
          parseInt(visualprobs.y),
          parseInt(visualprobs.width),
          parseInt(visualprobs.height)
          ));

      }
      }
    }

  }

  private load_Process_section(LogicalStructure){
    this.size = parseInt(LogicalStructure[0].ProcessSection[0].LogicalProcess.length);
    let EntityAttr;
    let OPMProperties;
    let visualprobs ;
    if(OPXModel.CheckSize(this.size)) {
      for (let i = 0; i < this.size; i++) {
        EntityAttr = LogicalStructure[0].ProcessSection[0].LogicalProcess[i].EntityAttr[0].$;
        OPMProperties = LogicalStructure[0].ProcessSection[0].LogicalProcess[i].EntityAttr[0].OPMProperties[0].Property;
        visualprobs = OPXModel.thingSectionProcess(this.ThingSection,EntityAttr.id);
        if(visualprobs != ''){
        this._LogicalProcesses.push(new LogicalEntity(EntityAttr.id, EntityAttr.uuid,
          OPMProperties[1].$.value, OPMProperties[3].$.value, OPMProperties[4].$.value,
          parseInt(visualprobs.x),
          parseInt(visualprobs.y),
          parseInt(visualprobs.width),
          parseInt(visualprobs.height)
          ))
        ;}
      }
    }

  }

  private load_Link_section(LogicalStructure){
    this.size = parseInt(LogicalStructure[0].LinkSection[0].LogicalLink.length);
    let LogicRelations;
    let EntityAttr;
    let OPMProperties;
    if(OPXModel.CheckSize(this.size)) {
      for (let i = 0; i < this.size; i++) {
        LogicRelations = LogicalStructure[0].LinkSection[0].LogicalLink[i].$;
        EntityAttr = LogicalStructure[0].LinkSection[0].LogicalLink[i].EntityAttr[0].$;
        OPMProperties = LogicalStructure[0].LinkSection[0].LogicalLink[i].EntityAttr[0].OPMProperties[0].Property;
        this.LogicalLinks.push(new RelationLinks(EntityAttr.id, EntityAttr.uuid,
          OPXModel.handleLinkname(OPMProperties[0].$.value), LogicRelations.sourceId,
          LogicRelations["source-uuid"], LogicRelations.destinationId, LogicRelations["destination-uuid"]));

      }
    }

  }

  private static CheckSize(size){
    return size > 0;
  }



  private static thingSectionObject(ThingSection, id){
    let size = parseInt(ThingSection.VisualThing.length);
    for(let i=0;i<size;i++) {
      if (ThingSection.VisualThing[i].ThingData[0].VisualObject) {
        if(ThingSection.VisualThing[i].ThingData[0].VisualObject[0].InstanceAttr[0].$.entityId === id){
          return ThingSection.VisualThing[i].ThingData[0].VisualObject[0].ConnectionEdgeAttr[0].$;
        }
      }
    }
    return '';
  }

  private static thingSectionProcess(ThingSection, id){
    let size = parseInt(ThingSection.VisualThing.length);
    for(let i=0;i<size;i++) {
      if (ThingSection.VisualThing[i].ThingData[0].VisualProcess) {
        if(ThingSection.VisualThing[i].ThingData[0].VisualProcess[0].InstanceAttr[0].$.entityId === id){
          return ThingSection.VisualThing[i].ThingData[0].VisualProcess[0].ConnectionEdgeAttr[0].$;
        }
      }
    }
    return '';
    }

    private static handleLinkname(linkname){
     return linkname.toString().substr(0,linkname.toString().indexOf(' '));
    }

  get LogicalObjects(): Array<LogicalEntity> {
    return this._LogicalObjects;
  }

  get LogicalProcesses(): Array<LogicalEntity> {
    return this._LogicalProcesses;
  }

  get LogicalLinks(): Array<RelationLinks> {
    return this._LogicalLinks;
  }
}


