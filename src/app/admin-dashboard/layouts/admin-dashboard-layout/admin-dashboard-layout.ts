import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-dashboard-layout.html',
  styleUrls: ['./admin-dashboard-layout.css'],
})
export class AdminDashboardLayout {
  authService = inject(AuthService);
}

