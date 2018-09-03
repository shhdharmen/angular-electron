import { Component, OnInit, Input } from '@angular/core';
import { ENodeType } from '../../../models/node';

@Component({
  selector: 'app-node-badge',
  templateUrl: './node-badge.component.html',
  styleUrls: ['./node-badge.component.scss']
})
export class NodeBadgeComponent implements OnInit {
  readonly nodeColorMap: { [key: string]: { letter: string, bgClass: string } } = {
    [ENodeType.component]: { letter: 'C', bgClass: 'badge-primary' },
    [ENodeType.directive]: { letter: 'D', bgClass: 'badge-info' },
    [ENodeType.NgModule]: { letter: 'M', bgClass: 'badge-danger' },
    [ENodeType.node_module]: { letter: 'N', bgClass: 'badge-success' },
    [ENodeType.pipe]: { letter: 'P', bgClass: 'badge-warning' },
    [ENodeType.provider]: { letter: 'P', bgClass: 'badge-dark' },
    [ENodeType.unknown]: { letter: 'U', bgClass: 'badge-secondary' }
  };
  @Input() nodeType: string;
  constructor() { }

  ngOnInit() {
  }

}
