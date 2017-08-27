/**
 * Created by ta2er on 8/18/2017.
 */
import {LogicalEntity} from "./LogicalEntity";

export class RelationLinks {
  id: string;
  uuid: string;
  name: string;
  source_id: string;
  source_uuid: string;
  destination_id: string;
  destination_uuid: string;

  constructor(id: string,uuid: string, name: string , src_id: string,src_uuid: string,des_id: string,des_uuid: string){
   this.id = id;
   this.uuid = uuid;
   this.name = name;
    this.source_id = src_id;
    this.source_uuid = src_uuid;
    this.destination_id = des_id;
    this.destination_uuid = des_uuid;
  }
}
