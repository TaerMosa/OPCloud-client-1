/**
 * Created by ta2er on 8/18/2017.
 */


export class cellsObject {
  cells: any;
  min_width:number = 90;
  min_height:number = 50;

  constructor(angle: number, name: string, id: string, width: number, height: number,
              pos_x: number, pos_y: number, statesHeightPadding: number, statesWidthPadding: number,
              type: string, z: number, physical, enviromental) {

    this.cells = [
      {
        angle: angle,
        id: id,
        type: type,
        attrs: {
          rect: {
            filter: {
              args:{ dx: this.IsPhysical(physical), dy: this.IsPhysical(physical)}
            },
            ['stroke-dasharray']: JSON.parse(enviromental) ? [10, 5] : 0
          },
          text: {
            text: name,
          }
        },
        position: {
          x: pos_x,
          y: pos_y
        },
        size: {
          width: width>this.min_width ? width:this.min_width ,
          height: height>this.min_height ? height:this.min_height
        },
        z: z,
        statesHeightPadding: statesHeightPadding,
        statesWidthPadding: statesWidthPadding
      }
    ];
  }

  IsPhysical(physical) {
    if (!JSON.parse(physical)) {
    return 0;
    }

  }
}
