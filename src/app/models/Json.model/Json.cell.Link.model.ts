/**
 * Created by ta2er on 8/26/2017.
 */



export class cellsLink {
  cells: any;

  constructor(id,name,sourceid,targetid,fill_s,fill_t,d_source,d_target,z) {

    this.cells = [
      {
       attrs:{
         '.connection':{
           stroke: "black",
           ["stroke-dasharray"]:"0"
         },
         '.marker-source':{
           fill: fill_s,
           d: d_source,
           ["stroke-width"]: 2,

         },
         '.marker-target':{
           fill: fill_t,
           d: d_target,
           ["stroke-width"]: 2
         },
       },
        graph: null,
        id: id,
        name: name,
        previousTargetId: targetid,
        source:{
          id: sourceid,
          port: null,
        },
        target:{
        id:targetid,
        },
        type: "opm.Link",
        z: z
      }
    ];
  }

}
