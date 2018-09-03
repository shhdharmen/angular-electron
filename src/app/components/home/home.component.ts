import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { INode, ENodeType } from '../../models/node';
import { BehaviorSubject, Observable } from 'rxjs';

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
  nodesChannel: BehaviorSubject<INode> = new BehaviorSubject(null);
  nodes: INode[] = [];
  constructor(private fb: FormBuilder) {
    this.nodesChannel.asObservable().subscribe(next => {
      if (next) {
        this.nodes.push(next);
      }
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
    this.getNode(file.name, file.path, lines, text, this.nodesChannel);
  }

  getNode(fileName: string, filePath: string, lines: string[], text: string, dynSubject: BehaviorSubject<INode>) {
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
    this.getDeclarations(text).subscribe((declaration: INode) => {
      if (declaration) {
        node.declarations.push(declaration);
      }
    });
    node.imports = this.getImports(lines);
    node.providers = this.getProviders(lines);
    node.bootstrap = this.getBootstrap(lines);
    dynSubject.next(node);
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
    const imports = lines.filter(line => {
      const flag = line.search(/^(import)/) > -1;
      return flag;
    });
    const importNodes: INode[] = this.processImports(imports);
    return importNodes;
  }

  getDeclarations(text: string): Observable<INode> {
    const declarationSubject = new BehaviorSubject<INode>(null);
    text = text.replace(/\r?\n|\r/g, '').split(' ').join('');
    const declarationStartedAt = text.indexOf('declarations:[');
    const declarationEndedAt = text.indexOf(']', declarationStartedAt);
    const allDeclarationCsV = text.substring(declarationStartedAt + 14, declarationEndedAt);
    const allDeclarations = allDeclarationCsV.split(',');
    allDeclarations.forEach(declaration => {
      const tempNode: INode = {
        bootstrap: [],
        className: declaration,
        declarations: [],
        fileName: '',
        imports: [],
        path: '',
        providers: [],
        type: ENodeType.unknown
      };
      declarationSubject.next(tempNode);
    });
    return declarationSubject;
  }
  getProviders(lines: string[]): INode[] { return []; }
  getBootstrap(lines: string[]): INode[] { return []; }

  processImports(imports: string[]): INode[] { return []; }

}
