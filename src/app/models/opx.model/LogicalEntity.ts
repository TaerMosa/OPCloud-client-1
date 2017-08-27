/**
 * Created by ta2er on 8/18/2017.
 */

export class LogicalEntity{
  id: string;
  uuid: string;
  name: string;
  enviromental: boolean;
  physical: boolean;
  x:number;
  y:number;
  width:number;
  height:number;


  constructor(id: string, uuid: string, name: string, enviromental: boolean, physical: boolean, x: number, y: number, width: number, height: number) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.enviromental = enviromental;
    this.physical = physical;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
