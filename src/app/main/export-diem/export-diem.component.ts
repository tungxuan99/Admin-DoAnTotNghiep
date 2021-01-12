import { Component, OnInit } from '@angular/core';
// import jsPDF from 'jspdf'; 
import { ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import html2canvas from 'html2canvas';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-export-diem',
  templateUrl: './export-diem.component.html',
  styleUrls: ['./export-diem.component.css']
})

export class ExportDiemComponent implements OnInit {
  // @ViewChild('couponPage') couponPage: ElementRef;  
  // title = 'app';  
  // public Data = [  
  //   { Id: 101, Name: 'Nitin', Salary: 1234 },  
  //   { Id: 102, Name: 'Sonu', Salary: 1234 },  
  //   { Id: 103, Name: 'Mohit', Salary: 1234 },  
  //   { Id: 104, Name: 'Rahul', Salary: 1234 },  
  //   { Id: 105, Name: 'Kunal', Salary: 1234 }  
  // ]; 
  title = 'export-table-data-to-pdf-using-jspdf-example';

  head = [['ID', 'NAME', 'Điểm kết thúc', 'DEPARTMENT']]

  data = [
    [1, 'ROBERT', 'SOFTWARE DEVELOPER', 'Điểm kết thúc'],
    [2, 'CRISTINAO','QA', 'TESTING'],
    [3, 'KROOS','MANAGER', 'MANAGEMENT'],
    [4, 'XYZ','DEVELOPER', 'DEVLOPEMENT'],
    [5, 'ABC','CONSULTANT', 'HR'],
    [73, 'QWE','VICE PRESIDENT', 'MANAGEMENT'],
  ]
  constructor() { }

  ngOnInit(): void {
  }
   
  
  
  SavePDF(): void {
    // const DATA = this.couponPage.nativeElement;
    // const doc: jsPDF = new jsPDF("p", "pt", "a4");
    // doc.getFontList();
    
    // doc.html(DATA, {
    //    callback: (doc) => {
    //       doc.save('data');
    //    }
    // });


    var data = document.getElementById('couponPage');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 1;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });


    // var doc = new jsPDF();

    // doc.setFontSize(18);
    // doc.setFont('Times');
    // doc.text('My Team Detail', 11, 8);
    // doc.setFontSize(11);
    // doc.setTextColor(100);


    // (doc as any).autoTable({
    //   head: this.head,
    //   body: this.data,
    //   theme: 'plain',
    //   didDrawCell: data => {
    //     console.log(data.column.index)
    //   }
    // })
    // doc.output('dataurlnewwindow')
    // doc.save('myteamdetail.pdf');


    // const doc = new jsPDF("p", "pt", "a4");
    // const pdfTable = this.couponPage.nativeElement;
    // var html = htmlToPdfmake(pdfTable.innerHTML);
   
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();
    
  }  

}
