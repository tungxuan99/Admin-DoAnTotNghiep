import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-lophoc',
  templateUrl: './lophoc.component.html',
  styleUrls: ['./lophoc.component.css']
})
export class LophocComponent extends BaseComponent implements OnInit {
  public lophocs: any;
  public lophoc: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'tenlop': ['']     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/lophoc/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/lophoc/search',{page: this.page, pageSize: this.pageSize, tenlop: this.formsearch.get('tenlop').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs = res.data;
      console.log(this.lophocs);
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  

  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    console.log(this.isCreate);
    if(this.isCreate) { 
        let tmp = {
          malophoc: value.tenlop ,
          tenlophoc:value.tenlop,
          khoiHoc:value.khoihoc,       
          };
        this._api.post('/api/lophoc/create-lop-hoc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else { 
        let tmp = {
          tenlophoc:value.tenlop,
          khoiHoc:value.khoihoc,
          maLopHoc:this.lophocs.maLopHoc,          
          };
        this._api.post('/api/lophoc/update-lop-hoc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }
   
  } 

  onDelete(row) { 
    console.log(row.maLopHoc);
    this._api.post('/api/lophoc/delete-lop-hoc',{id:row.maLopHoc}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.lophoc = null;
    this.formdata = this.fb.group({
      'tenlop': ['', Validators.required],
      'khoihoc': ['', Validators.required],
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.lophoc = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'tenlop': ['', Validators.required],
        'khoihoc': ['', Validators.required],
      });
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/lophoc/get-by-id/'+ row.maLopHoc).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.lophoc = res; 
        console.log(this.lophoc);
          this.formdata = this.fb.group({
            'tenlop': [this.lophoc.tenlophoc, Validators.required],
            'khoihoc': [this.lophoc.khoiHoc, Validators.required],
          });
          this.formdata.get('khoihoc').setValue(this.lophoc.khoiHoc); 
          this.doneSetupForm = true;
        }); 
    }, 100);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}