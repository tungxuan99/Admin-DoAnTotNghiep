import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms'; 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
declare var $: any;

@Component({
  selector: 'app-giaovien',
  templateUrl: './giaovien.component.html',
  styleUrls: ['./giaovien.component.css']
})
export class GiaovienComponent extends BaseComponent implements OnInit {
  public giaoviens: any;
  public giaovien: any;
  public monhocs:any;
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
      'hoten': ['']     
    });
    this._api.get('/api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.monhocs= res;
      });
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/giaovien/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.giaoviens = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/giaovien/search',{page: this.page, pageSize: this.pageSize, hoten: this.formsearch.get('hoten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.giaoviens = res.data;
      console.log(this.giaoviens);
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
           TenGV:value.TenGV,
           DiaChi:value.DiaChi,
           SDT: value.SDT,
           passwordgv: value.PassWord       
          };
        this._api.post('/api/giaovien/create-giao-vien',tmp).takeUntil(this.unsubscribe).subscribe(res => {
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
           MaMonHoc:value.MaMonHoc,
           TenGV:value.TenGV,
           DiaChi:value.DiaChi,
           SDT: value.SDT,
           passwordgv: value.PassWord,   
           Magv:this.giaovien.magv         
          };
        this._api.post('/api/giaovien/update-giao-vien',tmp).takeUntil(this.unsubscribe).subscribe(res => {
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
        this._api.post('/api/giaovien/delete-giao-vien',{id:row.magv}).takeUntil(this.unsubscribe).subscribe(res => {
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
    this.giaovien = null;
    this.formdata = this.fb.group({
      'MaMonHoc': ['', Validators.required],
        'TenGV': ['',  Validators.required],
        'DiaChi': ['', Validators.required],
        'SDT': ['', Validators.required],
        'PassWord':['', Validators.required]
    }); 
    this.formdata.get('MaMonHoc').setValue(this.monhocs[0].maMonHoc);
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.giaovien = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'MaMonHoc': ['', Validators.required],
        'TenGV': ['',  Validators.required],
        'DiaChi': ['', Validators.required],
        'SDT': ['', Validators.required],
        'PassWord':['', Validators.required]
      });
      this.formdata.get('MaMonHoc').setValue(this.monhocs[0].maMonHoc);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/giaovien/get-by-id/'+ row.magv).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.giaovien = res; 
        console.log(this.giaovien);
          this.formdata = this.fb.group({
            'MaMonHoc': [this.giaovien.maMonHoc, Validators.required],
            'TenGV': [this.giaovien.tengv,  Validators.required],
            'DiaChi': [this.giaovien.diaChi, Validators.required],
            'SDT': [this.giaovien.sdt, Validators.required],
            'PassWord':[this.giaovien.passwordgv, Validators.required]
          }); 
          this.doneSetupForm = true;
        }); 
    }, 100);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}
