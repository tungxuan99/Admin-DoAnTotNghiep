import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
declare var $: any;

@Component({
  selector: 'app-monhoc',
  templateUrl: './monhoc.component.html',
  styleUrls: ['./monhoc.component.css']
})
export class MonhocComponent extends BaseComponent implements OnInit {
  public monhoc: any;
  public monhocs: any;
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
      'tenmon': ['']     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/monhoc/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.monhocs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/monhoc/search',{page: this.page, pageSize: this.pageSize, tenmon: this.formsearch.get('tenmon').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.monhocs = res.data;
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
    if(this.isCreate) { 
        let tmp = {
           MaMonHoc:value.MaMonHoc,
           TenMonHoc:value.TenMonHoc,
           SoTiet:value.SoTiet,
           HeSoMonHoc:value.HeSoMonHoc,       
          };
        this._api.post('/api/monhoc/create-mon-hoc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          Swal.fire(
            'Đã thêm!',
            'Thêm thành công',
            'success'
          );
          this.search();
          this.closeModal();
          });
    } else { 
        let tmp = {
          MaMonHoc:this.monhoc.maMonHoc,
           TenMonHoc:value.TenMonHoc,
           SoTiet:value.SoTiet,
           HeSoMonHoc:value.HeSoMonHoc,          
          };
        this._api.post('/api/monhoc/update-mon-hoc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          Swal.fire(
            'Đã cập nhật!',
            'Cập nhật thành công',
            'success'
          );
          this.search();
          this.closeModal();
          });
    }
   
  } 

  onDelete(row) { 
    Swal.fire({
      title: 'Bạn có chắc muốn xoá?',
      text: 'Bạn sẽ không thể khôi phục bản ghi này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        this._api.post('/api/monhoc/delete-mon-hoc',{id:row.maMonHoc}).takeUntil(this.unsubscribe).subscribe(res => {
          this.search();
        });
        Swal.fire(
          'Đã xoá!',
          'Bản ghi không thể khôi phục',
          'success'
        );
      }
    });
  }

  Reset() {  
    this.monhoc = null;
    this.formdata = this.fb.group({
      'MaMonHoc': ['', Validators.required],
      'TenMonHoc': ['', Validators.required],
      'SoTiet': ['', Validators.required],
      'HeSoMonHoc': ['', Validators.required],
    }); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.monhoc = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'MaMonHoc': ['', Validators.required],
        'TenMonHoc': ['', Validators.required],
        'SoTiet': ['', Validators.required],
        'HeSoMonHoc': ['', Validators.required],
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
      this._api.get('/api/monhoc/get-by-id/'+ row.maMonHoc).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.monhoc = res; 
          this.formdata = this.fb.group({
            'MaMonHoc': [this.monhoc.maMonHoc, Validators.required],
            'TenMonHoc': [this.monhoc.tenMonHoc, Validators.required],
            'SoTiet': [this.monhoc.soTiet, Validators.required],
            'HeSoMonHoc': [this.monhoc.heSoMonHoc, Validators.required],
          }); 
          this.doneSetupForm = true;
        }); 
    }, 100);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}