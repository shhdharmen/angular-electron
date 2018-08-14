import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { INode, ENodeType } from '../../models/node';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fileForm: FormGroup;
  title = 'aux';
  file: File;
  fileText: any;
  childNodesChannel: BehaviorSubject<INode> = new BehaviorSubject(null);
  childNodes: INode[] = [];
  constructor(private fb: FormBuilder) {
    this.childNodesChannel.asObservable().subscribe(next => {
      this.childNodes.push(next);
      console.log(this.childNodes);
    });
  }

  ngOnInit() {
    this.fileForm = this.fb.group({
      'folderPath': [null, Validators.required],
      'appFile': [null, Validators.required]
    });
  }
  readFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.fileText = reader.result;
      this.processFile(this.fileText, file);
    };
    reader.readAsText(file);
  }

  processFile(text: string, file: File) {
    console.log('file', text);
    const lines = text.split('\n');
    this.getNode(file.name, file.path, lines);
  }

  getNode(fileName: string, filePath: string, lines: string[]) {
    const node: INode = {
      bootstrap: [],
      className: '',
      declarations: [],
      fileName: '',
      imports: [],
      path: '',
      providers: [],
      type: ENodeType.unknown
    };
    node.type = this.getNodeType(lines);
    node.className = this.getClassName(lines);
    node.fileName = fileName;
    node.path = filePath;
    node.declarations = this.getDeclarations(lines);
    node.imports = this.getImports(lines);
    node.providers = this.getProviders(lines);
    node.bootstrap = this.getBootstrap(lines);
    this.childNodesChannel.next(node);
  }

  getNodeType(lines: string[]): ENodeType {
    const decorator = lines.find(line => {
      const flag = line.search(/^(@)/) > -1;
      return flag;
    }).replace(/[^a-zA-Z ]/g, '');
    return ENodeType[decorator];
  }

  getClassName(lines: string[]) {
    return lines.find(line => {
      const flag = line.search(/^(export class)/) > -1;
      return flag;
    }).split(' ')[2];
  }

  getImports(lines: string[]): INode[] {
    // return lines.filter(line => {
    //   const flag = line.search(/^(import)/) > -1;
    //   return flag;
    // });
    return [];
  }

  getDeclarations(lines: string[]): INode[] { return []; }
  getProviders(lines: string[]): INode[] { return []; }
  getBootstrap(lines: string[]): INode[] { return []; }

}
