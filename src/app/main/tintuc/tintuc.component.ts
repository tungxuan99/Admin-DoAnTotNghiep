import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
declare var $: any;

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent extends BaseComponent implements OnInit {
  public tintuc: any;
  public tintucs: any;
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
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'tieude': ['']     
    });
   
   this.search();
  }

  loadPage(page) { 
    this._api.post('/api/tintuc/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.tintucs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/tintuc/search',{page: this.page, pageSize: this.pageSize, tenmon: this.formsearch.get('tieude').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.tintucs = res.data;
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
           TieuDe:value.TieuDe,
           NoiDung:value.NoiDung,
           Anh:value.Anh,
           TrangThai:value.TrangThai,
           IDTaiKhoan: this.authenticationService.userValue.id       
          };
        this._api.post('/api/tintuc/create-tin-tuc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else { 
        let tmp = {
          MaTinTuc:this.tintuc.maTinTuc,
          TieuDe:value.TieuDe,
          NoiDung:value.NoiDung,
          Anh:value.Anh,
          TrangThai: value.TrangThai,
          IDTaiKhoan: this.tintuc.iDTaiKhoan          
          };
        this._api.post('/api/tintuc/update-tin-tuc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/tintuc/delete-tin-tuc',{id:row.maTinTuc}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.tintuc = null;
    this.formdata = this.fb.group({
      'TieuDe': ['', Validators.required],
      'NoiDung': ['', Validators.required],
      'Anh': ['', Validators.required],
      'TrangThai': ['', Validators.required],
    });

  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.tintuc = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'TieuDe': ['', Validators.required],
        'NoiDung': ['', Validators.required],
        'Anh': ['', Validators.required],
        'TrangThai': ['', Validators.required],
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
      this._api.get('/api/tintuc/get-by-id/'+ row.maTinTuc).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.tintuc = res; 
        console.log(this.tintuc);
          this.formdata = this.fb.group({
            'TieuDe': [this.tintuc.tieuDe, Validators.required],
            'NoiDung': [this.tintuc.noiDung, Validators.required],
            'Anh': [this.tintuc.anh, Validators.required],
            'TrangThai': [this.tintuc.trangThai, Validators.required],
          }); 
          this.doneSetupForm = true;
        }); 
    }, 100);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }

}
