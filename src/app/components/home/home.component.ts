import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

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
      this.processFile(this.fileText);
    };
    reader.readAsText(file);
  }

  processFile(text: string) {
    const lines = text.split('\n');
    console.log(lines);
    const noOfLines = lines.length;
    const imports = lines.filter(line => {
      const flag = line.search(/^(import)/) > -1;
      return flag;
    });
    console.log(imports);
  }

}
