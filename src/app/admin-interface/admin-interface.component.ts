import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';  // Import AdminService

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})
export class AdminInterfaceComponent implements OnInit {
  invoices: any[] = [];  // This will hold the invoices

  constructor(private adminService: AdminService) { }  // Inject AdminService

  ngOnInit(): void {
    this.adminService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  approveInvoice(invoiceId: string) {
    this.adminService.approveInvoice(invoiceId).subscribe(() => {
      this.invoices = this.invoices.filter(invoice => invoice._id !== invoiceId);
    });
  }
  rejectInvoice(invoiceId: string) {
    this.adminService.rejectInvoice(invoiceId).subscribe(() => {
      this.invoices = this.invoices.filter(invoice => invoice._id !== invoiceId);
    });
  }
  

}
