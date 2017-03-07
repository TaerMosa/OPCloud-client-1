import { Component, OnInit } from '@angular/core';
import { GraphService } from '../rappid-components/services/graph.service';

@Component({
  selector: 'opcloud-opl-widget',
  template: `
    <div class="opl-container">
      <p *ngFor="let sentence of getOpl()">{{ sentence }}</p>
    </div>
  `,
  styleUrls: ['./opl-widget.component.css']
})
export class OplWidgetComponent implements OnInit {
  private graph;

  constructor(private graphService: GraphService) {
    this.graph = graphService.getGraph();
  }

  ngOnInit() {
  }

  getOpl() {
    return this.graph.getCells().map((cell) => {
      switch (cell.attributes.type) {
        // TODO: add cases
        case 'opm.Link':
          const source = cell.getSourceElement();
          const target = cell.getTargetElement();
          if (!source || !target) return;
          return `${cell.getSourceElement().attributes.type} 
                    is connected to ${cell.getTargetElement().attributes.type}`;
      }

      return cell.attributes.type;
    });
  }


}
