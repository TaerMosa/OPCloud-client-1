/**
 * Created by ta2er on 8/18/2017.
 */
import {LogicalEntity} from "./LogicalEntity";

export class States extends LogicalEntity{
  default_ : boolean;
  final_ : boolean;
  initial_ : boolean;


  constructor(id: string,uuid: string, name: string ,enviromental: boolean ,physical: boolean, x:number, y:number,
  width:number, height:number, default_ : boolean, final_ : boolean, initial_ : boolean ){
    super(id,uuid,name,enviromental,physical,x,y,width,height);
    this.default_ = default_;
    this.final_ = final_;
    this.initial_ = initial_;
  }

}
