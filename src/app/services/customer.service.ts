import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Role } from '../entities/role';
import { WalletStatus } from '../entities/wallet';
import { CUSTOMER } from '../entities/customer';
export interface LocalCUSTOMER {
  cusCode?: number;
  username: string;
  cusMotDePasse: string;
  fullname: string;
  cusMailAddress: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/customers`;
  private loggedInCusCode: number | null = null;
  constructor(private http: HttpClient) {}

  private getHttpOptions() {
  const roles: Role[] = JSON.parse(localStorage.getItem('roles') || '[]');
  const rolesString = roles.map((role) => role.name).join(',');
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Roles': rolesString // Changed from 'Roles' to 'X-Roles'
    }),
  };
}

  // Register a new user
  register(user: LocalCUSTOMER): Observable<CUSTOMER> {
    return this.http.post<CUSTOMER>(
      `${this.apiUrl}/register`,
      CUSTOMER,
      this.getHttpOptions()
    );
  }

  // Get user details by username
  getCUSTOMER(username: string): Observable<CUSTOMER> {
    return this.http.get<CUSTOMER>(
      `${this.apiUrl}/${username}`,
      this.getHttpOptions()
    );
  }
  // Get user details by ID
  getCUSTOMERById(cusCode: number): Observable<CUSTOMER> {
    return this.http.get<CUSTOMER>(
      `${this.apiUrl}/id/${cusCode}`,
      this.getHttpOptions()
    );
  }
  // Update user information
  updateCUSTOMER(username: string, Customer: LocalCUSTOMER): Observable<CUSTOMER> {
    return this.http.put<CUSTOMER>(
      `${this.apiUrl}/${username}`,
      CUSTOMER,
      this.getHttpOptions()
    );
  }

  // Assign roles to a user
  assignRoles(username: string, roleIds: number[]): Observable<CUSTOMER> {
    console.log('Assigning roles to user:', username);
    console.log('Roles:', roleIds);

    return this.http.put<CUSTOMER>(
      `${this.apiUrl}/${username}/assignRoles`,
      roleIds,
      this.getHttpOptions()
    );
  }

  setLoggedInCusCode(cusCode: number): void {
    this.loggedInCusCode = cusCode;
  }

  getLoggedInCusCode(): number | null {
    return this.loggedInCusCode;
  }

  clearLoggedInCusCode(): void {
    this.loggedInCusCode = null;
  }

  // Delete user by username
  deleteCUSTOMER(username: string): Observable<void> {
    return this.http.delete<any>(
      `${this.apiUrl}/${username}`,
      this.getHttpOptions()
    );
  }

  // Get all users
  getAllcustomers(): Observable<CUSTOMER[]> {
    return this.http.get<CUSTOMER[]>(`${this.apiUrl}`);
  }

  updateWalletStatus(walletId: number, status: WalletStatus): Observable<any> {
  return this.http.patch(`http://localhost:8080/api/wallet/${walletId}/status
`, { status }, this.getHttpOptions());
}
}
export { CUSTOMER };

